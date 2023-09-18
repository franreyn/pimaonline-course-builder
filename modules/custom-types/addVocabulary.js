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
					class: "add-vocab-btn add-items-btns",
					type: "button",
				},
				content: "+ Add vocab",
			},
		},
	});
}