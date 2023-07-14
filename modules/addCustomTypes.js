import { addOneColumnLayout } from "./custom-types/addOneColumnLayout.js";
import { addTwoColumnLayout } from "./custom-types/addTwoColumnLayout.js";
import { addHeader } from "./custom-types/addHeader.js";
import { addBannerImage } from "./custom-types/addBannerImage.js";
import { addTextContainer } from "./custom-types/addTextContainer.js";
import { addContentWrapper } from "./custom-types/addContentWrapper.js";
import { addSecondColumn } from "./custom-types/addSecondColumn.js";
import { addContentBody } from "./custom-types/addContentBody.js";
import { addCardBody, addCardHorizontal, addCardImg } from "./custom-types/addCardHorizontal.js";
import { addSideBySide, addSideBySideItem } from "./custom-types/addSideBySide.js";
import { addVocabulary, addVocabularyDefinition, addVocabularyTerm } from "./custom-types/addVocabulary.js";
import { addAssignments, addAssignment } from "./custom-types/addAssignments.js";
import { addBlockquote } from "./custom-types/addBlockquote.js";
import { addRawImage } from "./custom-types/addRawImage.js";
import { addFigcaption, addFigure, addFigureCaption } from "./custom-types/addImage.js";
import { addButton } from "./custom-types/addButton.js";

export function addCustomTypes(editor) {
  const allWidgets = [
    "assignment", 
    "blockquote",
    "border", 
    "card-body", 
    "content-body", 
    "description-definition", 
    "description-term",
    "side-by-side-item", 
  ]

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
  addOneColumnLayout(editor);

	// Two column components
  addTwoColumnLayout(editor);

	// Header
  addHeader(editor);

	// Banner image
  addBannerImage(editor);
  restrictParentComponent("banner-image", ["header"]);

	// Text container
  addTextContainer(editor);

	// Content wrapper
  addContentWrapper(editor);

	// Second column
  addSecondColumn(editor);

	// Content-body
  addContentBody(editor);
	restrictParentComponent("content-body", ["content-wrapper", "second-column"]);

	// Border widget
  addContentBody(editor);
	restrictParentComponent("border", ["content-body"]);

	// Card Horizontal
  addCardHorizontal(editor);  
	restrictParentComponent("card-horizontal", ["content-body"]);

	// card body
  addCardBody(editor);
	restrictParentComponent("card-body", ["card-horizontal"]);

  addCardImg(editor);
	restrictParentComponent("card-img", ["card-horizontal"]);

	// Side-by-side Widget
  addSideBySide(editor);
	restrictParentComponent("side-by-side", ["content-body"]);

	// Side-by-side Item
  addSideBySideItem(editor);
	restrictParentComponent("side-by-side-item", ["side-by-side"]);

	// Vocabulary widget
  addVocabulary(editor);
	restrictParentComponent("vocab-list", ["content-body"]);

	// Vocabulary widget TERM
  addVocabularyTerm(editor);
	restrictParentComponent("description-term", ["vocab-list"]);

	// Vocabulary widget DEFINITION
  addVocabularyDefinition(editor);
	restrictParentComponent("description-definition", ["vocab-list"]);

	// Assignments Widget
  addAssignments(editor);
	restrictParentComponent("assignments-widget", ["content-body"]);
  
	// Assignment
  addAssignment(editor);
	restrictParentComponent("assignment", ["assignments-widget"]);

	// Blockquote
  addBlockquote(editor);
	restrictParentComponent("blockquote", ["content-body"]);

	// Raw image - Not a sole component, only used to build other components
  addRawImage(editor);

	// Image no caption
  addFigure(editor);
	restrictParentComponent("figure", allWidgets);

	// Image with caption
  addFigureCaption(editor);
	restrictParentComponent("figure-caption", ["content-body"]);

	// Figcaption
  addFigcaption(editor);
	// restrictParentComponent('figcaption', ['figure-caption']);

	// Buttons
  addButton(editor);
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
				content: "Add video caption or delete if not needed",
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
						placeholder: "Add title of video",
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
				content: "Add video caption or delete if not needed",
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
						content: "Add list item",
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
						content: "Add term",
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
						content: "Add heading",
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
						content: "Add subheading",
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
						content: "Add subheading",
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
						content: "Add subheading",
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
						content: "Add subheading",
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
						content: "Add subheading",
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
						content: "Add text",
					},
				],
        toolbar: [
          {
            attributes: { class: 'fa fa-bold' },
            command: 'bold',
          },
          {
            attributes: { class: 'fa fa-italic' },
            command: 'italic',
          },
          {
            attributes: { class: 'fa fa-underline' },
            command: 'underline',
          },
          {
            attributes: { class: 'fa fa-link' },
            command: 'createLink',
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
	restrictParentComponent("paragraph", ["assignment", "blockquote", "border", "card-body", "content-body", "description-definition", "description-term", "side-by-side-item", "text-container"]);

	// ======= END COMPONENTS ======
	// ...
}
