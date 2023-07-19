export function addCallOut(editor) {
  editor.DomComponents.addType("call-out", {
    model: {
      defaults: {
        tagName: "div",
        attributes: { class: "call-out"},
      },
      init() {
        if (!this.components().find((component) => component.get("type") === "paragraph")) {
					this.components().add({ type: "paragraph" });
				}
      },
    },
  });
}