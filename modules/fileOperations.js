let currentFileName = null;

export async function saveToLocal(editor, saveAs = false) {
	if (!currentFileName || saveAs) {
		saveWithDialog(editor);
	} else {
		try {
			const handle = await window.showDirectoryPicker();
			const fileHandle = await handle.getFileHandle(currentFileName, { create: true });
			const writable = await fileHandle.createWritable();

			// Save components and assets together
			const data = {
				components: editor.getComponents(),
				assets: editor.AssetManager.getAll(),
			};

			const json = JSON.stringify(data);
			await writable.write(json);
			await writable.close();
		} catch (error) {
			console.error("Error saving file:", error);
		}
	}
}

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

export function openFromLocal(editor) {
	const input = document.createElement("input");
	input.type = "file";
	input.accept = ".json";
	input.onchange = (event) => {
		const file = event.target.files[0];
		if (file) {
			currentFileName = file.name;
			const reader = new FileReader();
			reader.onload = (event) => {
				const result = event.target.result;
				try {
					const data = JSON.parse(result);
					editor.setComponents(data.components);
					editor.AssetManager.add(data.assets);
				} catch (error) {
					alert("Invalid file format.");
				}
			};
			reader.readAsText(file);
		}
	};
	input.click();
}