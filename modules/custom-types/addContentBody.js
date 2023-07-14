export function addContentBody(editor) {
  editor.DomComponents.addType("content-body", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					class: "content-body",
					//'data-gjs-type': 'content-body',
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "h2")) {
					this.components().add({ type: "h2" });
				}
			},
		},
	});
}