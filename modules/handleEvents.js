import { config } from "../config.js";
import { addComponentToCanvas, removeItemsBtns } from "./utils.js";

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
                footerToolbar.style.display = ""; // Display the layoutsToolbar
            } else {
                layoutsToolbar.style.display = "none"; // Hide the layoutsToolbar
                footerToolbar.style.display = "none"; // Hide the layoutsToolbar
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
		removeItemsBtns();
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
		removeItemsBtns();
	});

	// When a component is mounted, ensures that 'content-body' components can only be added as children of 'content-wrapper' or 'second-column' components. If a 'content-body' component is added elsewhere, it is automatically removed.
  editor.on("component:mount", (component) => {
    if (component.get("type") === "content-body") {
      const parentComponent = component.parent();
      if (parentComponent) {
        const parentType = parentComponent.get("type");
        const validParentTypes = ["content-wrapper", "second-column", "third-column"];
        if (!validParentTypes.includes(parentType)) {
          component.remove();
        }
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
				editor.UndoManager.skip( () => {
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
			})
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
			removeItemsBtns();
	})

	// Check to see if certain components are added and remove and add the script
	editor.on("component:add", (component) => {
		for(let jsCopmonentIndex = 0; jsCopmonentIndex < config.requiresJsComponents.length; jsCopmonentIndex++) {
			if(component.get("type") == config.requiresJsComponents[jsCopmonentIndex]) {
				const existingScript = editor.DomComponents.getComponents().find(comp => comp.get("type") === "script");
				if (existingScript) {
					existingScript.remove()	
				}
				// Adds JS back to the DOM to refire the JS 
				editor.DomComponents.addComponent({ type: "script" });
			}
		}
	})

	// Check if component is a heading and if it is, remove the CK Editor toolbar
	editor.on('component:selected', function(component) {

		let parentComponent = component.parent();
		let ckToolbar = document.querySelector("div.gjs-rte-toolbar");

		if (parentComponent) {

			let parentType = parentComponent.get('type');

		if(parentType == "h1" || parentType == "h2" || parentType == "h3" || parentType == "h4" || parentType == "h5" || parentType == "h6" || parentType == "tab-header") {
			ckToolbar.classList.add('remove-ck-toolbar');
		} else {
			ckToolbar.classList.remove('remove-ck-toolbar');
		}
	}
	});


	// Check tab inputs and labels and add click events and attributes
	editor.on("component:add", (component) => {

		// Keep track of the number of tabs widgets
		if(component.get("type") === "tabs") {
		labelTabs();
		}

		// If add tab button is clicked
		if (component.get("type") === "tab-btn") {
			component.view.el.addEventListener("click", () => {

				let tabSelector = component.view.el.attributes.id.value;

				tabSelector = tabSelector.replace(/^addBtn/, "tabWidget");

        const addTabLocation = editor.getWrapper().find(`#${tabSelector}`);

        if (addTabLocation) {
            // Attempt to add the component
            let tabInputComponent = editor.DomComponents.addComponent({ type: "tab-input" });
            let tabHeaderComponent = editor.DomComponents.addComponent({ type: "tab-header" });
            let tabPanelComponent = editor.DomComponents.addComponent({ type: "tab-panel" });

						// Get the number of existing components in the container
						const tabLength = addTabLocation[0].components().length;

						// Accounting for the add tab button and hide tab
						const addTabIndex = tabLength - 4;

						addTabLocation[0].append([tabInputComponent, tabHeaderComponent, tabPanelComponent], {at: addTabIndex});
						labelTabs();
            }
        }
			)}
	});

	// Check tab inputs and labels and add click events and attributes
	editor.on("component:add", (component) => {

		if (component.get("type") === "add-dl-btn") {

			component.view.el.addEventListener("click", () => {

			let descriptionList = component.parent();

			// Find location right after button to add the new term
			let dlIndex = descriptionList.components().length - 1;

			// Define other types added when button is clicked
			let descriptionTerm = editor.DomComponents.addComponent({ type: "dt" });
			let descriptionDef = editor.DomComponents.addComponent({ type: "dd" });

			descriptionList.append([descriptionTerm, descriptionDef], {at: dlIndex});
		})	
	}
	})

	// When one part of tabs is removed, remove the rest of the tab parts
  editor.on("component:remove", (removedComponent) => {

		if(removedComponent.parent().attributes.type == "tab-header") {

			let idInput = removedComponent.parent().view.el.attributes.for.value;

			//Edit the returned value to target panel
			let idPanel = idInput
			idPanel = idPanel.replace(/^tab/, "tabContent");

			// Remove input
			let input = editor.getWrapper().find(`#${idInput}`);
			if(input.length > 0) {
			input[0].remove();
			}

			// Remove panel
			let panel = editor.getWrapper().find(`#${idPanel}`);
			if(panel.length > 0) {
			panel[0].remove();
			}

			// Remove label
			removedComponent.parent().remove();
		} 
	});
	
	// This function runs through the editor and assigns all tab related classes and attributes
	function labelTabs() {

		let tabNum = 1;
		let tabWidgets = editor.Canvas.getBody().querySelectorAll(".tabs");

		// For every tabs widget there is, parse through each tab
		tabWidgets.forEach( (tab,index) => {

			let tabWidgetNum = index + 1;

			tabWidgets[index].setAttribute("id", `tabWidget${tabWidgetNum}`);

			let tabInputs = tab.querySelectorAll("input");
			let tabLabels = tab.querySelectorAll("label");
			let tabPanels = tab.querySelectorAll(".tab-panel");
			let addTabBtn = tab.querySelector(".add-tab-btn");
			let groupNum = index + 1;

			for(let tabIndex = 0; tabIndex < tabInputs.length; tabIndex++) {

				// Edit tab inputs 
				tabInputs[tabIndex].setAttribute("id", `tab${tabNum}`);
				tabInputs[tabIndex].setAttribute("name", `hint-group-${groupNum}`);
				tabInputs[tabIndex].addEventListener("click", () => {
				tabInputs[tabIndex].checked = true;
				})

				// Edit tab labels
				tabLabels[tabIndex].setAttribute("for", `tab${tabNum}`);
				tabLabels[tabIndex].addEventListener("click", () => {
					let input = tabLabels[tabIndex].previousElementSibling;
					if (input && input.type === 'radio') {
						input.checked = true;
					}	
				})

				// Edit panels 
				tabPanels[tabIndex].setAttribute("id", `tabContent${tabNum}`)

				// Add hide tab at the end
				if(tabIndex + 1 == tabInputs.length) {
					tabLabels[tabIndex].classList.add("hide-tab");
					tabInputs[tabIndex].checked = true;
					tabPanels[tabIndex].classList.add("hide-panel")
				}
				tabNum++;
			}

			//Add id to add tab button
			addTabBtn.setAttribute("id", `addBtn${tabWidgetNum}`)
		})
}

	function addButtonClickListener(componentType) {
		const componentTypeToItemType = {
			"add-accordion-btn": "accordion-item",
			"add-content-body-btn": "content-body",
			"add-assignment-btn": "assignment",
			"add-img-btn": "image-box",
			"add-vocab-btn": "vocab-wrapper",
			"add-vocab-card-btn": "vocab-item"
		};

		let clickCount = 0;
		editor.on("component:add", (component) => {
			if (component.get("type") === componentType) {
				component.view.el.addEventListener("click", () => {
					let parentComponent = component.parent();
					let index = parentComponent.components().length - 1;
					let newItemType = componentTypeToItemType[componentType];
					let newItem = editor.DomComponents.addComponent({ type: newItemType });

					parentComponent.append([newItem], { at: index });
					removeItemsBtns();
				});
			}
		});
	}

	const btnTypes = ["add-vocab-btn", "add-img-btn", "add-assignment-btn","add-accordion-btn", "add-content-body-btn", "add-vocab-card-btn"];
	btnTypes.forEach(btnType => {
		addButtonClickListener(btnType);
	})
}