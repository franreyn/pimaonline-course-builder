export function addButton(editor) {
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
}