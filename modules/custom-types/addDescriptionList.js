export function addDescriptionList(editor) {
  editor.DomComponents.addType("dl", {
		model: {
			defaults: {
				tagName: "dl",
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "dt")) {
					this.components().add({ type: "dt" });
				}
				if (!this.components().find((component) => component.get("type") === "dd")) {
					this.components().add({ type: "dd" });
				}
				if (!this.components().find((component) => component.get("type") === "add-dl-btn")) {
					this.components().add({ type: "add-dl-btn" });
				}
			},
		},
	});
}

export function addDescriptionTerm(editor) {
  editor.DomComponents.addType("dt", {
		model: {
			defaults: {
				tagName: "dt",
				components: [
					{
						type: "text",
						content: "Add term",
					},
				],
			},
		},
	});
}

export function addDescriptionDefinition(editor) {
  editor.DomComponents.addType("dd", {
		model: {
			defaults: {
				tagName: "dd",
				components: [
					{
						type: "text",
						content: "Add definition",
					},
				],
			},
		},
	});
}

export function addDescriptionButton(editor) {
  editor.DomComponents.addType("add-dl-btn", {
		model: {
			defaults: {
				tagName: "button",
				attributes: { 
					class: "add-dl-btn add-items-btns",
					type: "button",
				},
				content: "+ Add Term",
			},
		},
	});
}