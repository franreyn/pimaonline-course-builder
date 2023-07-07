

export async function saveToLocal(editor, saveAs = false) {
  let currentFileName = null;

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