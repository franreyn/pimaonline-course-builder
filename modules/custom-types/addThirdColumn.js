export function addThirdColumn(editor) {
  editor.DomComponents.addType("third-column", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					id: "third-column",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "content-body")) {
					this.components().add({ type: "content-body" });
					this.components().add({ type: "add-content-body-btn", content: "+ Add Content Body" })
				}
			},
		},
	});
}