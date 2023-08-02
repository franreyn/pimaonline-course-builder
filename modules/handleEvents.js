import { config } from "../config.js";

export function handleEvents(editor, layoutsToolbar) {

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

	/*
	// When a component is duplicated, remove it's children
	editor.on('component:clone', (component) => {
		// Check if the component has any child components
		if (component.components().length > 0) {
			// If so, remove them
			component.components().reset();
		}
	});
	*/

	// If you add one type of layout (1 col, 2col, etc) and another is already there, remove the first one but first warn the user
	let columnComponentCount = 0;
	editor.on("component:add", (component) => {
		if (component.get("type") === "one-column-layout" || component.get("type") === "two-column-layout" || component.get("type") === "three-section-layout") {
			columnComponentCount += 1;
			if (columnComponentCount > 1) {
				const confirmSwitch = window.confirm("Your content will be deleted if you switch layouts, are you sure?");
				if (confirmSwitch) {
					editor.runCommand("remove-sibling-components", { component });
				} else {
					component.remove(); // Remove the component if the user cancels the first confirmation
				}
			}
		}
		setCustomLayerName(component);
		editor.LayerManager.render(); // Force layers panel to refresh
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

	// Add custom toolbar for layout components to avoid drag/drop layouts
	layoutsToolbar.addEventListener("click", (event) => {
		const button = event.target;
		if (button.tagName === "BUTTON") {
			const componentType = button.getAttribute("data-type");
			addComponentToCanvas(editor, componentType);
		}
	});

	function addComponentToCanvas(editor, componentType) {
		const layoutsToolbarButtons = layoutsToolbar.querySelectorAll(".layout-btn");
		// let activeButton = null;

		// Make active btn unclickable if clicked again
		const clickedButton = layoutsToolbar.querySelector(`[data-type="${componentType}"]`);
		if (clickedButton.classList.contains("active")) {
			return; // Do nothing if the button is already active
		}

		let addedComponent;

		const existingLayout = editor.DomComponents.getComponents().find(
			(component) => component.get("type") === componentType
		);

		if (!existingLayout) {
			removeExistingComponent(editor, componentType);

			addedComponent = editor.DomComponents.addComponent({
				type: componentType,
				// Add any default attributes or styles if needed
			});

			editor.select(addedComponent);

			// Remove previously selected btn
			layoutsToolbarButtons.forEach((button) => {
				if (button.classList.contains("active")) {
					button.classList.remove("active");
				}
			});

			const selectedButton = layoutsToolbar.querySelector(`[data-type="${componentType}"]`);
			selectedButton.classList.add("active");
		} else {
			// If the layout is already active, show the confirmation dialog
			const confirmSwitch = window.confirm("Your content will be deleted if you switch layouts, are you sure?");
			if (confirmSwitch) {
				editor.runCommand("remove-sibling-components", { component: existingLayout });
				
				// Remove active class from all buttons and mark the clicked button as active
				layoutsToolbarButtons.forEach((button) => {
					if (button.dataset.type !== componentType) {
						// button.classList.remove("active");
					} else {
						console.log(confirmSwitch);
						// button.classList.add("active");
					}
				});
			}
		}

		// Set custom layer name and refresh layers panel
		setCustomLayerName(existingLayout || addedComponent);
		editor.LayerManager.render();
	}	
}