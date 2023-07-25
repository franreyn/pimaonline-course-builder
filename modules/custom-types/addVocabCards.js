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
				if (!this.components().find((component) => component.get("type") === "vocab")) {
					this.components().add({ type: "vocab" });
					this.components().add({ type: "vocab" });
					this.components().add({ type: "vocab" });
					this.components().add({ type: "vocab" });
				}
			},
		},
	});
}

export function addVocab(editor) {
  editor.DomComponents.addType("vocab", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					class: "vocab",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "vocab-dt")) {
					this.components().add({ type: "vocab-dt" });
				}
				if (!this.components().find((component) => component.get("type") === "vocab-dd")) {
					this.components().add({ type: "vocab-dd" });
				}
			},
		},
	});
}

export function addVocabDt(editor) {
  editor.DomComponents.addType("vocab-dt", {
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

export function addVocabDd(editor) {
  editor.DomComponents.addType("vocab-dd", {
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