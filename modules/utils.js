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
  let typesToRemove = [];
  if (componentType === "one-column-layout") {
    typesToRemove = ["two-column-layout", "three-section-layout"];
  } else if (componentType === "two-column-layout") {
    typesToRemove = ["one-column-layout", "three-section-layout"];
  } else if (componentType === "three-section-layout") {
    typesToRemove = ["one-column-layout", "two-column-layout"];
  }

  // Find the existing components of the opposite types and remove them
  typesToRemove.forEach(typeToRemove => {
    const existingComponent = components.find((component) => component.get("type") === typeToRemove);

    if (existingComponent) {
      editor.select(existingComponent);
      existingComponent.remove();
    }
  });
}


// Adds the selected layout component, if it already exists it just selects itself (nullifying click)
export function addComponentToCanvas(editor, componentType) {
  let existingComponent = editor.DomComponents.getComponents().find(comp => comp.get("type") === componentType);

  if (existingComponent) {
    // Selects itself, meaning nothing happens (doesn't switch to other layout)
    editor.select(existingComponent);
  } else {
    // Remove current layout and replace with new one
    removeExistingComponent(editor, componentType);
    let newComponent =
    editor.UndoManager.skip( () => {
    editor.DomComponents.addComponent({ type: componentType });
    })
    editor.select(newComponent);
  }
}  

const checkLayersPanel = () => {

  // Remove unneeded items from layers manager
let layersPanel = document.querySelector("span.layers");
layersPanel.addEventListener("click", removeItemsBtns)
}

document.addEventListener("DOMContentLoaded", checkLayersPanel);

// Add classes to this array to have them removed from the layers panel
const buttonsToRemove = ["add-dl-btn","add-img-btn", "add-assignment-btn", "add-vocab-btn", "add-vocab-card-btn"];

export function removeItemsBtns() {
    buttonsToRemove.forEach((buttonToRemove) => {
      const buttons = document.querySelectorAll(`.gjs-layer__t-${buttonToRemove}`);
      buttons.forEach((button) => {
        button.remove();
      });
  })
}