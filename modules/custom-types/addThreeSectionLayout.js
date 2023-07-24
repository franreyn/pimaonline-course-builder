export function addThreeSectionLayout(editor) {
  // Two column components
editor.DomComponents.addType("three-section-layout", {
  model: {
    defaults: {
      tagName: "body",
      attributes: { id: "three-column" },
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

      if (!this.components().find((component) => component.get("type") === "third-column")) {
        this.components().add({ type: "third-column" });
      }
    },
  },
});
}