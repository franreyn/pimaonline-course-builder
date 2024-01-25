// Flip Card Group 
export function addFlipCardGroup(editor) {
  editor.DomComponents.addType("flip-card-group", {
    model: {
      defaults: {
        tagName: "div",
        attributes: {
          class: "flip-card-group",
        },
      },
      init() {
        if (!this.components().find((component) => component.get("type") === "flip-card")) {
          this.components().add({ type: "flip-card" });
          this.components().add({ type: "flip-card" });
          this.components().add({ type: "flip-card" });
        }
        this.components().add({ type: "add-flip-card-btn" });
      },
    },
  });
}

// Flip Card Container
export function addFlipCard(editor) {
  editor.DomComponents.addType("flip-card", {
    model: {
      defaults: {
        tagName: "div",
        attributes: {
          class: "flip-card",
        },
      },
      init() {
        if (!this.components().find((component) => component.get("type") === "inner-flip-card")) {
          this.components().add({ type: "inner-flip-card" });
        }
      },
    },
  });
}

// Inner Flip Card Container
export function addInnerFlipCard(editor) {
  editor.DomComponents.addType("inner-flip-card", {
    model: {
      defaults: {
        tagName: "div",
        attributes: {
          class: "inner-card",
        },
      },
      init() {
        if (!this.components().find((component) => component.get("type") === "flip-card-front")) {
          this.components().add({ type: "flip-card-front" });
        }
        if (!this.components().find((component) => component.get("type") === "flip-card-back")) {
          this.components().add({ type: "flip-card-back" });
        }
      },
    },
  });
}

// Front Flip Card 
export function addFrontFlipCard(editor) {
  editor.DomComponents.addType("flip-card-front", {
    model: {
      defaults: {
        tagName: "div",
        attributes: {
          class: "front",
        },
      },
      init() {
        if (!this.components().find((component) => component.get("type") === "paragraph")) {
          this.components().add({ type: "paragraph" });
        }
      },
    },
  });
}

// Back Flip Card 
export function addBackFlipCard(editor) {
  editor.DomComponents.addType("flip-card-back", {
    model: {
      defaults: {
        tagName: "div",
        attributes: {
          class: "back",
        },
      },
      init() {
        if (!this.components().find((component) => component.get("type") === "paragraph")) {
          this.components().add({ type: "paragraph" });
        }
      },
    },
  });
}

// Flip Card Add Button
export function addFlipCardBtn(editor) {
  editor.DomComponents.addType("add-flip-card-btn", {
    model: {
      defaults: {
        tagName: "button",
        attributes: { class: "add-flip-card-btn add-items-btns" },
        content: "+ Add Flip Card",
      },
    },
  })
}
