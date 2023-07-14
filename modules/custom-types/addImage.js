export function addFigure(editor) {
  editor.DomComponents.addType("figure", {
		model: {
			defaults: {
				tagName: "figure",
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "image")) {
					this.components().add({ type: "image" });
				}
			},
		},
	});
}

export function addFigureCaption(editor) {
  editor.DomComponents.addType("figure-caption", {
		model: {
			defaults: {
				tagName: "figure",
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "image")) {
					this.components().add({ type: "image" });
				}
				if (!this.components().find((component) => component.get("type") === "figcaption")) {
					this.components().add({ type: "figcaption" });
				}
			},
		},
	});
}

export function addFigcaption(editor) {
  editor.DomComponents.addType("figcaption", {
		model: {
			defaults: {
				tagName: "figcaption",
				attributes: { contenteditable: "true" },
				content: "Add image caption",
			},
		},
	});
}