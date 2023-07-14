export function addTextContainer(editor) {
  editor.DomComponents.addType("text-container", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					class: "text-container",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "h1")) {
					this.components().add({ type: "h1" });
				}
				if (!this.components().find((component) => component.get("type") === "paragraph")) {
					this.components().add({ type: "paragraph" });
				}
			},
		},
	});
}