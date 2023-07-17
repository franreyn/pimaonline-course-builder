export function addCardHorizontal(editor) {
	editor.DomComponents.addType("card-horizontal", {
		model: {
			defaults: {
				tagName: "div",
				attributes: { class: "card-horizontal" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "card-body")) {
					this.components().add({ type: "card-body" });
				}
				if (!this.components().find((component) => component.get("type") === "card-img")) {
					this.components().add({ type: "card-img" });
				}
			},
		},
	});
}

export function addCardBody(editor) {
  editor.DomComponents.addType("card-body", {
		model: {
			defaults: {
				tagName: "div",
				attributes: { class: "card-body" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "paragraph")) {
					this.components().add({ type: "paragraph" });
				}
			},
		},
	});
}

export function addCardImg(editor) {
  editor.DomComponents.addType("card-img", {
		model: {
			defaults: {
				tagName: "div",
				attributes: { class: "card-img" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "image")) {
					this.components().add({ type: "image" });
				}
			},
		},
	});
}