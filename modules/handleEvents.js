import { config } from "../config.js";
import { addComponentToCanvas, removeItemsBtns } from "./utils.js";

const addTextDefaultText = "Add text"; // Don't change this text. This is for finding generic text added by Grapes JS
const frontSideText = "Front Side"; // Text for flip card front side
const backSideText = "Back Side"; // Text for flip card back side
const previewBtnText = "Close"; // Text for button when preview mode is active
const footerAddAlert = "Please add a layout first"; // Alert when adding a footer before adding a layout
const clickableItems = ["accordion-title", "flip-card-front", "flip-card-back"]; // Array of clickable items to know which ones to attach the click toolbar button to


export function handleEvents(editor, layoutsToolbar, footerToolbar, panelSwitcher) {
	// Initalize layer buttons and set to display none
	const layoutBtns = document.querySelectorAll(".layer-btn");

	layoutBtns.forEach((btn) => {
		btn.style.display = "none";
	});

	//Remove layer editing buttons for all other panels other than the layer panel
	panelSwitcher.addEventListener("click", (event) => {
		const panelType = event.target;

		if (panelType.classList.contains("layers")) {
			layoutBtns.forEach((btn) => {
				btn.style.display = "";
			});
		} else {
			layoutBtns.forEach((btn) => {
				btn.style.display = "none";
			});
		}
	});

	// Copy functionality of accordions in layers panel for blocks
	let generalOptions = document.querySelector("#general-options");
	let generalOptionsTitle = document.querySelector(".general-options-title");
	let generalOptionsCaret = document.querySelector(".general-options-title > *");
	let isOpen = true;

	generalOptionsTitle.addEventListener("click", () => {

		generalOptions.classList.toggle("gjs-open")

		if (isOpen) {
			generalOptionsCaret.classList.remove("fa-caret-down")
			generalOptionsCaret.classList.add("fa-caret-right")
			isOpen = false;
		} else {
			generalOptionsCaret.classList.remove("fa-caret-right")
			generalOptionsCaret.classList.add("fa-caret-down")
			isOpen = true;
		}
	})

	// Change visibility of footer, layout, and general options depending on which panel is selected
	const panelButtons = panelSwitcher.querySelectorAll(".gjs-pn-btn");
	panelButtons.forEach(button => {
		button.addEventListener("click", () => {
			if (button.classList.contains("blocks")) {
				generalOptions.style.display = ""; //Display general options container
			} else if (button.classList.contains("styles")) {
				let statusInput = document.querySelector(".gjs-clm-header-status");
				statusInput.style.display = "none";
			} else {
				generalOptions.style.display = "none"; //Hide general options container
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

	editor.on("component:add", (component) => {
		if (("one-column-layout" === component.get("type") || "two-column-layout" === component.get("type") || "three-section-layout" === component.get("type")) && (columnComponentCount += 1) > 1) {
			// User confirmed, so remove sibling components and update active class
			editor.runCommand("remove-sibling-components", { component: component });
		}
		setCustomLayerName(component);
		editor.LayerManager.render();
		removeItemsBtns();

		// Check to see if components that require themepack's JS are added onto the canvas, if so remove and re-add the override.js file
		for (let jsCopmonentIndex = 0; jsCopmonentIndex < config.requiresJsComponents.length; jsCopmonentIndex++) {
			if (component.get("type") == config.requiresJsComponents[jsCopmonentIndex]) {
				const existingScript = editor.DomComponents.getComponents().find((comp) => comp.get("type") === "script");
				if (existingScript) {
					existingScript.remove();
				}
				// Adds JS back to the DOM to refire the JS
				editor.DomComponents.addComponent({ type: "script" });
			}
		}

		// Check tab inputs and labels and add click events and attributes
		// Keep track of the number of tabs widgets
		if (component.get("type") === "tabs") {
			labelTabs();
		}

		// If add tab button is clicked
		if (component.get("type") === "add-tab-btn") {
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

					addTabLocation[0].append([tabInputComponent, tabHeaderComponent, tabPanelComponent], { at: addTabIndex });
					labelTabs();
				}
			});
		}

		// Check tab inputs and labels and add click events and attributes
		if (component.get("type") === "add-dl-btn") {
			component.view.el.addEventListener("click", () => {
				let descriptionList = component.parent();

				// Find location right after button to add the new term
				let dlIndex = descriptionList.components().length - 1;

				// Define other types added when button is clicked
				let descriptionTerm = editor.DomComponents.addComponent({ type: "dt" });
				let descriptionDef = editor.DomComponents.addComponent({ type: "dd" });

				descriptionList.append([descriptionTerm, descriptionDef], { at: dlIndex });
			});
		}

		// Sets a component to non-draggable upon being placed in the editor
		component.set("draggable", false);

		// If component added is 
		if (component.get("type") == "flip-card-front") {
			handleFlipCardTextChange("front");
		}
		if (component.get("type") == "flip-card-back") {
			handleFlipCardTextChange("back");
		}

		// Function for changing the text from "add text" to front and back
		function handleFlipCardTextChange(side) {

			// Label the text to say front or back side for UI purposes
			if (side == "front") {
				let fronts = editor.getWrapper().find('[data-gjs-type="flip-card-front"]');
				fronts.forEach((frontTextComponent) => {
					let frontArea = frontTextComponent.view.el;
					let text = frontArea.querySelector('[data-gjs-type="text"]')

					// If the front of the card says "Add text" then change it to say front side for UI purposes
					if (text.textContent == addTextDefaultText) {
						text.textContent = frontSideText;
					}
				})
			}

			if (side == "back") {
				let backs = editor.getWrapper().find('[data-gjs-type="flip-card-back"]');
				backs.forEach((frontTextComponent) => {
					let backArea = frontTextComponent.view.el;
					let text = backArea.querySelector("[data-gjs-type='text']")

					// If the back of the card says "Add text" then change it to say back side for UI purposes
					if (text.textContent == addTextDefaultText) {
						text.textContent = backSideText;
					}
				})

			}
		}
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
	editor.on("component:remove", (removedComponent) => {
		editor.LayerManager.render(); // Force layers panel to refresh
		removeItemsBtns();

		//If component removed has an "add item" button, and is the last child element, then remove the button
		const typesToCheck = ["vocab-item", "col-item", "flip-card", "accordion", "assignments-widget", "columns", "dl", "image-gallery", "tabs", "vocab-cards", "vocab-list"];

		let componentParent = removedComponent.parent();

		if (componentParent) {
			let parentType = componentParent.get("type");

			// If parent component is vocab-wrapper, delete vocab wrapper
			if (componentParent && parentType == "vocab-wrapper") {
				componentParent.remove();
			}

			//If parent component is gallery-wrapper, delete two levels
			if (componentParent && parentType == "gallery-wrapper") {
				let parentClasses = componentParent.components().models[0].attributes.attributes.class;
				if (parentClasses && parentClasses.includes("add-items-btns")) {
					componentParent.parent().remove()
				}
			} else if (componentParent && typesToCheck.includes(parentType)) {
				if (componentParent.components().length > 0) {
					let parentClasses = componentParent.components().models[0].attributes.attributes.class;

					//If the first component is an "add items" button delete parent component
					if (parentClasses && parentClasses.includes("add-items-btns")) {
						componentParent.remove()
					}
				}
			}

			// Check if footer is deleted or not and change the footer button active status
			if (removedComponent.get("type") === "footer") {
				isFooterActive = false;

				const footerToolbarButtons = footerToolbar.querySelectorAll(".footer-btn");

				footerToolbarButtons[0].classList.remove("active");
				footerToolbarButtons[1].classList.add("active");
			}

			// If text comp attribute is added, remove parent component but if text belongs to table elements, don't delete
			const tableElements = ["tbody", "tbody-tr", "td"];

			if (tableElements.includes(parentType)) {
			} else if (removedComponent.parent() && removedComponent.parent().view.el.attributes.textComp) {
				let isText = removedComponent.parent().view.el.attributes.textComp.value

				if (isText) {
					removedComponent.parent().remove();
				}
			}

			// When the inner-card for the flip card is removed, remove the rest of the flip card
			if (removedComponent.parent() && removedComponent.parent().attributes.type == "flip-card" || removedComponent.parent() && removedComponent.parent().attributes.type == "inner-flip-card") {

				// Remove the parent container
				removedComponent.parent().remove();
			}

			// When one part of tabs is removed, remove the rest of the tab parts
			if (removedComponent.parent() && removedComponent.parent().attributes.type == "tab-header" || removedComponent.parent() && removedComponent.parent().attributes.type == "tab-hide") {
				let idInput = removedComponent.parent().view.el.attributes.for.value;

				//Edit the returned value to target panel
				let idPanel = idInput.replace(/^tab/, "tabContent");

				// Remove input
				let input = editor.getWrapper().find(`#${idInput}`);
				if (input.length > 0) {
					input[0].remove();
				}

				// Remove panel
				let panel = editor.getWrapper().find(`#${idPanel}`);
				if (panel.length > 0) {
					panel[0].remove();
				}

				// Remove label
				removedComponent.parent().remove();
			}
		}
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
	let isFooterActive = false;

	// Wait for the editor to load before accessing its properties
	editor.on("load", () => {
		// Now it's safe to access editor properties
		isFooterActive = editor.getWrapper().find('[data-gjs-type="footer"]').length > 0;
	});

	footerToolbar.addEventListener("click", (event) => {
		const elements = editor.DomComponents.getWrapper().find("body")[0];

		// If the user tries to add a footer before adding a layout show an alert
		if (!elements) {
			window.alert(footerAddAlert);
		}
		// Else add the footer
		else {
			// Target the input button where the footer is on/off
			const footerToolbarButtons = footerToolbar.querySelectorAll(".footer-btn");
			const button = event.target;
			if (button.tagName === "BUTTON") {

				// Get the status of the footer by getting the data-type attribute
				const footStatus = button.getAttribute("data-type");

				// If the footer status is footer-on, then add the footer and set the footer status to true
				if (footStatus == "footer-on" && !isFooterActive) {

					// Ignore the undo function for adding footers
					editor.UndoManager.skip(() => {

						// Add footer type to editor to be used
						const footerComponent = editor.DomComponents.addComponent({
							type: "footer",
							draggable: false,
							removable: false,
						});

						// Find the root body element, to ensure that the footer is added to the end
						const elements = editor.DomComponents.getWrapper().find("body")[0];

						// Add the footer
						elements.append(footerComponent);

						// Edit the classes for the footer controls
						footerToolbarButtons[0].classList.add("active");
						footerToolbarButtons[1].classList.remove("active");

						// Change the flag variable for footer to false
						isFooterActive = true;
					});
				}
				// Else if the footer status is off and you are removing the footer, remove it and change status to false
				else if (footStatus == "footer-off") {
					// Find footer DOM element
					const footerInstance = editor.getWrapper().find('[data-gjs-type="footer"]');

					// There is only one, and because it'll return a DOM collection, remove the first one (footer)
					footerInstance[0].remove();

					// Edit the classes for the footer controls
					footerToolbarButtons[1].classList.add("active");
					footerToolbarButtons[0].classList.remove("active");

					// Change the flag variable for footer to false
					isFooterActive = false;
				}
			}
		}
	});

	// Add preview mode
	let editorMenu = document.querySelector(".menu-bar");
	let editorSidebar = document.querySelector(".panel__right");
	let previewBtn = document.getElementById("btn-preview");
	let isPreview = false;
	let grapesToolbar = document.querySelector(".gjs-toolbar");

	previewBtn.addEventListener("click", () => {
		let addBtns = editor.Canvas.getBody().querySelectorAll(".add-items-btns");

		//Hide editor 
		if (!isPreview) {
			let sideBarWidth = editorSidebar.offsetWidth;

			// Edit toolbar visibility
			grapesToolbar.style.visibility = "hidden";

			// Remove add item buttons
			addBtns.forEach((btn) => {
				btn.style.display = "none"
			})

			editorMenu.classList.add("preview-menu");
			editorSidebar.style.marginRight = `-${sideBarWidth}`;

			// Remove blue outline for selected item when switching to preview mode
			let selectedItem = editor.Canvas.getBody().querySelector(".gjs-selected");
			if (selectedItem) {
				selectedItem.style.outlineColor = "transparent";
			}

			//Show Preview button 
			previewBtn.classList.add("preview-active");

			//Edit text for preview button
			previewBtn.textContent = previewBtnText

			//Change isPreview
			isPreview = true;
		} else {

			// Edit toolbar visibility
			grapesToolbar.style.visibility = "visible";

			//Show editor
			editorMenu.classList.remove("preview-menu");
			editorSidebar.style.marginRight = "0";

			// Add blue outline for selected item when switching to preview mode
			let selectedItem = editor.Canvas.getBody().querySelector(".gjs-selected");
			if (selectedItem) {
				selectedItem.style.outlineColor = "#3b97e3";
			}

			//Edit text for preview button
			previewBtn.textContent = "Preview"

			// Add back add item buttons
			addBtns.forEach((btn) => {
				btn.style.display = ""
			})

			previewBtn.classList.remove("preview-active");

			//Change isPreview
			isPreview = false;
		}
	})

	// Check if component is a heading and if it is, remove the CK Editor toolbar
	editor.on("component:selected", function (component) {

		if (isPreview) {
			component.view.el.style.setProperty("outline-color", "transparent", "important")
		} else {
			component.view.el.style.outlineColor = "#3b97e3";
		}

		// if selected component's parent is one of these types, then add an attribute
		const validTypes = ["paragraph", "image-box", "dd", "dt", "h1", "h2", "h3", "h4", "h5", "h6", "th", "td", "blockquote", "accordion-item", "vocab-wrapper"];

		if (component.parent()) {
			const parentComp = component.parent();

			if (component.parent()) {
				const parentType = component.parent().attributes.type;

				// Add an attribute to the DOM 
				if (validTypes.includes(parentType)) {
					parentComp.set("attributes", { textComp: true });
					editor.trigger("component:update", parentComp);

					editor.on("component:deselected", function (deselectedComponent) {
						if (deselectedComponent === component) {
							// Remove the "testing" attribute when the component is deselected
							parentComp.set("attributes", { textComp: false });
							editor.trigger("component:update", parentComp);
						}
					});
				}

				let parentComponent = component.parent();
				let ckToolbar = document.querySelector("div.gjs-rte-toolbar");

				if (parentComponent) {
					let parentType = parentComponent.get("type");

					if (parentType == "h1" || parentType == "h2" || parentType == "h3" || parentType == "h4" || parentType == "h5" || parentType == "h6" || parentType == "tab-header") {
						ckToolbar.classList.add("remove-ck-toolbar");
					} else {
						ckToolbar.classList.remove("remove-ck-toolbar");
					}
				}
			}
		}

		const toolbar = component.get("toolbar"); // Gets the toolbar for the selected component

		// Loop through array and conduct a check and apply functionality to it
		clickableItems.forEach((clickableItem) => {
			clickToolbarListener(clickableItem);
		});

		function clickToolbarListener(clickableItem) {
			if (component.attributes.type === clickableItem) {

				// When a component is selected and involves an interacation, create a interact button int he component tollbar. This allows for click actions like flipping the flip card or opening an accordion.
				const interactButtonExists = toolbar.some((button) => button.command === "interact-click");
				if (!interactButtonExists) {
					toolbar.push({
						attributes: { id: "interact-click", class: "fa fa-wand-magic-sparkles" },
						command: "interact-click",
						events: {
							click: function (event) {
								editor.runCommand("interact-click");
							},
						},
					});
					component.set("toolbar", toolbar);
				}
			}
		}
		// When a component is selected, create a lock button in the component's toolbar. This button sets draggable to true and false.
		const toggleDragButtonExists = toolbar.some((button) => button.command === "toggle-drag");
		if (!toggleDragButtonExists) {
			toolbar.push({
				attributes: { id: "toolbar-drag", class: "fa fa-lock" },
				command: "toggle-drag",
				events: {
					click: function (event) {
						editor.runCommand("toggle-drag");
						let element = document.getElementById("toolbar-drag");
						if (element) {
							element.classList.toggle("fa-lock");
							element.classList.toggle("fa-lock-open");
						}
					},
				},
			});
			component.set("toolbar", toolbar);
		}
	});

	// This function runs through the editor and assigns all tab related classes and attributes
	function labelTabs() {
		let tabNum = 1;
		let tabWidgets = editor.Canvas.getBody().querySelectorAll(".tabs");

		// For every tabs widget there is, parse through each tab
		tabWidgets.forEach((tab, index) => {
			let tabWidgetNum = index + 1;

			tabWidgets[index].setAttribute("id", `tabWidget${tabWidgetNum}`);

			let tabInputs = tab.querySelectorAll("input");
			let tabLabels = tab.querySelectorAll("label");
			let tabPanels = tab.querySelectorAll(".tab-panel");
			let addTabBtn = tab.querySelector(".add-tab-btn");
			let groupNum = index + 1;

			for (let tabIndex = 0; tabIndex < tabInputs.length; tabIndex++) {
				// Edit tab inputs
				tabInputs[tabIndex].setAttribute("id", `tab${tabNum}`);
				tabInputs[tabIndex].setAttribute("name", `hint-group-${groupNum}`);
				tabInputs[tabIndex].addEventListener("click", () => {
					tabInputs[tabIndex].checked = true;
				});

				// Edit tab labels
				tabLabels[tabIndex].setAttribute("for", `tab${tabNum}`);
				tabLabels[tabIndex].addEventListener("click", () => {
					let input = tabLabels[tabIndex].previousElementSibling;
					if (input && input.type === "radio") {
						input.checked = true;
					}
				});

				// Edit panels
				tabPanels[tabIndex].setAttribute("id", `tabContent${tabNum}`);

				// Add hide tab at the end
				if (tabIndex + 1 == tabInputs.length) {
					tabLabels[tabIndex].classList.add("hide-tab");
					tabInputs[tabIndex].checked = true;
					tabPanels[tabIndex].classList.add("hide-panel");
				}
				tabNum++;
			}

			//Add id to add tab button
			addTabBtn.setAttribute("id", `addBtn${tabWidgetNum}`);
		});
	}

	function addButtonClickListener(componentType) {
		const componentTypeToItemType = {
			"add-accordion-btn": "accordion-item",
			"add-content-body-btn": "content-body",
			"add-assignment-btn": "assignment",
			"add-flip-card-btn": "flip-card",
			"add-img-btn": "image-box",
			"add-vocab-btn": "vocab-wrapper",
			"add-vocab-card-btn": "vocab-item",
			"add-col-item-btn": "col-item",
		};

		editor.on("component:add", (component) => {
			if (component.get("type") === componentType) {
				component.view.el.addEventListener("click", () => {
					let parentComponent = component.parent();
					let index = parentComponent.components().length - 1;
					let newItemType = componentTypeToItemType[componentType];
					let newItem = editor.DomComponents.addComponent({ type: newItemType });

					parentComponent.append([newItem], { at: index });
				});
			}
		});
	}

	const btnTypes = ["add-vocab-btn", "add-img-btn", "add-assignment-btn", "add-accordion-btn", "add-content-body-btn", "add-flip-card-btn", "add-vocab-card-btn", "add-col-item-btn"];
	btnTypes.forEach((btnType) => {
		addButtonClickListener(btnType);
	});

	//Custom toggle for hide/show add-item-btns
	let isBtnVisible = true;
	let toggleIcon = document.querySelector(".add-btn-toggle");

	toggleIcon.addEventListener("click", () => {
		let addBtns = editor.Canvas.getBody().querySelectorAll(".add-items-btns")

		// Toggles the icon for button visibility
		if (isBtnVisible) {
			toggleIcon.classList.remove("bi-eye")
			toggleIcon.classList.add("bi-eye-slash")

		} else {
			toggleIcon.classList.remove("bi-eye-slash")
			toggleIcon.classList.add("bi-eye")

		}

		// Toggles the display property for buttons
		if (isBtnVisible) {
			addBtns.forEach((btn) => {
				btn.style.display = "none"
			})
			isBtnVisible = false;
		} else {
			addBtns.forEach((btn) => {
				btn.style.display = ""
			})
			isBtnVisible = true;
		}

	})
}
