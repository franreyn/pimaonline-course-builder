export function addRawImage(editor) {
  editor.DomComponents.addType("image", {
		model: {
			defaults: {
				tagName: "img",
				attributes: {
					src: "https://via.placeholder.com/650",
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