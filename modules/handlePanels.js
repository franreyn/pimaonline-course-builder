

export function handlePanels(editor) {
  //=== Top Panel =====//
  editor.Panels.addPanel({
    id: "panel-top",
    el: ".panel__top",
  });
  editor.Panels.addPanel({
    id: 'layers',
    el: '.panel__right',
    // Add the button to the commands array
    commands: [
      {
        id: 'duplicate',
        className: 'fa fa-clone',
        attributes: { title: 'Duplicate' },
        command: 'duplicate-layer',
      },
      // ... other buttons
    ],
  });
  
}