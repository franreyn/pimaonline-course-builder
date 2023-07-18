export function addListItem(editor) {
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
}