export function addTabs(editor) {
  editor.DomComponents.addType("tabs", {
		model: {
			defaults: {
				tagName: "div",
				attributes: { class: "tabs" },
				content: "I'm a tabs",
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "tab-group")) {
					this.components().add({ type: "tab-group" });
					this.components().add({ type: "tab-group" });
					this.components().add({ type: "tab-group" });
					this.components().add({ type: "tab-group" });
				}
			},
		},
	});
}

export function addTabGroup(editor) {
  editor.DomComponents.addType("tab-group", {
		model: {
			defaults: {
				tagName: "div",
				attributes: { class: "tab-group"},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "tab-input")) {
					this.components().add({ type: "tab-input" });
				}

				if (!this.components().find((component) => component.get("type") === "tab-header")) {
					this.components().add({ type: "tab-header" });
				}

				if (!this.components().find((component) => component.get("type") === "tab-panel")) {
					this.components().add({ type: "tab-panel" });
				}
			},
		},
	});
}

export function addTabInput(editor) {
  editor.DomComponents.addType("tab-input", {
		model: {
			defaults: {
				tagName: "input",
			},
		},
	});
}

export function addTabHeader(editor) {
  editor.DomComponents.addType("tab-header", {
		model: {
			defaults: {
				tagName: "label",
				attributes: { contenteditable: "true" },
				content: "Tab Title 1",
			},
		},
	});
}

export function addTabPanel(editor) {
  editor.DomComponents.addType("tab-panel", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {class: "tab-panel"},
				components: [
					{
						type: "text",
						content: "Add text",
					},
				],
			},
		},
	});
}