export function addH1(editor) {
  editor.DomComponents.addType("h1", {
		model: {
			defaults: {
				tagName: "h1",
				attributes: { contenteditable: "true" },
				components: [
					{
						type: "text",
						content: "Add subheading",
					},
				],
			},
		},
	});
}

export function addH2(editor) {
  editor.DomComponents.addType("h2", {
		model: {
			defaults: {
				tagName: "h2",
				attributes: { contenteditable: "true" },
				components: [
					{
						type: "text",
						content: "Add subheading",
					},
				],
			},
		},
	});
}

export function addH3(editor) {
  editor.DomComponents.addType("h3", {
		model: {
			defaults: {
				tagName: "h3",
				attributes: { contenteditable: "true" },
				components: [
					{
						type: "text",
						content: "Add subheading",
					},
				],
			},
		},
	});
}

export function addH4(editor) {
  editor.DomComponents.addType("h4", {
		model: {
			defaults: {
				tagName: "h4",
				attributes: { contenteditable: "true" },
				components: [
					{
						type: "text",
						content: "Add subheading",
					},
				],
			},
		},
	});
}

export function addH5(editor) {
  editor.DomComponents.addType("h5", {
		model: {
			defaults: {
				tagName: "h5",
				attributes: { contenteditable: "true" },
				components: [
					{
						type: "text",
						content: "Add subheading",
					},
				],
			},
		},
	});
}

export function addH6(editor) {
  editor.DomComponents.addType("h6", {
		model: {
			defaults: {
				tagName: "h6",
				attributes: { contenteditable: "true" },
				components: [
					{
						type: "text",
						content: "Add subheading",
					},
				],
			},
		},
	});
}