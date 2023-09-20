export function addAccordion(editor) {
  editor.DomComponents.addType("accordion", {
		model: {
			defaults: {
				tagName: "div",
				attributes: { class: "accordion" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "accordion-item")) {
					this.components().add({ type: "accordion-item" });
				}
				if (!this.components().find((component) => component.get("type") === "add-accordion-btn")) {
					this.components().add({ type: "add-accordion-btn" });
				}
			},
		},
	});
}

export function addAccordionItem(editor) {
  editor.DomComponents.addType("accordion-item", {
		model: {
			defaults: {
				tagName: "div",
				attributes: { class: "accordion-item" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "accordion-title")) {
					this.components().add({ type: "accordion-title" });
				}
				if (!this.components().find((component) => component.get("type") === "accordion-content")) {
					this.components().add({ type: "accordion-content" });
				}
			},
		},
	});
}


export function addAccordionTitle(editor) {
  editor.DomComponents.addType("accordion-title", {
		model: {
			defaults: {
				tagName: "div",
				attributes: { class: "accordion-title toggle-btn arrow-right" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "h3")) {
					this.components().add({ type: "h3" });
				}
			},
		},
	});
}

export function addAccordionContent(editor) {
  editor.DomComponents.addType("accordion-content", {
		model: {
			defaults: {
				tagName: "div",
				attributes: { class: "accordion-content toggle-btn-content" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "paragraph")) {
					this.components().add({ type: "paragraph" });
				}
			},
		},
	});
}

export function addAccordionButton(editor) {
  editor.DomComponents.addType("add-accordion-btn add", {
		model: {
			defaults: {
				tagName: "button",
				attributes: { 
					class: "add-accordion-btn add-items-btns",
					type: "button",
				},
				content: "+ Add accordion",
			},
		},
	});
}