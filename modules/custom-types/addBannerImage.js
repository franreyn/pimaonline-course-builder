export function addBannerImage(editor) {
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
}