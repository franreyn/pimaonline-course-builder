export function addPlaypositContainer(editor) {
  editor.DomComponents.addType("playposit-container", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					class: "media-container",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "playposit-object")) {
					this.components().add({ type: "playposit-object" });
				}
				if (!this.components().find((component) => component.get("type") === "playposit-info")) {
					this.components().add({ type: "playposit-info" });
				}
			},
		},
	});
}

export function addPlaypositObject(editor) {
  editor.DomComponents.addType("playposit-object", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					class: "media-object",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "playposit-iframe")) {
					this.components().add({ type: "playposit-iframe" });
				}
			},
		},
	});
}

export function addPlaypositInfo(editor) {
  editor.DomComponents.addType("playposit-info", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					class: "media-info",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "playposit-caption")) {
					this.components().add({ type: "playposit-caption" });
				}
			},
		},
	});
}

export function addPlaypositCaption(editor) {
  editor.DomComponents.addType("playposit-caption", {
		model: {
			defaults: {
				tagName: "figcaption",
				attributes: { contenteditable: "true" },
				content: "Add video caption or delete if not needed",
			},
		},
	});
}

export function addPlaypositIframe(editor) {
  editor.DomComponents.addType("playposit-iframe", {
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
						placeholder: "https://www.youtube.com/embed/NpEaa2P7qZI",
						default: "https://www.youtube.com/embed/NpEaa2P7qZI",
					},
					{
						type: "text",
						label: "Title",
						name: "title",
						placeholder: "Playposit video",
					},
				],
			},
		},
	});
}