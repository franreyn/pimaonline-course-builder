export function addParagraph(editor) {
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
}