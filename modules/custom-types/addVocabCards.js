export function addVocabCards(editor) {
  editor.DomComponents.addType("vocab-cards", {
		model: {
			defaults: {
				tagName: "dl",
				attributes: {
					class: "vocab-cards",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "vocab-item")) {
					this.components().add({ type: "vocab-item" });
					this.components().add({ type: "vocab-item" });
					this.components().add({ type: "vocab-item" });
					this.components().add({ type: "vocab-item" });
				}
			},
		},
	});
}

export function addVocabItem(editor) {
  editor.DomComponents.addType("vocab-item", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					class: "vocab",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "vocab-card-term")) {
					this.components().add({ type: "vocab-card-term" });
				}
				if (!this.components().find((component) => component.get("type") === "vocab-card-def")) {
					this.components().add({ type: "vocab-card-def" });
				}
			},
		},
	});
}

export function addVocabCardTerm(editor) {
  editor.DomComponents.addType("vocab-card-term", {
		model: {
			defaults: {
				tagName: "dt",
        attributes: { contenteditable: "true" },
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

export function addVocabCardDef(editor) {
  editor.DomComponents.addType("vocab-card-def", {
		model: {
			defaults: {
				tagName: "dd",
        attributes: { contenteditable: "true" },
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