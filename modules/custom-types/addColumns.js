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
				if (!this.components().find((component) => component.get("type") === "add-col-item-btn")) {
					this.components().add({ type: "add-col-item-btn" });
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

export function addColumnsButton(editor) {
  editor.DomComponents.addType("add-col-item-btn", {
		model: {
			defaults: {
				tagName: "button",
				attributes: { 
					class: "add-col-item-btn add-items-btns",
					type: "button",
				},
				content: "+ Add Column",
			},
		},
	});
}