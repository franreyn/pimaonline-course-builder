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
        if (!this.components().find((component) => component.get("type") === "thead")) {
          this.components().add({ type: "thead" });
        }
        if (!this.components().find((component) => component.get("type") === "tbody")) {
          this.components().add({ type: "tbody" });
        }

        editor.on("component:update", (model) => {
          if (!this.isViewAvailable && model.view) {
            this.isViewAvailable = true;
            this.addButton("+ Add Column", "add-column-btn add-items-btns", () => this.addColumn());
            this.addButton("+ Add Row", "add-row-btn add-items-btns", () => this.addRow());
          }
        });
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
        // Grab the thead so we can find out how many columns there are
        const thead = this.components().find((component) => component.get("type") === "thead");
        const theadTr = thead.components().find((component) => component.get("type") === "thead-tr");
      
        // Get the amount of th elements, as that's how many td's we need for a complete row
        const columnCount = theadTr.components().filter((component) => component.get("type") === "th").length;
      
        // Add a new <tr> with <td>'s to <tbody>
        const tbody = this.components().find((component) => component.get("type") === "tbody");
      
        // Create the new row
        const newRow = tbody.components().add({ type: "tbody-tr" });
      
        // Add <td>'s to the new row until there are enough to match the columns
        const defaultTdCount = 3;  // default number of td elements in a row
        for(let i = defaultTdCount; i < columnCount; i++) {
          newRow.components().add({ type: "td" });
        }
      }
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