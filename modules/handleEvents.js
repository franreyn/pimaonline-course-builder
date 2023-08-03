import { config } from "../config.js";
import { addComponentToCanvas } from "./utils.js" 

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

  // Listen for click on layout selection buttons
	layoutsToolbar.addEventListener("click", (event) => {
		const button = event.target;
		if (button.tagName === "BUTTON") {
			const componentType = button.getAttribute("data-type");
			addComponentToCanvas(editor, componentType);
		}
	});
}