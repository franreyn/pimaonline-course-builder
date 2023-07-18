export function addYoutubeContainer(editor) {
  editor.DomComponents.addType("youtube-container", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					class: "media-container",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "youtube-object")) {
					this.components().add({ type: "youtube-object" });
				}
				if (!this.components().find((component) => component.get("type") === "youtube-info")) {
					this.components().add({ type: "youtube-info" });
				}
			},
		},
	});
}

export function addYoutubeObject(editor) {
  editor.DomComponents.addType("youtube-object", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					class: "media-object",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "youtube-iframe")) {
					this.components().add({ type: "youtube-iframe" });
				}
			},
		},
	});
}

export function addYoutubeInfo(editor) {
  editor.DomComponents.addType("youtube-info", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					class: "media-info",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "youtube-caption")) {
					this.components().add({ type: "youtube-caption" });
				}
			},
		},
	});
}

export function addYoutubeCaption(editor) {
  editor.DomComponents.addType("youtube-caption", {
		model: {
			defaults: {
				tagName: "figcaption",
				attributes: { contenteditable: "true" },
				content: "Add video caption or delete if not needed",
			},
		},
	});
}

export function addYoutubeIframe(editor) {
  editor.DomComponents.addType("youtube-iframe", {
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
						placeholder: "YouTube video player",
					},
				],
			},
		},
	});
}