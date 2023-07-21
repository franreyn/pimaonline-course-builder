

export function handlePanels(editor) {
  //=== Top Panel =====//
  editor.Panels.addPanel({
    id: "panel-top",
    el: ".panel__top",
  });

  editor.Panels.addPanel({
    id: "basic-actions",
    el: ".panel__basic-actions",
  });
  
}