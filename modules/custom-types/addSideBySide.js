export function addSideBySide(editor) {
  editor.DomComponents.addType("side-by-side", {
		model: {
			defaults: {
				tagName: "div",
				attributes: { class: "side-by-side" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "side-by-side-item")) {
					this.components().add({ type: "side-by-side-item" });
					this.components().add({ type: "side-by-side-item" });
				}
			},
		},
	});
}

export function addSideBySideItem(editor) {
  editor.DomComponents.addType("side-by-side-item", {
		model: {
			defaults: {
				tagName: "div",
				attributes: { class: "side-by-side-item" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "h3")) {
					this.components().add({ type: "h3" });
				}
				if (!this.components().find((component) => component.get("type") === "paragraph")) {
					this.components().add({ type: "paragraph" });
				}
			},
		},
	});
}