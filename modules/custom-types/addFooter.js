export function addFooter(editor) {
  editor.DomComponents.addType("footer", {
		model: {
			defaults: {
				tagName: "footer",
				draggable: false,
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "footer-info")) {
					this.components().add({ type: "footer-info" });
				}
			},
		},
	});
}

export function addFooterInfo(editor) {
  editor.DomComponents.addType("footer-info", {
		model: {
			defaults: {
				tagName: "div",
				draggable: false,
        attributes: {
					id: "footer",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "toggle-footnotes")) {
					this.components().add({ type: "toggle-footnotes" });
				}
        if (!this.components().find((component) => component.get("type") === "footnotes")) {
					this.components().add({ type: "footnotes" }, {draggable: false},);
				}
			},
		},
	});
}

export function addToggleFootnotes(editor) {
  editor.DomComponents.addType("toggle-footnotes", {
		model: {
			defaults: {
				tagName: "p",
				draggable: false,
				contentEditable: false,
        components: [
          {
            type: "text",
						draggable: false,
						contentEditable: false,
            content: "Show Footnotes",
          },
        ],   
        attributes: {
					class: "text-center toggle-footnotes",
				},
			},
		},
	});
}

export function addFootnotes(editor) {
  editor.DomComponents.addType("footnotes", {
		model: {
			defaults: {
				tagName: "div",
				draggable: false,
        attributes: {
					class: "footnotes",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "paragraph")) {
					this.components().add({ type: "paragraph" }, { draggable: false });
				}
			},
		},
	});
}