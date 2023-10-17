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
				if (!this.components().find((component) => component.get("type") === "add-vocab-card-btn")) {
					this.components().add({ type: "add-vocab-card-btn" });
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
				if (!this.components().find((component) => component.get("type") === "dt")) {
					this.components().add({ type: "dt" });
				}
				if (!this.components().find((component) => component.get("type") === "dd")) {
					this.components().add({ type: "dd" });
				}
			},
		},
	});
}

export function addVocabCardButton(editor) {
  editor.DomComponents.addType("add-vocab-card-btn", {
		model: {
			defaults: {
				tagName: "button",
				attributes: { 
					class: "add-vocab-card-btn add-items-btns",
					type: "button",
				},
				content: "+ Add Card",
			},
		},
	});
}