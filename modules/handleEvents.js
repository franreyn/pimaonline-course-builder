import { config } from "../config.js";

// Events such as when a component mounts, is deleted, or selected, etc.

export function handleEvents(editor) {

  // Get config data
  let allowedCopyableComponents = config.copyableComponents;

  function setCustomLayerName(component) {
    switch (component.get("type")) {
      case "text":
        component.set("title", "Custom Text Layer");
        break;
      case "image":
        component.set("title", "Custom Image Layer");
        break;
      default:
        component.set("title", "Custom Layer");
    }
  }

/*
  // When a component is duplicated, remove it's children
  editor.on('component:clone', (component) => {
    // Check if the component has any child components
    if (component.components().length > 0) {
      // If so, remove them
      component.components().reset();
    }
  });
*/

//
let columnComponentCount = 0;
editor.on('component:add', (component) => {
  if (component.get('type') === 'one-column-layout' || component.get('type') === 'two-column-layout') {
    columnComponentCount += 1;
    if (columnComponentCount > 1) {
      const confirmSwitch = window.confirm('Your content will be deleted if you switch layouts, are you sure?');
      if (confirmSwitch) {
        const doubleCheck = window.confirm("Just double checking you're sure.");
        if (doubleCheck) {
          editor.runCommand('remove-sibling-components', { component });
        } else {
          component.remove(); // Remove the component if the user cancels the second confirmation
        }
      } else {
        component.remove(); // Remove the component if the user cancels the first confirmation
      }
    }
  }
  setCustomLayerName(component);
  editor.LayerManager.render(); // Force layers panel to refresh
});


editor.on('component:remove', (component) => {
  editor.LayerManager.render(); // Force layers panel to refresh
});

editor.on('component:mount', (component) => {
if (component.get('type') === 'content-body') {
const parentType = component.parent().get('type');
if (parentType !== 'content-wrapper' && parentType !== 'second-column') {
  component.remove();
}
}
});

// Prevent all components, except those in array, from being copyable, aka duplicate
function setCopyableComponents(copyableComponents) {
  editor.on("component:add", (component) => {
    if (copyableComponents.includes(component.get("type"))) {
      component.set("copyable", true);
    } else {
      component.set("copyable", false);
    }
  });
}
// Set duplicatable/copyable components
setCopyableComponents(allowedCopyableComponents);
editor.on('component:title', setCustomLayerName);

}
