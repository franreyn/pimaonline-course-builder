export function addH1(editor) {
  editor.DomComponents.addType("h1", {
		model: {
			defaults: {
				tagName: "h1",
				toolbar: [], // Empty toolbar
				// attributes: { contenteditable: "true" },
				components: [
					{
						type: "text",
						content: "Add subheading",
					},
				],
				rte: {
					enable(el, rte) {
						// If already exists just focus
						if (rte) {
							rte.focus(); 
							return rte;
						}
						// CKEditor initialization
						rte = CKEDITOR.inline(el, {
							// Your configurations...
							toolbar: [], // Empty toolbar
							removeButtons: null, // Don't remove any buttons
							// IMPORTANT
							sharedSpaces: {
								top: editor.RichTextEditor.getToolbarEl(),
							}
						});
						return rte;
					},
					disable(el, rte) {
						el.contentEditable = false;
						rte?.focusManager?.blur(true);
					},
				},
			},
		},
	});
}

export function addH2(editor) {
  editor.DomComponents.addType("h2", {
		model: {
			defaults: {
				tagName: "h2",
				toolbar: [], // Empty toolbar
				// attributes: { contenteditable: "true" },
				components: [
					{
						type: "text",
						content: "Add subheading",
					},
				],
				rte: {
					enable(el, rte) {
						// If already exists just focus
						if (rte) {
							rte.focus(); 
							return rte;
						}
						// CKEditor initialization
						rte = CKEDITOR.inline(el, {
							// Your configurations...
							toolbar: [], // Empty toolbar
							removeButtons: null, // Don't remove any buttons
							// IMPORTANT
							sharedSpaces: {
								top: editor.RichTextEditor.getToolbarEl(),
							}
						});
						return rte;
					},
					disable(el, rte) {
						el.contentEditable = false;
						rte?.focusManager?.blur(true);
					},
				},
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