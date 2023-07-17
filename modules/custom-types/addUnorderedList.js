export function addUnorderedList(editor) {
  editor.DomComponents.addType("ul", {
		model: {
			defaults: {
				tagName: "ul",
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "li")) {
					this.components().add({ type: "li" });
				}
			},
		},
	});
}