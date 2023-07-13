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