export function openFromLocal(editor) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = async () => {
    const file = input.files[0];
  
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const projectData = JSON.parse(reader.result);
        
        // Get the file name without the extension from the loaded file
        loadedFileName = file.name.split('.').slice(0, -1).join('.');

        editor.setComponents(projectData.pages[0].frames[0].component.components);
        editor.setStyle(projectData.styles);
      } catch (error) {
        console.error('Error parsing or loading project data:', error); // Log any errors
      }
    };
  
    reader.onerror = (error) => {
      console.error('Error reading file:', error); // Log any errors during file reading
    };
  
    reader.readAsText(file);
  };
  input.click();
}

// Add a variable to store the loaded file name
let loadedFileName = "";

export async function saveToLocal(editor) {
  // Check if a file has been loaded previously
  if (loadedFileName) {
    // If a file has been loaded, use its name for saving the changes
    await saveAsToLocal(editor, loadedFileName);
  } else {
    // If no file has been loaded, prompt the user for a new file name
    const fileName = prompt("Enter the file name to save:", "_grapes-project.json");
    await saveAsToLocal(editor, fileName);
  }
}

export async function saveAsToLocal(editor, fileName) {
  if (!fileName) {
    // If the user cancels the prompt or doesn't provide a name, abort the save process
    return;
  }

  const storedProjectData = await editor.store();
  const blob = new Blob([JSON.stringify(storedProjectData)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  // Create an anchor element with the download link
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;

  // Simulate a click on the anchor to trigger the download
  anchor.click();

  // Clean up the object URL
  URL.revokeObjectURL(url);

  // Update the loaded file name variable with the new file name
  loadedFileName = fileName;
}


export function exportFile(editor) {
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
}