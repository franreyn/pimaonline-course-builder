export function defineCommands(editor) {
	//=== Define commands ===//
	editor.Commands.add("show-layers", {
		getRowEl(editor) {
			return editor.getContainer().closest(".editor-row");
		},
		getLayersEl(row) {
			return row.querySelector(".layers-container");
		},

		run(editor, sender) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = "";
		},
		stop(editor, sender) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = "none";
		},
	});
	editor.Commands.add("show-styles", {
		getRowEl(editor) {
			return editor.getContainer().closest(".editor-row");
		},
		getStyleEl(row) {
			return row.querySelector(".styles-container");
		},

		run(editor, sender) {
			const smEl = this.getStyleEl(this.getRowEl(editor));
			smEl.style.display = "";
		},
		stop(editor, sender) {
			const smEl = this.getStyleEl(this.getRowEl(editor));
			smEl.style.display = "none";
		},
	});
	editor.Commands.add("show-blocks", {
		getRowEl: (editor) => editor.getContainer().closest(".editor-row"),
		getBlocksEl: (editor) => editor.querySelector(".blocks-container"),
		run(editor, sender) {
			this.getBlocksEl(this.getRowEl(editor)).style.display = "";
		},
		stop(editor, sender) {
			this.getBlocksEl(this.getRowEl(editor)).style.display = "none";
		},
	});

	// End Define commands ===//

	//=== Device manager commands ===//
	editor.Commands.add("set-device-desktop", {
		run: (editor) => editor.setDevice("Desktop"),
	});
	editor.Commands.add("set-device-tablet", {
		run: (editor) => editor.setDevice("Tablet"),
	});
	editor.Commands.add("set-device-mobile", {
		run: (editor) => editor.setDevice("Mobile"),
	});

	//== Basic commands == //

	// Traits manager commands
	editor.Commands.add("show-traits", {
		getTraitsEl(editor) {
			const row = editor.getContainer().closest(".editor-row");
			return row.querySelector(".traits-container");
		},
		run(editor, sender) {
			this.getTraitsEl(editor).style.display = "";
		},
		stop(editor, sender) {
			this.getTraitsEl(editor).style.display = "none";
		},
	});

	// Functionality for redo and undo buttons
	editor.Commands.add("undo", {
	});

	editor.Commands.add("redo", {

	});

	// Swap layouts by removing old layout
	editor.Commands.add("remove-sibling-components", {
		run(editor, sender, data) {
			const component = data.component;
			const parent = component.parent();
			const siblings = parent.components();
			siblings.forEach((sibling) => {
				if (sibling !== undefined) {
					if (sibling !== component) {
						sibling.remove();
						// Trigger a custom event after removing the component
						sibling.trigger("custom:update");
					}
				}
			});
		},
	});

	editor.Commands.add("duplicate-layer", {
		run: function (editor, sender) {
			sender.set("active", false); // Deactivate the button after it's clicked

			var selectedComponent = editor.getSelected();
			if (selectedComponent) {
				var blockId = selectedComponent.get("type"); // Get the type of the selected component
				var blockDefinition = editor.BlockManager.get(blockId); // Get the original block definition

				if (blockDefinition) {
					var content = blockDefinition.get("content"); // Get the original content of the block
					selectedComponent.parent().append(content); // Add a new instance of the block to the canvas
				}

				editor.trigger("component:update"); // Trigger an update
			}
		},
	});

	editor.Commands.add("delete-layer", {
		run: function (editor, sender) {
			sender.set("active", false); // Deactivate the button after it's clicked

			var selectedComponent = editor.getSelected();
			if (selectedComponent) {
				selectedComponent.remove(); // Remove the selected component
				editor.select(null);
				editor.trigger("component:update"); // Trigger an update
			}
		},
	});

	// Toggle draggable property of component (used in function directly below)
	editor.Commands.add("toggle-drag", {
		run: function (editor, sender) {
			const selectedComponent = editor.getSelected();
			if (selectedComponent) {
				const draggable = selectedComponent.get("draggable");
				selectedComponent.set("draggable", !draggable);
			}
		},
	});

	// Create interaction button in toolbar
	editor.Commands.add("interact-click", {
		run: function (editor, sender) {
			const selectedComponent = editor.getSelected();
			if (selectedComponent) {

				// Accordion Widget - Click Functionality
				if (selectedComponent.attributes.type === "accordion-title") {
					let parentElement = selectedComponent.parent().view.el;

					// Get all child elements of the parent
					let children = parentElement.children;

					// Loop through the child elements
					for (let i = 0; i < children.length; i++) {
						let childElement = children[i];

						// Check if the child element matches the desired type
						if (childElement.getAttribute("data-gjs-type") === "accordion-content") {

							// Set this variable to ensure it has the right scope 
							let visible = false;

							// Checks the display property on the accordion-content element
							if (window.getComputedStyle(childElement).display === "block") {
								visible = true;
							}

							// Depending on if the element is visible or not, it'll add the correct display attribute
							if (visible) {
								childElement.style.display = "none";
							} else {
								childElement.style.display = "block";
							}
						}
					}
				}

				// Flip Card Widget - Click Functionality
				const flipCardClickHandler = (selectedComponent) => {

					// Get the parent element (inner-card) and toggle flip class
					const parentElement = selectedComponent.parent().view.el;
					parentElement.classList.toggle("flip");
				};

				if (selectedComponent.attributes.type === "flip-card-front" || selectedComponent.attributes.type === "flip-card-back") {
					flipCardClickHandler(selectedComponent)
				}
			}
		},
	});
}
