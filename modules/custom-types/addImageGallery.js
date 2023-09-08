export function addImageGallery(editor) {
  editor.DomComponents.addType("image-gallery", {
		model: {
			defaults: {
				tagName: "div",
        attributes: {
					class: "image-gallery",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "gallery-wrapper")) {
					this.components().add({ type: "gallery-wrapper" });
				}
			},
		},
	});
}

export function addGalleryWrapper(editor) {
  editor.DomComponents.addType("gallery-wrapper", {
		model: {
			defaults: {
				tagName: "div",
        attributes: {
					class: "gallery-wrapper",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "image-box")) {
					this.components().add({ type: "image-box" });
          this.components().add({ type: "image-box" });
					this.components().add({ type: "image-box" });
          this.components().add({ type: "image-box" });
					this.components().add({ type: "image-box" });
          this.components().add({ type: "image-box" });
				}
			},
		},
	});
}

export function addImageBox(editor) {
  editor.DomComponents.addType("image-box", {
		model: {
			defaults: {
				tagName: "div",
        attributes: {
					class: "image-box",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "static-image")) {
					this.components().add({ type: "static-image" });
				}
			},
		},
	});
}

export function addStaticImage(editor) {
  editor.DomComponents.addType("static-image", {
		model: {
			defaults: {
				tagName: "img",
				attributes: {
					src: "./images/placeholder.jpg",
					alt: "Add image alt text",
				},
				draggable: false,
				resizable: false,
				highlightable: true,
				selectable: true,
			},
		},
	});
}