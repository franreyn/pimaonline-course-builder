export function addPanoptoDisplay(editor) {
  editor.DomComponents.addType("panopto-container", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					class: "media-container",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "panopto-object")) {
					this.components().add({ type: "panopto-object" });
				}
				if (!this.components().find((component) => component.get("type") === "panopto-info")) {
					this.components().add({ type: "panopto-info" });
				}
			},
		},
	});
}

export function addPanoptoObject(editor) {
  editor.DomComponents.addType("panopto-object", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					class: "media-object",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "panopto-iframe")) {
					this.components().add({ type: "panopto-iframe" });
				}
			},
		},
	});
}

export function addPanoptoInfo(editor) {
  editor.DomComponents.addType("panopto-info", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					class: "media-info",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "panopto-caption")) {
					this.components().add({ type: "panopto-caption" });
				}
			},
		},
	});
}

export function addPanoptoCaption(editor) {
  editor.DomComponents.addType("panopto-caption", {
		model: {
			defaults: {
				tagName: "figcaption",
				attributes: { contenteditable: "true" },
				content: "Add video caption or delete if not needed",
			},
		},
	});
}

export function addPanoptoIframe(editor) {
  editor.DomComponents.addType("panopto-iframe", {
		model: {
			defaults: {
				tagName: "iframe",
				attributes: {
					height: "405",
					width: "720",
					allowfullscreen: "allowfullscreen",
					allow: "autoplay",
				},
				traits: [
					{
						type: "text",
						label: "Source",
						name: "src",
						placeholder: "https://pima-cc.hosted.panopto.com",
						default: "https://pima-cc.hosted.panopto.com",
					},
					{
						type: "text",
						label: "Title",
						name: "title",
						placeholder: "Add title of video",
					},
				],
			},
		},
	});
}