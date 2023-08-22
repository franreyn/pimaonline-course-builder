// Utils.js is used to house misc functions
import { config } from "../config.js";

// This function takes the components in the array 'types' and prevents mouse selection.
export function makeComponentsUnselectable(editor) {
  const types = config.unselectableComponents;

  editor.on('component:selected', function(component) {
    if (types.includes(component.get('type'))) {
      editor.select(); // Deselect the component
    }
  });
}

// Used in addComponentToConvas()
function removeExistingComponent(editor, componentType) {
  const components = editor.DomComponents.getComponents();

  // Get the type of the component to remove based on the type of the newly added component
  const typeToRemove = componentType === "one-column-layout" ? "two-column-layout" : componentType === "two-column-layout" ? "three-section-layout" : "one-column-layout";

  // Find the existing component of the opposite type and remove it
  const existingComponent = components.find((component) => component.get("type") === typeToRemove);
  if (existingComponent) {
    editor.select(existingComponent);
    editor.runCommand("core:component-delete");
  }
}

// Adds the selected layout component, if it already exists it just selects itself (nullifying click)
export function addComponentToCanvas(editor, componentType) {
  let existingComponent = editor.DomComponents.getComponents().find(comp => comp.get("type") === componentType);
  if (existingComponent) {
    // selects itself, meaning nothing happens (doesn't switch to other layout)
    editor.select(existingComponent);
  } else {
    // remove current layout and replace with new one
    removeExistingComponent(editor, componentType);
    let newComponent =
    editor.UndoManager.skip( () => {
    editor.DomComponents.addComponent({ type: componentType });
    })
    editor.select(newComponent);
  }
}  

