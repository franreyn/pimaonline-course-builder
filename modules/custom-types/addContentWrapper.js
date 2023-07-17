export function addContentWrapper(editor) {
  editor.DomComponents.addType("content-wrapper", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					id: "content-wrapper",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "content-body")) {
					this.components().add({ type: "content-body" });
				}
			},
		},
	});
}