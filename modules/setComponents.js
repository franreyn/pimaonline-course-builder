// Rules added here are only for elements inside the editor 

export function setComponents(editor) {
	editor.setComponents(`
  <style>
    body, html {
      height: auto;
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

    .accordion-content {
      display: block;
    }

    .accordion-item {
      margin-bottom: 10px;
    }

    .accordion-title {
      display: flex;
      justify-content: space-between;
    }

    .accordion .accordion-title h3 {
      flex-basis: 50%;
      margin-bottom: 0;
      max-width: 100%;
    }
  </style>
`);
}
