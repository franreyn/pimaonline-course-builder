export function addTable(editor) {
  editor.DomComponents.addType("table", {
		model: {
			defaults: {
				tagName: "table",
				attributes: {
					class: "display-lg",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "thead")) {
					this.components().add({ type: "thead" });
				}
			},
		},
	});
}

export function addThead(editor) {
  editor.DomComponents.addType("thead", {
		model: {
			defaults: {
				tagName: "thead",
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "tr")) {
					this.components().add({ type: "tr" });
				}
			},
		},
	});
}

export function addTr(editor) {
  editor.DomComponents.addType("tr", {
		model: {
			defaults: {
				tagName: "tr",
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "th")) {
					this.components().add({ type: "th" });
					this.components().add({ type: "th" });
					this.components().add({ type: "th" });
				}
			},
		},
	});
}

export function addTh(editor) {
  editor.DomComponents.addType("th", {
		model: {
			defaults: {
				tagName: "th",
        attributes: { contenteditable: "true", scope: "col" },
				components: [
					{
						type: "text",
						content: "Add table heading",
					},
				],
			},
		},
	});
}

export function addTbody(editor) {
  editor.DomComponents.addType("tbody", {
		model: {
			defaults: {
				tagName: "tbody",
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "tr")) {
					this.components().add({ type: "tr" });
					this.components().add({ type: "tr" });
				}
			},
		},
	});
}

export function addTd(editor) {
  editor.DomComponents.addType("td", {
		model: {
			defaults: {
				tagName: "td",
        attributes: { contenteditable: "true" },
				components: [
					{
						type: "text",
						content: "Add table description",
					},
				],
			},
		},
	});
}