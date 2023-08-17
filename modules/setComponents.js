// Rules added here are only for elements inside the editor 

export function setComponents(editor) {
	editor.setComponents(`
  <style>
    body, html {
      height: 100%;
      margin: 0;
      padding: 0;
    }

    #one-column {
      width: 100%;
    }

    #content-wrapper, #second-column {
      min-height: 15px;
    }

    .content-body {
      margin-bottom: 15px !important;
    }
  </style>
`);
}
