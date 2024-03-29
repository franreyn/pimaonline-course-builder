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
					this.components().add({ type: "assignment" });
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
				if (!this.components().length) {
          this.components().add({ type: "h3", attributes: { class: "assignment-title" } });
          this.components().add({ type: "text", attributes: { class: "assignment-content" }, content: "Add text" });
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
				attributes: { class: "add-assignment-btn add-items-btns" },
				content: "+ Add Assignment",
			},
		},
	})
}