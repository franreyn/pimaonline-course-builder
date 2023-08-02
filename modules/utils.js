import { config } from "../config.js";
// Utils.js is used to house misc functions

// This function takes the components in the array 'types' and prevents mouse selection.
export function makeComponentsUnselectable(editor) {
  const types = config.unselectableComponents;

  editor.on('component:selected', function(component) {
    if (types.includes(component.get('type'))) {
      editor.select(); // Deselect the component
    }
  });
}

export function mouseClickConfig(editor) {
  
  // This function takes components in either shiftClickComponents or clickOnlyComponents and sets appropriate mouse selection properties
  editor.on('component:selected', function(component) {
    if (config.shiftClickComponents.includes(component.get('type'))) {
      // If the Shift key is not held down, deselect the component
      if (!window.event.shiftKey) {
        editor.select(null);
      }
    } else if (config.clickOnlyComponents.includes(component.get('type'))) {
      // If the Shift key is held down, deselect the component
      if (window.event.shiftKey) {
        editor.select(null);
      }
    }
  });
  
}