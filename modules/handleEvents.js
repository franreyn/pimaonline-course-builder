import { config } from "../config.js";
import { addComponentToCanvas } from "./utils.js" 

export function handleEvents(editor, layoutsToolbar, footerToolbar) {

	// Get config data
	let allowedCopyableComponents = config.copyableComponents;

  // Allow Layers to be renameable
	function setCustomLayerName(component) {
		switch (component.get("type")) {
			case "text":
				component.set("title", "Custom Text Layer");
				break;
			case "image":
				component.set("title", "Custom Image Layer");
				break;
			default:
				component.set("title", "Custom Layer");
		}
	}

	// If you add one type of layout component (1 col, 2col, etc) and another is already there, remove the first one but first warn the user. Triggered by `layoutsToolbar.addEventListener("click")`.
  let columnComponentCount = 0;
  editor.on("component:add", component => {
    if (("one-column-layout" === component.get("type") || "two-column-layout" === component.get("type") || "three-section-layout" === component.get("type")) && (columnComponentCount += 1) > 1) {
      let isConfirmed = window.confirm("Your content will be deleted if you switch layouts, are you sure?");
      if (isConfirmed) {
        // User confirmed, so remove sibling components and update active class
        editor.runCommand("remove-sibling-components", { component: component });
  
        // Find the active layout button and remove the "active" class
        const activeLayoutBtn = layoutsToolbar.querySelector(".layout-btn.active");
        if (activeLayoutBtn) {
          activeLayoutBtn.classList.remove("active");
        }
  
        // Find the new layout button and add the "active" class
        const newLayoutBtn = layoutsToolbar.querySelector(`[data-type="${component.get("type")}"]`);
        if (newLayoutBtn) {
          newLayoutBtn.classList.add("active");
        }
      } else {
        // User canceled, so remove the newly added component
        component.remove();
      }
    }
    setCustomLayerName(component);
    editor.LayerManager.render();
  });  

	// When a component is removed force the layers panel to refresh.
	// The layers panel is a part of the GrapesJS interface that shows a tree view of the components in the editor. By calling render(), the layers panel is updated to reflect the removal of the component.
	editor.on("component:remove", (component) => {
		editor.LayerManager.render(); // Force layers panel to refresh
	});

	// When a component is mounted, ensures that 'content-body' components can only be added as children of 'content-wrapper' or 'second-column' components. If a 'content-body' component is added elsewhere, it is automatically removed.
	editor.on("component:mount", (component) => {
		if (component.get("type") === "content-body") {
			const parentType = component.parent().get("type");
			if (parentType !== "content-wrapper" && parentType !== "second-column" && parentType !== "third-column") {
				component.remove();
			}
		}
	});

	// Prevent all components, except those in array, from being copyable, aka duplicated
	function setCopyableComponents(copyableComponents) {
		editor.on("component:add", (component) => {
			if (copyableComponents.includes(component.get("type"))) {
				component.set("copyable", true);
			} else {
				component.set("copyable", false);
			}
		});
	}

	// Call function to set duplicatable/copyable components. Note: 'allowedCopyableComponents' set in config.js 
	setCopyableComponents(allowedCopyableComponents);
	editor.on("component:title", setCustomLayerName);

	//Add custom toolbar for footer 

	let isFooterActive = false;

	footerToolbar.addEventListener("click", (event) => {

		const elements = editor.DomComponents.getWrapper().find("body")[0];

		if(!elements) {
			window.alert("Please add a layout first")
		} else {
		const footerToolbarButtons = footerToolbar.querySelectorAll(".footer-btn");
		const button = event.target;
		if (button.tagName === "BUTTON") {
			const footStatus = button.getAttribute("data-type");
			if(footStatus == "footer-on" && !isFooterActive) {

				const footerComponent = editor.DomComponents.addComponent({
					type: 'footer',
					draggable: false,
					removable: false,
				 });

				const elements = editor.DomComponents.getWrapper().find("body")[0];

				elements.append(footerComponent);

				footerToolbarButtons[0].classList.add("active");
				footerToolbarButtons[1].classList.remove("active");
				isFooterActive = true;

			} else if(footStatus == "footer-off") {
			  const footerInstance = editor.getWrapper().find('[data-gjs-type="footer"]');
			  footerInstance[0].remove();
				footerToolbarButtons[1].classList.add("active");
				footerToolbarButtons[0].classList.remove("active");
				isFooterActive = false;
			}
		}
	}
	});

	// When layouts switch, remove and add footer (so that it stays at bottom)
	function checkFooterStatus (isFooterActive) {
		if(isFooterActive) {

			const footerComponents = editor.DomComponents.getWrapper().find("footer");

			if(footerComponents.length == 0) {

			const elements = editor.DomComponents.getWrapper().find("body")[0];

			const footerComponent = editor.DomComponents.addComponent({
				type: 'footer',
				draggable: false,
				removable: false,
			 });

				elements.append(footerComponent);
			}

		}
	}

	// Add custom toolbar for layout components to avoid drag/drop layouts

  // Listen for click on layout selection buttons
	layoutsToolbar.addEventListener("click", (event) => {
		const button = event.target;
		if (button.tagName === "BUTTON") {
			const componentType = button.getAttribute("data-type");
			addComponentToCanvas(editor, componentType);
		}
	});

	function addComponentToCanvas(editor, componentType) {		
  	const existingLayout = editor.DomComponents.getComponents().find(
    	(component) => component.get("type") === componentType
  	);

		const layoutsToolbarButtons = layoutsToolbar.querySelectorAll(".layout-btn");
			layoutsToolbarButtons.forEach((button) => {
				if (button.classList.contains("active")) {
					button.classList.remove("active");
				}
			}
		);

		if (!existingLayout) {
			removeExistingComponent(editor, componentType);

			// Add the component to the editor
			const addedComponent = editor.DomComponents.addComponent({
				type: componentType,
				// Add any default attributes or styles if needed
			});

			//Add footer right here. 
			checkFooterStatus(isFooterActive);

			// Select the newly added component
			editor.select(addedComponent);
		} else {
			// If the layout is already active, just select it
			editor.select(existingLayout);
		}

		// Mark the button as active
		const selectedButton = layoutsToolbar.querySelector(`[data-type="${componentType}"]`);
		selectedButton.classList.add("active");
	}

	function removeExistingComponent(editor, componentType) {
		const components = editor.DomComponents.getComponents();

		// Get the type of the component to remove based on the type of the newly added component
		const typeToRemove = componentType === "one-column-layout" ? "two-column-layout" : componentType === "two-column-layout" ? "three-section-layout" : "one-column-layout";

		// Find the existing component of the opposite type and remove it
		const existingComponent = components.find((component) => component.get("type") === typeToRemove);
		if (existingComponent) {
			editor.select(existingComponent);
			editor.runCommand("core:component-delete");
		}
	}

	// Check if footer is deleted or not and change the footer button active status
	editor.on("component:remove", (component) => {

		if (component.get("type") === "footer") {

			isFooterActive = false;

			const footerToolbarButtons = footerToolbar.querySelectorAll(".footer-btn");

      footerToolbarButtons[0].classList.remove("active");
      footerToolbarButtons[1].classList.add("active");
			}
			editor.LayerManager.render(); // Force layers panel to refresh
	})
}
