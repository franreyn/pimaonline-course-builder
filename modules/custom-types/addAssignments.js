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
					this.components().add({ type: "add-assignment-btn" });
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
					this.components().add({ type: "h3", attributes: {class: "assignment-title"} });
				}
				if (!this.components().find((component) => component.get("type") === "text")) {
					this.components().add({ type: "text", attributes: {class: "assignment-content"}, content: "Add text"});
				}
				if (!this.components().find((component) => component.get("type") === "button")) {
					this.components().add({ type: "button" });
				}
			},
		},
	});
}

export function addAssignmentBtn(editor) {
  editor.DomComponents.addType("add-assignment-btn", {
		model: {
			defaults: {
				tagName: "button",
				attributes: { class: "add-assignment-btn" },
				content: "+ Add Assignment",
			},
		},
	})
}