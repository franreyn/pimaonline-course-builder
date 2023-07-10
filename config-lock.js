import { initEditor } from "./modules/initEditor.js";
import { addCustomTypes } from "./modules/addCustomTypes.js";
import { handleEvents } from "./modules/handleEvents.js";
import { defineCommands } from "./modules/defineCommands.js";
import { setComponents } from "./modules/setComponents.js";
import { handlePanels } from "./modules/handlePanels.js";
// import { saveToLocal, saveWithDialog, openFromLocal } from './modules/fileOperations.js';
// import { saveToLocal, loadFromLocal } from './modules/fileOperations.js';

const editor = initEditor();
setComponents(editor)
editor.render();
handlePanels(editor)
addCustomTypes(editor);
handleEvents(editor);
defineCommands(editor);

// Buttons
// const btnSave = document.getElementById("btn-save");
// btnSave.addEventListener("click", () => saveToLocal(editor, false));

const btnSaveAs = document.getElementById("btn-save-as");
btnSaveAs.addEventListener('click', async () => {
  const storedProjectData = await editor.store();
  const blob = new Blob([JSON.stringify(storedProjectData)], {type: "application/json;charset=utf-8"});
  saveAs(blob, "project.json");
});

const btnOpen = document.getElementById("btn-open");
btnOpen.addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = async () => {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const projectData = JSON.parse(reader.result);
      await editor.load(projectData);
    };
    reader.readAsText(file);
  };
  input.click();
});
// ===

// === Export
document.getElementById("btn-export").addEventListener("click", function () {
	const filename = "exported.html";
	const htmlContent = editor.getHtml();
	const cssContent = editor.getCss();

	// Create a temporary div and set its innerHTML to htmlContent
	const tempDiv = document.createElement("div");
	tempDiv.innerHTML = htmlContent;

	// Find and remove the first body element
	const firstBody = tempDiv.querySelector("body");
	if (firstBody) {
		firstBody.remove();
	}

	// Use the updated innerHTML for the exported content
	const updatedHtmlContent = tempDiv.innerHTML;

	const content = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@pimaonline/pimaonline-themepack/dist/css/themes/cards/styles.css">
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js" defer></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@pimaonline/pimaonline-themepack/dist/js/scripts2.js" defer></script>
<title>Starter Template</title>
</head>
<body>
${updatedHtmlContent}
</body>
</html>
`;
	const blob = new Blob([content], { type: "text/html;charset=utf-8" });
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = filename;
	link.click();
});

