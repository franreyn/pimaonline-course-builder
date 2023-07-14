export function addHeader(editor) {
  editor.DomComponents.addType("header", {
		model: {
			defaults: {
				tagName: "header",
				attributes: {
					class: "header",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "banner-image")) {
					this.components().add({ type: "banner-image" });
				}

				if (!this.components().find((component) => component.get("type") === "text-container")) {
					this.components().add({ type: "text-container" });
				}
			},
		},
	});
}