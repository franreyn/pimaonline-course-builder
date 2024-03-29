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
    const fileName = prompt("Enter the file name to save:", "project.json");
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

  // Remove the contenteditable attribute from all elements
  const elements = tempDiv.querySelectorAll("[contenteditable]");
  elements.forEach((element) => {
    element.removeAttribute("contenteditable");
  });

  // Find and remove elements with the classes .add-column-btn and .add-row-btn
  const elementsToRemove = tempDiv.querySelectorAll(".add-items-btns");
  elementsToRemove.forEach((element) => {
    element.remove();
  });

	// Find and remove the first body element
	const firstBody = tempDiv.querySelector("body");
	if (firstBody) {
		firstBody.remove();
	}

	// Use the updated innerHTML for the exported content
	const updatedHtmlContent = tempDiv.innerHTML;
  
  // Parse the updatedHtmlContent string into a DOM element
	const parser = new DOMParser();
	const parsedHtml = parser.parseFromString(updatedHtmlContent, "text/html");

  // Select all anchor tags whose grandparents have the .btn class
  const anchorTags = parsedHtml.querySelectorAll('div.btn > p > a');

  // Loop through each anchor tag
  anchorTags.forEach((anchorTag) => {
    // Add the .btn class to the anchor tag
    anchorTag.classList.add('btn');

    // Get the parent p tag and grandparent div.btn tag
    const parentPTag = anchorTag.parentElement;
    const grandparentDivTag = parentPTag.parentElement;

    // Replace the grandparent div.btn tag with the anchor tag
    grandparentDivTag.parentNode.replaceChild(anchorTag, grandparentDivTag);
  });

	// Change #content-wrapper-2 to #content-wrapper and #second-column-2 to #second-column
	const contentWrapper2 = parsedHtml.querySelector("#content-wrapper-2");
	if (contentWrapper2) {
		contentWrapper2.id = "content-wrapper";
	}

	const secondColumn2 = parsedHtml.querySelector("#second-column-2");
	if (secondColumn2) {
		secondColumn2.id = "second-column";
	}

  // –––––––––– DOM manipulations and CK Editor edits ––––––––––

  // Remove injected override script from exported html
  const overrideScript = parsedHtml.querySelector("#override");
	if (overrideScript) {
		overrideScript.remove();
	}

  // Remove the extra div tags within elements
  const divParents = parsedHtml.querySelectorAll("h1, h2, h3, h4, h5, h6, dd, dt");
  divParents.forEach((parentEl) => {
    const divChild = parentEl.querySelector("div");
    if (divChild) {
      // Move the content of the div to the heading and remove the div
      parentEl.innerHTML = divChild.innerHTML;
      parentEl.removeAttribute("id");

    }
    // // Remove any nested p tags within the heading
    const nestedPTags = parentEl.querySelectorAll("p");
    nestedPTags.forEach((pTag) => {
      parentEl.innerHTML = pTag.innerHTML;

    });
  });

  // Remove empty <p></p> tags
  const emptyPTags = parsedHtml.querySelectorAll("p:empty");
  emptyPTags.forEach((emptyPTag) => {
    emptyPTag.remove();
  });

  //Edits HTML that is entered in as a paragraph, but never edited in CK Editor
// Get all <div> elements
const divElements = parsedHtml.querySelectorAll('div');

// Loop through the selected <div> elements
divElements.forEach((divElement) => {

  // Check if the text content of the <div> matches "Add text"
  // If the div element is a tab-panel keep everything inside
  if(divElement.parentElement.classList.contains("tab-panel")) {
    
     // Get the parent of the <div>
     const parentElement = divElement.parentElement;
     
    while (divElement.firstChild) {
      parentElement.insertBefore(divElement.firstChild, divElement);
    }

    // Remove the <div> element
    parentElement.removeChild(divElement);
  } else if(divElement.parentElement.classList.contains("tab-header")){
    // Get the parent of the <div>
    const parentElement = divElement.parentElement;

    // Create a new text node with the text content of the <div>
    const textNode = document.createTextNode(divElement.textContent);

    // Insert the text node before the <div> element
    parentElement.insertBefore(textNode, divElement);

    // Remove the <div> element
    parentElement.removeChild(divElement);
  }

  const doNotDelete = ["tab-panel", "footnotes", "accordion-content"];

  if (divElement.textContent.trim() === 'Add text' && !doNotDelete.some(className => divElement.classList.contains(className))) {

    // Create a new <p> element
    const newParagraph = parsedHtml.createElement('p');

    // Set the text content of the new <p> element
    newParagraph.textContent = 'Add text';

    // Replace the <div> with the new <p> element
    divElement.parentNode.replaceChild(newParagraph, divElement);
  }
});

// Array of classes for each add button to remove them on export
let addButtons = [".add-tab-btn",".add-accordion-btn"]

// Remove add buttons 
addButtons.forEach((buttonClass) => {

  const buttonGroup = parsedHtml.querySelectorAll(buttonClass);
  if(buttonGroup.length > 0) {
    buttonGroup.forEach((button)=> {

      button.remove();
    })
  }
})

    // Remove add tabs button 
    const addDlBtns = parsedHtml.querySelectorAll(".add-dl-btn");
    if(addDlBtns) {
      addDlBtns.forEach((button)=> {
        button.remove();
      })
    }

	// Serialize the DOM back to HTML
	const serializedHtmlContent = new XMLSerializer().serializeToString(parsedHtml);

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
${serializedHtmlContent}
</body>
</html>
`;

  function cleanExportedHTML(html) {
    try {
      // Parse the HTML string into a DOM structure
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Find the nested html, head, and body elements
      const extraTags = doc.querySelectorAll("body html, body head, body body, a.btn");

      // Remove the nested elements
      extraTags.forEach(el => {
        const div = el.querySelector('div');
        const p = el.querySelector('p');

          if (el.tagName === "HEAD") {
              el.remove();
          } else if (el.tagName === "HTML, BODY") {
              el.replaceWith(...el.childNodes);
          } else {
            if (div && p) {
              div.replaceWith(p.textContent);
            } else if (div) {
              // Handle the case where only <div> is found and is not placeholder Link text
              if(div.innerText !== "Link") {
                div.remove();
              }
            } else if (p) {
              // Handle the case where only <p> is found
              el.replaceWith(p.textContent);
            }
          }
      });

      // Serialize the DOM back to a string
      const serializer = new XMLSerializer();
      let cleanedHTML = serializer.serializeToString(doc);

      // Remove the xmlns attribute
      cleanedHTML = cleanedHTML.replace(/ xmlns="http:\/\/www\.w3\.org\/1999\/xhtml"/g, "");

      return cleanedHTML;
    } catch (error) {
        console.error("Error during HTML cleaning:", error);
        return html; // Return the original HTML if an error occurs
    }
  }
  let cleanedHTML;
  let blob;

  try {
      cleanedHTML = cleanExportedHTML(content);
      blob = new Blob([cleanedHTML], { type: "text/html;charset=utf-8" });
  } catch (error) {
      console.error("Error during Blob creation:", error);
  }

	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = filename;
	link.click();
}