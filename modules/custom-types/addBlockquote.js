export function addBlockquote(editor) {
  editor.DomComponents.addType("blockquote", {
		model: {
			defaults: {
				tagName: "blockquote",
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "paragraph")) {
					this.components().add({ type: "paragraph" });
				}
			},
		},
	});
}