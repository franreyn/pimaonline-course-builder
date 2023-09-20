export function addRawImage(editor) {
  editor.DomComponents.addType("image", {
		model: {
			defaults: {
				tagName: "img",
				attributes: {
					src: "https://d2l.pima.edu/shared/images/placeholder/400x400.jpg",
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