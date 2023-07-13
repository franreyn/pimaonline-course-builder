// Utils.js is used to house misc functions

// This function takes the components in the array 'types' and prevents mouse selection.
export function makeComponentsUnselectable(editor) {
  const types =   [
    "one-column-layout", 
    "two-column-layout", 
    "content-wrapper", 
    "description-term",
    "description-definition",
    "card-body",
    "card-img",
    "side-by-side-item"
  ];

  editor.on('component:selected', function(component) {
    if (types.includes(component.get('type'))) {
      editor.select(); // Deselect the component
    }
  });
}