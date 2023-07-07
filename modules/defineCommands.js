

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
	editor.Commands.add("set-device-mobile", {
		run: (editor) => editor.setDevice("Mobile"),
	});

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

  //
  editor.Commands.add("remove-sibling-components", {
    run(editor, sender, data) {
      const component = data.component;
      const parent = component.parent();
      const siblings = parent.components();
      siblings.forEach((sibling) => {
        if (sibling !== component) {
          sibling.remove();
          // Trigger a custom event after removing the component
          sibling.trigger("custom:update");
        }
      });
    },
  });
}
