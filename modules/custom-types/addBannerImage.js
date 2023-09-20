export function addBannerImage(editor) {
  editor.DomComponents.addType("banner-image", {
		model: {
			defaults: {
				tagName: "img",
				attributes: {
					src: "https://d2l.pima.edu/shared/images/placeholder/1920x600.jpg",
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