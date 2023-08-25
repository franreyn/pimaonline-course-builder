export function addTwoColumnLayout(editor) {
  	// Two column components
	editor.DomComponents.addType("two-column-layout", {
		model: {
			defaults: {
				tagName: "body",
				attributes: { id: "two-column",
				class: "layout", },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "header")) {
					this.components().add({ type: "header" });
				}

				if (!this.components().find((component) => component.get("type") === "content-wrapper")) {
					this.components().add({ type: "content-wrapper" });
				}

				if (!this.components().find((component) => component.get("type") === "second-column")) {
					this.components().add({ type: "second-column" });
				}
			},
		},
	});
}