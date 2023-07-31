export function addH5pContainer(editor) {
  editor.DomComponents.addType("h5p-container", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					class: "media-container",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "h5p-object")) {
					this.components().add({ type: "h5p-object" });
				}
				if (!this.components().find((component) => component.get("type") === "h5p-info")) {
					this.components().add({ type: "h5p-info" });
				}
			},
		},
	});
}

export function addH5pObject(editor) {
  editor.DomComponents.addType("h5p-object", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					class: "media-object",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "youtube-iframe")) {
					this.components().add({ type: "h5p-iframe" });
				}
			},
		},
	});
}

export function addH5pInfo(editor) {
  editor.DomComponents.addType("h5p-info", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					class: "media-info",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "h5p-caption")) {
					this.components().add({ type: "h5p-caption" });
				}
			},
		},
	});
}

export function addH5pCaption(editor) {
  editor.DomComponents.addType("h5p-caption", {
		model: {
			defaults: {
				tagName: "p",
				attributes: { contenteditable: "true" },
				content: "Add video caption or delete if not needed",
			},
		},
	});
}

export function addH5pIframe(editor) {
  editor.DomComponents.addType("h5p-iframe", {
		model: {
			defaults: {
				tagName: "iframe",
				attributes: {
					height: "315",
					width: "560",
					allowfullscreen: "allowfullscreen",
					allow: "autoplay",
					frameborder: "0",
					allow: "accelerometer",
				},
				traits: [
					{
						type: "text",
						label: "Source",
						name: "src",
						placeholder: "https://pima.h5p.com/content/1291989830292176368/embed",
						default: "https://pima.h5p.com/content/1291989830292176368/embed",
					},
					{
						type: "text",
						label: "Title",
						name: "title",
						placeholder: "H5P Video Player",
					},
				],
			},
		},
	});
}