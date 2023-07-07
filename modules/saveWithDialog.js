export function saveWithDialog(editor) {
	// Save components and assets together
	const data = {
		components: editor.getComponents(),
		assets: editor.AssetManager.getAll(),
	};

	const json = JSON.stringify(data);
	const blob = new Blob([json], { type: "application/json;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = "grapesjs-layout.json";
	link.click();
	currentFileName = link.download;
	setTimeout(() => URL.revokeObjectURL(url), 0);
}