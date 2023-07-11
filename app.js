import { initEditor } from "./modules/initEditor.js";
import { addCustomTypes } from "./modules/addCustomTypes.js";
import { handleEvents } from "./modules/handleEvents.js";
import { defineCommands } from "./modules/defineCommands.js";
import { setComponents } from "./modules/setComponents.js";
import { handlePanels } from "./modules/handlePanels.js";
import { saveToLocal, openFromLocal, exportFile } from './modules/fileOperations.js';
import { makeComponentsUnselectable } from "./modules/utils.js";

// Init editor
const editor = initEditor();
// Add editor style overrides (css)
setComponents(editor)
// Render the editor
editor.render();

// Config
handlePanels(editor)
addCustomTypes(editor);
handleEvents(editor);
defineCommands(editor);
makeComponentsUnselectable(editor);

const btnSaveAs = document.querySelector("#btn-save-as");
btnSaveAs.addEventListener("click", () => saveToLocal(editor));

const btnOpen = document.querySelector("#btn-open");
btnOpen.addEventListener("click", () => openFromLocal(editor));

const btnExport = document.querySelector("#btn-export");
btnExport.addEventListener("click", () => exportFile(editor));
