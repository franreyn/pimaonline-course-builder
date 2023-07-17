export function addHyperlinks(editor) {
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
}
