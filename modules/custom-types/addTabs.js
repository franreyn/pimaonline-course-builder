export function addTabs(editor) {
  editor.DomComponents.addType("tabs", {
		model: {
			defaults: {
				tagName: "div",
				attributes: { class: "tabs" },
				content: "I'm a tabs",
			},
			init() {
				this.components().add({ type: "tab-input" });
				this.components().add({ type: "tab-header" });
				this.components().add({ type: "tab-panel" });

				this.components().add({ type: "tab-input" });
				this.components().add({ type: "tab-header" });
				this.components().add({ type: "tab-panel" });

				this.components().add({ type: "tab-input" });
				this.components().add({ type: "tab-header" });
				this.components().add({ type: "tab-panel" });

				this.components().add({ type: "tab-input" });
				this.components().add({ type: "tab-hide" });
				this.components().add({ type: "tab-panel" });

				this.components().add({ type: "add-tab-btn" });
			},
		},
	});
}

export function addTabInput(editor) {
  editor.DomComponents.addType("tab-input", {
		model: {
			defaults: {
				tagName: "input",
				attributes: { 
					class: "tab-input",
					type: "radio",
				},
			},
		},
	});
}

export function addTabHeader(editor) {
  editor.DomComponents.addType("tab-header", {
		model: {
			defaults: {
				tagName: "label",
				attributes: { 
					contenteditable: "true",
					draggable: false,
					class: "tab-header",
					tabindex: "0",
				},
				components: [
					{
						type: "text",
						draggable: false,
						content: "Tab Title 1",
					},
				],
			},
		},
	});
}

export function addTabHide(editor) {
  editor.DomComponents.addType("tab-hide", {
		model: {
			defaults: {
				tagName: "label",
				attributes: { 
					contenteditable: "true",
					class: "tab-header",
					tabindex: "0",
				},
				components: [
					{
						type: "text",
						content: "Hide Tabs",
					},
				],
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
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "text")) {
					this.components().add({ type: "text", content: "Add text"});
				}
			},
		},
	});
}

export function addTabButton(editor) {
  editor.DomComponents.addType("add-tab-btn", {
		model: {
			defaults: {
				tagName: "button",
				attributes: { 
					class: "add-tab-btn add-items-btns",
					type: "button",
				},
				content: "+ Add Tab",
			},
		},
	});
}