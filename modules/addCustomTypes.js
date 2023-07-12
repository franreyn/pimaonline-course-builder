// Add custom component types

export function addCustomTypes(editor) {

	// Prevent addition of component if it's not being added to parent component.
	function restrictParentComponent(type, validParents) {
		editor.on("component:mount", (component) => {
			if (component.get("type") === type) {
				let currentParentType = component.parent().get("type");

				if (!validParents.includes(currentParentType)) {
					if (component.previousParent) {
						component.previousParent.append(component);
					} else {
						component.remove();
					}
				} else {
					component.previousParent = component.parent();
				}
			}
		});
	}

	// One column component
	editor.DomComponents.addType("one-column-layout", {
		model: {
			defaults: {
				tagName: "body",
				attributes: { id: "one-column" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "header")) {
					this.components().add({ type: "header" });
				}

				if (!this.components().find((component) => component.get("type") === "content-wrapper")) {
					this.components().add({ type: "content-wrapper" });
				}
			},
		},
	});

	// Two column components
	editor.DomComponents.addType("two-column-layout", {
		model: {
			defaults: {
				tagName: "body",
				attributes: { id: "two-column" },
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
			},
		},
	});

	// Header
	editor.DomComponents.addType("header", {
		model: {
			defaults: {
				tagName: "header",
				attributes: {
					class: "header",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "banner-image")) {
					this.components().add({ type: "banner-image" });
				}

				if (!this.components().find((component) => component.get("type") === "text-container")) {
					this.components().add({ type: "text-container" });
				}
			},
		},
	});

	// Banner image
	editor.DomComponents.addType("banner-image", {
		model: {
			defaults: {
				tagName: "img",
				attributes: {
					src: "https://via.placeholder.com/1920x650",
					alt: "Banner image",
				},
				draggable: false,
				resizable: false,
				highlightable: true,
				selectable: true,
			},
			init() {
				this.set("title", "Banner Image");
			},
		},
	});
	restrictParentComponent("banner-image", ["header"]);

	// Text container
	editor.DomComponents.addType("text-container", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					class: "text-container",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "h1")) {
					this.components().add({ type: "h1" });
				}
				if (!this.components().find((component) => component.get("type") === "paragraph")) {
					this.components().add({ type: "paragraph" });
				}
			},
		},
	});

	// Content wrapper
	editor.DomComponents.addType("content-wrapper", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					id: "content-wrapper",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "content-body")) {
					this.components().add({ type: "content-body" });
				}
			},
		},
	});

	// Second column
	editor.DomComponents.addType("second-column", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					id: "second-column",
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "content-body")) {
					this.components().add({ type: "content-body" });
				}
			},
		},
	});

	// Content-body
	editor.DomComponents.addType("content-body", {
		model: {
			defaults: {
				tagName: "div",
				attributes: {
					class: "content-body",
					//'data-gjs-type': 'content-body',
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "h2")) {
					this.components().add({ type: "h2" });
				}
			},
		},
	});
	restrictParentComponent("content-body", ["content-wrapper", "second-column"]);

	// Border widget
	editor.DomComponents.addType("border", {
		model: {
			defaults: {
				tagName: "div",
				attributes: { class: "border" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "h3")) {
					this.components().add({ type: "h3" });
				}
				if (!this.components().find((component) => component.get("type") === "paragraph")) {
					this.components().add({ type: "paragraph" });
				}
			},
		},
	});
	restrictParentComponent("border", ["content-body"]);

	// Card Horizontal
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
	restrictParentComponent("card-horizontal", ["content-body"]);

	// card body
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
	restrictParentComponent("card-body", ["card-horizontal"]);

	// card image
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
	restrictParentComponent("card-img", ["card-horizontal"]);

	// Side-by-side Widget
	editor.DomComponents.addType("side-by-side", {
		model: {
			defaults: {
				tagName: "div",
				attributes: { class: "side-by-side" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "side-by-side-item")) {
					this.components().add({ type: "side-by-side-item" });
					this.components().add({ type: "side-by-side-item" });
				}
			},
		},
	});
	restrictParentComponent("side-by-side", ["content-body"]);

	// Side-by-side Item
	editor.DomComponents.addType("side-by-side-item", {
		model: {
			defaults: {
				tagName: "div",
				attributes: { class: "side-by-side-item" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "h3")) {
					this.components().add({ type: "h3" });
				}
				if (!this.components().find((component) => component.get("type") === "paragraph")) {
					this.components().add({ type: "paragraph" });
				}
			},
		},
	});
	restrictParentComponent("side-by-side-item", ["side-by-side"]);

	// Vocabulary widget
	editor.DomComponents.addType("vocab-list", {
		model: {
			defaults: {
				tagName: "dl",
				attributes: { class: "vocab-list" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "description-term")) {
					this.components().add({ type: "description-term" });
				}
				if (!this.components().find((component) => component.get("type") === "description-definition")) {
					this.components().add({ type: "description-definition" });
				}
			},
		},
	});
	restrictParentComponent("vocab-list", ["content-body"]);

	// Vocabulary widget TERM
	editor.DomComponents.addType("description-term", {
		model: {
			defaults: {
				tagName: "dt",
				components: [
					{
						type: "text",
						content: "Insert subheading.",
					},
				],
			},
		},
	});
	restrictParentComponent("description-term", ["vocab-list"]);

	// Vocabulary widget DEFINITION
	editor.DomComponents.addType("description-definition", {
		model: {
			defaults: {
				tagName: "dd",
				components: [
					{
						type: "text",
						content: "Insert subheading.",
					},
				],
			},
		},
	});
	restrictParentComponent("description-definition", ["vocab-list"]);

	// Assignments Widget
	editor.DomComponents.addType("assignments-widget", {
		model: {
			defaults: {
				tagName: "ul",
				attributes: { class: "assignments-widget" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "assignment")) {
					this.components().add({ type: "assignment" });
				}
			},
		},
	});
	restrictParentComponent("assignments-widget", ["content-body"]);

	// Assignment
	editor.DomComponents.addType("assignment", {
		model: {
			defaults: {
				tagName: "li",
				attributes: { class: "assignment" },
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "h3")) {
					this.components().add({ type: "h3" });
				}
				if (!this.components().find((component) => component.get("type") === "paragraph")) {
					this.components().add({ type: "paragraph" });
				}
				if (!this.components().find((component) => component.get("type") === "button")) {
					this.components().add({ type: "button" });
				}
			},
		},
	});
	restrictParentComponent("assignment", ["assignments-widget"]);

	// Blockquote
	editor.DomComponents.addType("blockquote", {
		model: {
			defaults: {
				tagName: "blockquote",
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "paragraph")) {
					this.components().add({ type: "paragraph" });
				}
			},
		},
	});
	restrictParentComponent("blockquote", ["content-body"]);

	// Raw image - Not a sole component, only used to build other components
	editor.DomComponents.addType("image", {
		model: {
			defaults: {
				tagName: "img",
				attributes: {
					src: "https://via.placeholder.com/650",
					alt: "Insert image alt text",
				},
				draggable: false,
				resizable: false,
				highlightable: true,
				selectable: true,
			},
		},
	});

	// Image no caption
	editor.DomComponents.addType("figure", {
		model: {
			defaults: {
				tagName: "figure",
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "image")) {
					this.components().add({ type: "image" });
				}
			},
		},
	});
	restrictParentComponent("figure", ["content-body"]);

	// Image with caption
	editor.DomComponents.addType("figure-caption", {
		model: {
			defaults: {
				tagName: "figure",
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "image")) {
					this.components().add({ type: "image" });
				}
				if (!this.components().find((component) => component.get("type") === "figcaption")) {
					this.components().add({ type: "figcaption" });
				}
			},
		},
	});
	restrictParentComponent("figure-caption", ["content-body"]);

	// Figcaption
	editor.DomComponents.addType("figcaption", {
		model: {
			defaults: {
				tagName: "figcaption",
				attributes: { contenteditable: "true" },
				content: "Insert image caption",
			},
		},
	});
	// restrictParentComponent('figcaption', ['figure-caption']);

	// Buttons
	editor.DomComponents.addType("button", {
		model: {
			defaults: {
				type: "link",
				tagName: "a",
				attributes: { class: "btn" },
				traits: [
					{
						type: "text",
						label: "URL",
						name: "href",
						placeholder: "https://d2l.pima.edu/d2l/login",
					},
					{
						type: "text",
						label: "Text",
						name: "content",
						changeProp: 1,
					},
					{
						type: "checkbox",
						label: "Open in new tab",
						name: "target",
						changeProp: 1,
						valueTrue: "_blank",
						valueFalse: "",
					},
				],
				components: [
					{
						type: "text",
						content: "Link",
					},
				],
			},
			init() {
				this.listenTo(this, "change:content", this.updateContent);
			},
			updateContent() {
				this.components(this.get("content"));
			},
		},
		view: {},
		isComponent: (el) => el.tagName == "A" && el.classList.contains("btn"),
	});
	restrictParentComponent("button", ["assignment", "blockquote", "border", "card-body", "content-body", "side-by-side-item", "description-definition", "description-term"]);

	// Hyperlinks
	editor.DomComponents.addType("hyperlink", {
		model: {
			defaults: {
				type: "link",
				tagName: "a",
				traits: [
					{
						type: "text",
						label: "URL",
						name: "href",
						placeholder: "https://d2l.pima.edu/d2l/login",
					},
					{
						type: "text",
						label: "Text",
						name: "content",
						changeProp: 1,
					},
					{
						type: "checkbox",
						label: "Open in new tab",
						name: "target",
						changeProp: 1,
						valueTrue: "_blank",
						valueFalse: "",
					},
				],
				content: "Link Text",
			},
			init() {
				this.listenTo(this, "change:content", this.updateContent);
			},
			updateContent() {
				this.components(this.get("content"));
			},
		},
		view: {},
		isComponent: (el) => el.tagName == "A",
	});
	restrictParentComponent("hyperlink", ["assignment", "blockquote", "border", "card-body", "content-body", "side-by-side-item", "description-definition", "description-term"]);

	//////////////////////////// Panopto container ////////////////////////////
	//Media object
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
	restrictParentComponent("panopto-container", ["content-body"]);

	// Media object
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
	restrictParentComponent("panopto-object", ["panopto-container"]);

	// Media info
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
	restrictParentComponent("panopto-info", ["panopto-container"]);

	// media caption
	editor.DomComponents.addType("panopto-caption", {
		model: {
			defaults: {
				tagName: "figcaption",
				attributes: { contenteditable: "true" },
				content: "Insert video caption or delete if not needed",
			},
		},
	});
	restrictParentComponent("panopto-caption", ["panopto-info"]);

	// Panopto Iframe
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
						placeholder: "Insert title of video",
					},
				],
			},
		},
	});
	restrictParentComponent("panopto-iframe", ["panopto-object"]);
	//////////////////////////// end panopto container ////////////////////////////

	//////////////////////////// Youtube container ////////////////////////////
	//Media object
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
	restrictParentComponent("youtube-container", ["content-body"]);

	// Media object
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
	restrictParentComponent("youtube-object", ["youtube-container"]);

	// Media info
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
	restrictParentComponent("youtube-info", ["youtube-container"]);

	// media caption
	editor.DomComponents.addType("youtube-caption", {
		model: {
			defaults: {
				tagName: "figcaption",
				attributes: { contenteditable: "true" },
				content: "Insert video caption or delete if not needed",
			},
		},
	});
	restrictParentComponent("youtube-caption", ["youtube-info"]);

	// youtube Iframe
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
	restrictParentComponent("youtube-iframe", ["youtube-object"]);
	//////////////////////////// end youtube container ////////////////////////////

	// ol
	editor.DomComponents.addType("ol", {
		model: {
			defaults: {
				tagName: "ol",
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "li")) {
					this.components().add({ type: "li" });
				}
			},
		},
	});
	//restrictParentComponent('blockquote', ['content-body']);

	// ul
	editor.DomComponents.addType("ul", {
		model: {
			defaults: {
				tagName: "ul",
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "li")) {
					this.components().add({ type: "li" });
				}
			},
		},
	});
	//restrictParentComponent('blockquote', ['content-body']);

	// li
	editor.DomComponents.addType("li", {
		model: {
			defaults: {
				tagName: "li",
				attributes: { contenteditable: "true" },
				components: [
					{
						type: "text",
						content: "Insert subheading.",
					},
				],
			},
		},
	});
	//restrictParentComponent('blockquote', ['content-body']);

	// Description Lists
	editor.DomComponents.addType("dl", {
		model: {
			defaults: {
				tagName: "dl",
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "dt")) {
					this.components().add({ type: "dt" });
				}
				if (!this.components().find((component) => component.get("type") === "dd")) {
					this.components().add({ type: "dd" });
				}
			},
		},
	});
	restrictParentComponent("dl", ["content-body"]);

	// Term
	editor.DomComponents.addType("dt", {
		model: {
			defaults: {
				tagName: "dt",
				components: [
					{
						type: "text",
						content: "Insert subheading.",
					},
				],
			},
		},
	});
	restrictParentComponent("dt", ["dl"]);

	// Definition
	editor.DomComponents.addType("dd", {
		model: {
			defaults: {
				tagName: "dd",
				content: "Add definition",
			},
		},
	});
	restrictParentComponent("dd", ["dl"]);

	// Heading 1
	editor.DomComponents.addType("h1", {
		model: {
			defaults: {
				tagName: "h1",
				attributes: { contenteditable: "true" },
				components: [
					{
						type: "text",
						content: "Insert heading.",
					},
				],
			},
		},
	});
	restrictParentComponent("h1", ["text-container"]);

	// Heading 2
	editor.DomComponents.addType("h2", {
		model: {
			defaults: {
				tagName: "h2",
				attributes: { contenteditable: "true" },
				components: [
					{
						type: "text",
						content: "Insert subheading.",
					},
				],
			},
		},
	});
	restrictParentComponent("h2", ["assignment", "blockquote", "border", "card-body", "content-body", "side-by-side-item", "description-definition", "description-term"]);

	// Heading 3
	editor.DomComponents.addType("h3", {
		model: {
			defaults: {
				tagName: "h3",
				attributes: { contenteditable: "true" },
				components: [
					{
						type: "text",
						content: "Insert subheading.",
					},
				],
			},
		},
	});
	restrictParentComponent("h3", ["assignment", "blockquote", "border", "card-body", "content-body", "side-by-side-item", "description-definition", "description-term"]);

	// Heading 4
	editor.DomComponents.addType("h4", {
		model: {
			defaults: {
				tagName: "h4",
				attributes: { contenteditable: "true" },
				components: [
					{
						type: "text",
						content: "Insert subheading.",
					},
				],
			},
		},
	});
	restrictParentComponent("h4", ["assignment", "blockquote", "border", "card-body", "content-body", "side-by-side-item", "description-definition", "description-term"]);

	// Heading 5
	editor.DomComponents.addType("h5", {
		model: {
			defaults: {
				tagName: "h5",
				attributes: { contenteditable: "true" },
				components: [
					{
						type: "text",
						content: "Insert subheading.",
					},
				],
			},
		},
	});
	restrictParentComponent("h5", ["assignment", "blockquote", "border", "card-body", "content-body", "side-by-side-item", "description-definition", "description-term"]);

	// Heading 6
	editor.DomComponents.addType("h6", {
		model: {
			defaults: {
				tagName: "h6",
				attributes: { contenteditable: "true" },
				components: [
					{
						type: "text",
						content: "Insert subheading.",
					},
				],
			},
		},
	});
	restrictParentComponent("h6", ["assignment", "blockquote", "border", "card-body", "content-body", "side-by-side-item", "description-definition", "description-term"]);

	// Paragraph
	editor.DomComponents.addType("paragraph", {
		model: {
			defaults: {
				tagName: "p",
				components: [
					{
						type: "text",
						content: "Insert subheading.",
					},
				],
			},
		},
		view: {
			onRender() {
				this.el.setAttribute("contenteditable", "true");
			},
		},
	});
	restrictParentComponent("paragraph", ["assignment", "blockquote", "border", "card-body", "content-body", "side-by-side-item", "description-definition", "description-term"]);

	// ======= END COMPONENTS ======
	// ...
}
