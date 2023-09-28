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

	editor.Commands.add('redo', {

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

	// Sets a component to non-draggable upon being placed in the editor
	editor.on("component:add", function (component) {
		component.set("draggable", false);
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

	// When a component is selected, create a lock button in the component's toolbar. This button sets draggable to true and false.
	editor.on("component:selected", function (component) {
		const toolbar = component.get("toolbar");
		const toggleDragButtonExists = toolbar.some((button) => button.command === "toggle-drag");
		if (!toggleDragButtonExists) {
			toolbar.push({
				attributes: { id:"toolbar-drag", class: "fa fa-lock" },
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
}
