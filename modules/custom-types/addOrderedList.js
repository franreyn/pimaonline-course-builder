export function addOrderedList(editor) {
  editor.DomComponents.addType("ol", {
		model: {
			defaults: {
				tagName: "ol",
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "li")) {
					this.components().add({ type: "li" });
				}
			},
		},
	});
}