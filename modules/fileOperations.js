// Function to save data to a local file
export function saveToLocal(editor) {
  // Blur the currently focused element
  if (document.activeElement) {
    document.activeElement.blur();
  }

  // Get the editor's data as a JSON string
  const data = JSON.stringify(editor.getComponents());

  // Create a Blob object representing the data
  const blob = new Blob([data], {type: 'application/json'});

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement('a');
  link.href = url;
  link.download = 'editor-data.json';

  // Append the link to the body
  document.body.appendChild(link);

  // Simulate a click on the link
  link.click();

  // Remove the link from the body
  document.body.removeChild(link);
}


// Function to load data from a local file
export function loadFromLocal(editor) {
  // Create an input element
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';

  // Define what happens when a file is selected
  input.onchange = (event) => {
    // Get the selected file
    const file = event.target.files[0];

    // Create a FileReader to read the file
    const reader = new FileReader();

    // Define what happens when the file has been read
    reader.onload = (event) => {
      // Parse the file's content as JSON
      const components = JSON.parse(event.target.result);

      // Load the components into the editor
      editor.setComponents(components);
    };

    // Start reading the file
    reader.readAsText(file);
  };

  // Simulate a click on the input
  input.click();
}
