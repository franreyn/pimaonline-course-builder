export function addColumns(editor) {
  editor.DomComponents.addType("columns", {
		model: {
			defaults: {
				tagName: "div",
				attributes: { class: "columns" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "col-item")) {
					this.components().add({ type: "col-item" });
					this.components().add({ type: "col-item" });
					this.components().add({ type: "col-item" });
				}
			},
		},
	});
}

export function addColItem(editor) {
  editor.DomComponents.addType("col-item", {
		model: {
			defaults: {
				tagName: "div",
				attributes: { class: "col-item" },
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