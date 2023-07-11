//This function takes the components in the array 'types' and prevents mouse selection.
export function makeComponentsUnselectable(editor) {
  const types =   [
    "one-column-layout", 
    "two-column-layout", 
    "content-wrapper", 
    "description-term",
    "description-definition",
  ];

  editor.on('component:selected', function(component) {
    if (types.includes(component.get('type'))) {
      editor.select(); // Deselect the component
    }
  });
}