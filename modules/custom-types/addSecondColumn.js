export function addSecondColumn(editor) {
  editor.DomComponents.addType("second-column", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					id: "second-column",
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