export function addBorder(editor) {
  editor.DomComponents.addType("border", {
		model: {
			defaults: {
				tagName: "div",
				attributes: { class: "border" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "h3")) {
					this.components().add({ type: "h3" });
				}
				if (!this.components().find((component) => component.get("type") === "paragraph")) {
					this.components().add({ type: "paragraph" });
				}
			},
		},
	});
}