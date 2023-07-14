export function addAssignments(editor) {
  editor.DomComponents.addType("assignments-widget", {
		model: {
			defaults: {
				tagName: "ul",
				attributes: { class: "assignments-widget" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "assignment")) {
					this.components().add({ type: "assignment" });
				}
			},
		},
	});
}
export function addAssignment(editor) {
  editor.DomComponents.addType("assignment", {
		model: {
			defaults: {
				tagName: "li",
				attributes: { class: "assignment" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "h3")) {
					this.components().add({ type: "h3" });
				}
				if (!this.components().find((component) => component.get("type") === "paragraph")) {
					this.components().add({ type: "paragraph" });
				}
				if (!this.components().find((component) => component.get("type") === "button")) {
					this.components().add({ type: "button" });
				}
			},
		},
	});
}