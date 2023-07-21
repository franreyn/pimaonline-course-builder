export function addHorizontalDisplay(editor) {
  editor.DomComponents.addType("horizontal-display", {
		model: {
			defaults: {
				tagName: "div",
        attributes: {
					class: "horizontal-display",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "image")) {
					this.components().add({ type: "image" });
          this.components().add({ type: "image" });
					this.components().add({ type: "image" });
          this.components().add({ type: "image" });
				}
			},
		},
	});
}