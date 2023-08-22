export function addScript(editor) {
  editor.DomComponents.addType("script", {
		model: {
			defaults: {
				tagName: "script",
				attributes: {
					type: "text/javascript",
          src: "https://cdn.jsdelivr.net/npm/@pimaonline/pimaonline-themepack/dist/js/scripts2.js",
          defer: "true"
				},
			},
			init() {
				if (!this.components().find((component) => component.get("type") === "script")) {
					this.components().add({ type: "script" });
				}
			},
		},
	});
}