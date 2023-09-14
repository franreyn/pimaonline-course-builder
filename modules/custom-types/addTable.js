export function addTable(editor) {
  editor.DomComponents.addType("table", {
		model: {
			defaults: {
				tagName: "table",
				attributes: {
					class: "display-lg custom-width",
				},
			},
			init() {
				// Create a flag to track whether the view is available
        this.isViewAvailable = false;

        // Check if the view is available, and if not, wait for it to be ready
        if (this.view) {
          this.isViewAvailable = true;
          this.addButton("+ Add Column", "add-column-btn", () => this.addColumn());
          this.addButton("+ Add Row", "add-row-btn", () => this.addRow());
        } else {
          editor.on("component:update", (model) => {
            if (!this.isViewAvailable && model.view) {
              this.isViewAvailable = true;
              this.addButton("+ Add Column", "add-column-btn", () => this.addColumn());
              this.addButton("+ Add Row", "add-row-btn", () => this.addRow());
            }
          });
        }

        if (!this.components().find((component) => component.get("type") === "thead")) {
          this.components().add({ type: "thead" });
        }
        if (!this.components().find((component) => component.get("type") === "tbody")) {
          this.components().add({ type: "tbody" });
        }
      },
      addButton(text, className, clickHandler) {
        if (this.isViewAvailable) {
          const button = document.createElement("button");
          button.textContent = text;
          button.className = className;
          button.addEventListener("click", clickHandler);
          this.view.el.appendChild(button);
        }
      },
      addColumn() {
        // Add a new <th> to the <thead>
				const thead = this.components().find((component) => component.get("type") === "thead");
				const theadTr = thead.components().find((component) => component.get("type") === "thead-tr");
				theadTr.components().add({ type: "th" });			

        // Add a new <td> to each <tr> in <tbody>
        const tbody = this.components().find((component) => component.get("type") === "tbody");
        tbody.components().forEach((tr) => tr.components().add({ type: "td" }));
      },
      addRow() {
        // Add a new <tr> with <td>'s to <tbody>
        const tbody = this.components().find((component) => component.get("type") === "tbody");
        tbody.components().add({ type: "tbody-tr" });
      },
		},
	});
}

export function addThead(editor) {
  editor.DomComponents.addType("thead", {
		model: {
			defaults: {
				tagName: "thead",
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "thead-tr")) {
					this.components().add({ type: "thead-tr" });
				}
			},
		},
	});
}

export function addTheadTr(editor) {
  editor.DomComponents.addType("thead-tr", {
		model: {
			defaults: {
				tagName: "tr",
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "th")) {
					this.components().add({ type: "th" });
					this.components().add({ type: "th" });
					this.components().add({ type: "th" });
				}
			},
		},
	});
}

export function addTh(editor) {
  editor.DomComponents.addType("th", {
		model: {
			defaults: {
				tagName: "th",
        attributes: { contenteditable: "true", scope: "col", class: "table-th" },
				components: [
					{
						type: "text",
						content: "Add table heading",
					},
				],
			},
		},
	});
}

export function addTbody(editor) {
  editor.DomComponents.addType("tbody", {
    model: {
      defaults: {
        tagName: "tbody",
      },
      init() {
        if (!this.components().find((component) => component.get("type") === "tbody-tr")) {
          this.components().add({ type: "tbody-tr" });
          this.components().add({ type: "tbody-tr" });
        }
      },
    },
  });
}

export function addTbodyTr(editor) {
  editor.DomComponents.addType("tbody-tr", {
    model: {
      defaults: {
        tagName: "tr",
      },
      init() {
        if (!this.components().find((component) => component.get("type") === "td")) {
          this.components().add({ type: "td" });
          this.components().add({ type: "td" });
          this.components().add({ type: "td" });
        }
      },
    },
  });
}

export function addTd(editor) {
  editor.DomComponents.addType("td", {
		model: {
			defaults: {
				tagName: "td",
        attributes: { contenteditable: "true", class: "table-td" },
				components: [
					{
						type: "text",
						content: "Add table description",
					},
				],
			},
		},
	});
}