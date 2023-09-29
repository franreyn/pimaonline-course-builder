export function initEditor() {
	return grapesjs.init({
		container: "#gjs",
		autorender: 0,
		fromElement: true,
		allowScripts: 1,
		height: "100%",
		width: "auto",
		storageManager: false,
		undoManager: false,
		panels: { defaults: [] },
		plugins: ["grapesjs-plugin-ckeditor"],
		pluginsOpts: {
			"grapesjs-plugin-ckeditor": {
				options: {
					toolbar: [
						{ name: "basicstyles",
						  items: ["Bold", "Italic", "-", "NumberedList", "BulletedList", "Link"] },
					],
					language: "en",
					disableNativeSpellChecker: false,
				},
			},
		}, 
		layerManager: {
			appendTo: ".layers-container",
		},
		traitManager: {
			appendTo: ".traits-container",
		},
		canvas: {
			scripts: [
				"https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js",
			],
			styles: ["https://cdn.jsdelivr.net/npm/@pimaonline/pimaonline-themepack/dist/css/themes/cards/styles.css", "./css/theme-overrides.css"],
		},
		// We define a default panel as a sidebar to contain layers
		panels: {
			defaults: [
				{
					id: "layers",
					el: ".panel__right",
					// Make the panel resizable
					resizable: {
						maxDim: 350,
						minDim: 200,
						tc: 0, // Top handler
						cl: 1, // Left handler
						cr: 0, // Right handler
						bc: 0, // Bottom handler
						// Being a flex child we need to change `flex-basis` property
						// instead of the `width` (default)
						keyWidth: "flex-basis",
					},
					buttons: [
						{
							id: "duplicate",
							className: "fa fa-clone",
							attributes: { title: "Duplicate",class: "layer-btn duplication-btn" },
							command: "duplicate-layer",
						},
						{
							id: "delete",
							className: "fa fa-trash",
							attributes: { title: "Delete",class: "layer-btn delete-btn" },
							command: "delete-layer",
						},
					],
				},
				{
					id: "panel-devices",
					el: ".panel__devices",
					buttons: [
						{
							id: "device-desktop",
							label: '<i class="bi bi-display"></i>',
							command: "set-device-desktop",
							active: true,
							togglable: false,
						},
						{
							id: "device-tablet",
							label: '<i class="bi bi-tablet"></i>',
							command: "set-device-tablet",
							togglable: false,
						},
						{
							id: "device-mobile",
							label: '<i class="bi bi-phone"></i>',
							command: "set-device-mobile",
							togglable: false,
						},
					],
				},
				{
					id: "panel-switcher",
					el: ".panel__switcher",
					buttons: [
						{
							id: "show-blocks",
							className: "blocks",
							active: true,
							label: `<i class="bi bi-grid blocks"></i>`,
							command: "show-blocks",
							togglable: false,
						},
						{
							id: "show-layers",
							className: "layers",
							active: true,
							label: '<i class="bi bi-layers layers"></i>',
							command: "show-layers",
							// Once activated disable the possibility to turn it off
							togglable: false,
						},
						{
							id: "show-traits",
							className: "traits",
							active: true,
							label: '<i class="bi bi-node-plus traits"></i>',
							command: "show-traits",
							togglable: false,
						},
						{
							id: "show-style",
							className: "styles",
							active: true,
							label: '<i class="bi bi-palette styles"></i>',
							command: "show-styles",
							togglable: false,
						},
					],
				},
			],
		},
		// The Selector Manager allows to assign classes and
		// different states (eg. :hover) on components.
		// Generally, it's used in conjunction with Style Manager
		// but it's not mandatory
		// =====
		selectorManager: {
			appendTo: ".styles-container",
		},
		// Block manager
		blockManager: {
			appendTo: ".blocks-container",
			blocks: [
				//=== Widgets
				{
					id: "accordion",
					category: "Widgets",
					label: "Accordion",
					content: { type: "accordion" },
				},
				{
					id: "accordion-item",
					content: { type: "accordion-item" },
				},
				{
					id: "assignments-widget",
					category: "Widgets",
					label: "Assignments",
					content: { type: "assignments-widget" },
				},
				{
					id: "assignment",
					content: { type: "assignment" },
				},
				{
					id: "blockquote",
					category: "Widgets",
					label: "Blockquote",
					content: { type: "blockquote" },
				},
				{
					id: "border",
					category: "Widgets",
					label: "Border",
					content: { type: "border" },
				},
				{
					id: "call-out",
					category: "Widgets",
					label: "Call Out",
					content: { type: "call-out"},
				},
				{
					id: "card-horizontal",
					category: "Widgets",
					label: "Card Horizontal",
					content: { type: "card-horizontal" },
				},
				{
					id: "columns",
					category: "Widgets",
					label: "Columns",
					content: { type: "columns" },
				},
        {
					id: "dl",
					category: "Widgets",
					label: "Description List",
					content: { type: "dl" },
				},
				{
					id: "horizontal-display",
					category: "Widgets",
					label: "Horizontal Display",
					content: { type: "horizontal-display" },
				},
        {
					id: "figure",
					category: "Widgets",
					label: "Image",
					content: { type: "figure" },
				},
				{
					id: "figure-caption",
					category: "Widgets",
					label: "Image with Caption",
					content: { type: "figure-caption" },
				},
				{
					id: "image-gallery",
					category: "Widgets",
					label: "Image Gallery",
					content: { type: "image-gallery" },
				},
				{
					id: "image-box",
					content: { type: "image-box" },
				},
				{
					id: "side-by-side",
					category: "Widgets",
					label: "Side by Side",
					content: { type: "side-by-side" },
				},
				{
					id: "table",
					category: "Widgets",
					label: "Table",
					content: { type: "table" },
				},
				{
					id: "th",
					content: { type: "th" },
				},
				{
					id: "tbody-tr",
					content: { type: "tbody-tr" },
				},
				{
					id: "tabs",
					category: "Widgets",
					label: "Tabs",
					content: { type: "tabs" },
				},
				{
					id: "vocab-cards",
					category: "Widgets",
					label: "Vocab Cards",
					content: { type: "vocab-cards" },
				},
				{
					id: "vocab-item",
					content: { type: "vocab-item" },
				},
				{
					id: "vocab-list",
					category: "Widgets",
					label: "Vocab List",
					content: { type: "vocab-list" },
				},
				{
					id: "vocab-wrapper",
					content: { type: "vocab-wrapper" },
				},
				// content
        {
					id: "h5p",
					category: "Content",
					label: "H5P Player",
					content: { type: "h5p-container" },
				},
				{
					id: "panopto",
					category: "Content",
					label: "Panopto Video",
					content: { type: "panopto-container" },
				},
				{
					id: "playposit",
					category: "Content",
					label: "Playposit Video",
					content: { type: "playposit-container" },
				},
				{
					id: "youtube",
					category: "Content",
					label: "Youtube Video",
					content: { type: "youtube-container" },
				},
				{
					id: "figure",
					category: "Text",
					label: "Image",
					content: { type: "figure" },
				},
				{
					id: "paragraph",
					category: "Text",
					label: "Text",
					content: { type: "paragraph" },
				},
				{
					id: "h2",
					category: "Text",
					label: "H2",
					content: { type: "h2" },
				},
				{
					id: "h3",
					category: "Text",
					label: "H3",
					content: { type: "h3" },
				},
				{
					id: "h4",
					category: "Text",
					label: "H4",
					content: { type: "h4" },
				},
				{
					id: "h5",
					category: "Text",
					label: "H5",
					content: { type: "h5" },
				},
				{
					id: "h6",
					category: "Text",
					label: "H6",
					content: { type: "h6" },
				},
			],
		},
		// Device manager
		deviceManager: {
			devices: [
				{
					name: "Desktop",
					width: "", // default size
				},
				{
					name: "Tablet",
					width: "768px", // this value will be used on canvas width
					widthMedia: "992px", // this value will be used in CSS @media
				},
				{
					name: "Mobile",
					width: "420px", // this value will be used on canvas width
					widthMedia: "768px", // this value will be used in CSS @media
				},
			],
		},
	});
}
