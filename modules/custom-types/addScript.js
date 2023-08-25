export function addScript(editor) {
  editor.DomComponents.addType("script", {
		model: {
			defaults: {
				tagName: "script",
				type: "text/javascript",
				src: "../../js/override.js",
				attributes: { id: "override"},
				defer: "true",
			},
			init() {

      },
		},
	});
}