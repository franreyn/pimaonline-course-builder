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

	// Restrict layoutsToolbar to display only when blocks-container is displayed
	function toggleLayoutsToolbar() {
    const blocksContainer = document.querySelector(".blocks-container");
    const otherPanels = document.querySelectorAll(".layers-container, .styles-container, .traits-container");

    if (getComputedStyle(blocksContainer).display === "block") {
      // Check if any other panel is displayed
      const anyPanelDisplayed = Array.from(otherPanels).some(panel => getComputedStyle(panel).display === "block");
      layoutsToolbar.style.display = anyPanelDisplayed ? "none" : "block";
    } else {
      layoutsToolbar.style.display = "none";
    }
  }

  // Call the toggleLayoutsToolbar function initially
  toggleLayoutsToolbar();
  window.addEventListener("load", toggleLayoutsToolbar);

  // Attach event listeners to the panels to update the layoutsToolbar visibility
  const otherPanels = document.querySelectorAll(".layers-container, .styles-container, .traits-container");
  otherPanels.forEach(panel => {
    panel.addEventListener("click", toggleLayoutsToolbar);
  });
}