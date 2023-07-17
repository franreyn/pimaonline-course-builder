export function addOneColumnLayout(editor) {
	editor.DomComponents.addType("one-column-layout", {
		model: {
			defaults: {
				tagName: "body",
				attributes: { id: "one-column" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "header")) {
					this.components().add({ type: "header" });
				}

				if (!this.components().find((component) => component.get("type") === "content-wrapper")) {
					this.components().add({ type: "content-wrapper" });
				}
			},
		},
	});

}