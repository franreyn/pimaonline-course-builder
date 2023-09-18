export function addVocabulary(editor) {
  editor.DomComponents.addType("vocab-list", {
		model: {
			defaults: {
				tagName: "dl",
				attributes: { class: "vocab-list" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "vocab-wrapper")) {
					this.components().add({ type: "vocab-wrapper" });
				}
				if (!this.components().find((component) => component.get("type") === "add-vocab-btn")) {
					this.components().add({ type: "add-vocab-btn" });
				}

				// Create a flag to track whether the view is available
        // this.isViewAvailable = false;

        // Check if the view is available, and if not, wait for it to be ready
      //   if (this.view) {
      //     this.isViewAvailable = true;
      //     this.addButton("+ Add Vocab", "add-vocab-btn", () => this.addVocab());
      //   } else {
      //     editor.on("component:update", (model) => {
      //       if (!this.isViewAvailable && model.view) {
      //         this.isViewAvailable = true;
      //         this.addButton("+ Add Vocab", "add-vocab-btn", () => this.addVocab());
      //       }
      //     });
      //   }
			// },

			// addButton(text, className, clickHandler) {
      //   if (this.isViewAvailable) {
      //     const button = document.createElement("button");
      //     button.textContent = text;
      //     button.className = className;
      //     button.addEventListener("click", clickHandler);
      //     this.view.el.appendChild(button);
      //   }
      // },

			// addVocab() {
			// 	this.components().add({ type: "vocab-wrapper" });
      // },
		},
	},
});
}

export function addVocabularyWrapper(editor) {
  editor.DomComponents.addType("vocab-wrapper", {
		model: {
			defaults: {
				tagName: "div",
				attributes: { class: "vocab-wrapper" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "description-term")) {
					this.components().add({ type: "description-term" });
				}
				if (!this.components().find((component) => component.get("type") === "description-definition")) {
					this.components().add({ type: "description-definition" });
				}
			},
		},
	});
}

export function addVocabularyTerm(editor) {
  editor.DomComponents.addType("description-term", {
		model: {
			defaults: {
				tagName: "dt",
				components: [
					{
						type: "text",
						content: "Add term",
					},
				],
			},
		},
	});
}
export function addVocabularyDefinition(editor) {
  editor.DomComponents.addType("description-definition", {
		model: {
			defaults: {
				tagName: "dd",
				components: [
					{
						type: "text",
						content: "Add definition",
					},
				],
			},
		},
	});
}

export function addVocabButton(editor) {
  editor.DomComponents.addType("add-vocab-btn", {
		model: {
			defaults: {
				tagName: "button",
				attributes: { 
					class: "add-vocab-btn",
					type: "button",
				},
				content: "+ Add vocab",
			},
		},
	});
}