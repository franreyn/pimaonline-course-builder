import { config } from "../config.js";
import { addComponentToCanvas } from "./utils.js";

export function handleEvents(editor, layoutsToolbar, footerToolbar, panelSwitcher) {

	// Initalize layer buttons and set to display none
	const layoutBtns = document.querySelectorAll(".layer-btn");

	layoutBtns.forEach((btn) => {
		btn.style.display = "none";
	})

	//Remove layer editing buttons for all other panels other than the layer panel
	panelSwitcher.addEventListener("click", (event) => {

		const panelType = event.target;

		if(panelType.classList.contains("layers")) {
			layoutBtns.forEach((btn) => {
				btn.style.display = "";
			})

		} else {
			layoutBtns.forEach((btn) => {
				btn.style.display = "none";
			})		
		}
	})
	const panelButtons = panelSwitcher.querySelectorAll(".gjs-pn-btn");
    panelButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (button.classList.contains("blocks")) {
                layoutsToolbar.style.display = ""; // Display the layoutsToolbar
            } else {
                layoutsToolbar.style.display = "none"; // Hide the layoutsToolbar
            }
        });
    });

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
			// User confirmed, so remove sibling components and update active class
			editor.runCommand("remove-sibling-components", { component: component });
    }
    setCustomLayerName(component);
    editor.LayerManager.render();
  });  
	
	layoutsToolbar.addEventListener("click", (event) => {
		const button = event.target;
		if (button.tagName === "BUTTON") {
			const componentType = button.getAttribute("data-type");
	
			// Check if the clicked button is already active
			if (!button.classList.contains("active")) {
				const activeLayoutBtn = layoutsToolbar.querySelector(".layout-btn.active");
	
				if (activeLayoutBtn) {
					// Ask for confirmation only if switching from an active layout
					const isConfirmed = window.confirm("Your content will be deleted if you switch layouts, are you sure?");
					if (isConfirmed) {
						// Remove the "active" class from the previous active button
						activeLayoutBtn.classList.remove("active");
	
						// Add the "active" class to the clicked button
						button.classList.add("active");
	
						// Remove the existing layout component and add the new one
						addComponentToCanvas(editor, componentType);
					}
				} else {
					// No active layout, so just add the new layout component
					button.classList.add("active");
					addComponentToCanvas(editor, componentType);
				}
			}
		}
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

	let isFooterActive =  false;

  // Wait for the editor to load before accessing its properties
  editor.on("load", () => {
    // Now it's safe to access editor properties
    isFooterActive = editor.getWrapper().find('[data-gjs-type="footer"]').length > 0;
  });

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

	// Check to see if certain components are added and remove and add the script
	editor.on("component:add", (component) => {
		if ("footer" === component.get("type") || "h5p-container" === component.get("type") || "panopto-container" === component.get("type") || "youtube-container" === component.get("type") || "table" === component.get("type") || "vocab-list" === component.get("type")) {
			const existingScript = editor.DomComponents.getComponents().find(comp => comp.get("type") === "script");
      if (existingScript) {
				console.log(existingScript)
				existingScript.remove()
      }
      editor.DomComponents.addComponent({ type: "script" });
		}
	})
}