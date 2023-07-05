let currentFileName = null;

function setCustomLayerName(component) {
  switch (component.get('type')) {
    case 'text':
      component.set('title', 'Custom Text Layer');
      break;
    case 'image':
      component.set('title', 'Custom Image Layer');
      break;
    default:
      component.set('title', 'Custom Layer');
  }
}

//=== Init ===//
const editor = grapesjs.init({
  container: '#gjs',
  autorender: 0,
  fromElement: true,
  height: '100%',
  width: 'auto',
  storageManager: true,  
  panels: { defaults: [] },
  layerManager: {
    appendTo: '.layers-container',
  },
  traitManager: {
   appendTo: '.traits-container',
  },  
  canvas: {
    scripts:  [
              'https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js', 
              //'https://cdn.jsdelivr.net/npm/@pimaonline/pimaonline-themepack/dist/js/scripts2.js',
              './js/overrides.js'
              ], 
    styles: [
              'https://cdn.jsdelivr.net/npm/@pimaonline/pimaonline-themepack/dist/css/themes/cards/styles.css',
              './css/theme-overrides.css'
            ],
  },          
  // We define a default panel as a sidebar to contain layers
  panels: {
    defaults: [{
        id: 'layers',
        el: '.panel__right',  
        // Make the panel resizable
        resizable: {
          maxDim: 350,
          minDim: 200,
          tc: 0, // Top handler
          cl: 1, // Left handler
          cr: 0, // Right handler
          bc: 0, // Bottom handler
          // Being a flex child we need to change `flex-basis` property
          // instead of the `width` (default)
          keyWidth: 'flex-basis',
        },
      },
      {
        id: 'panel-devices',
        el: '.panel__devices',
        buttons: [{
            id: 'device-desktop',
            label: '<i class="bi bi-display"></i>',
            command: 'set-device-desktop',
            active: true,
            togglable: false,
          }, {
            id: 'device-mobile',
            label: '<i class="bi bi-phone"></i>',
            command: 'set-device-mobile',
            togglable: false,
        }],
      },
      {
        id: 'panel-switcher',
        el: '.panel__switcher',
        buttons: [
          {
            id:"show-blocks", 
            active: true, 
            label:`<i class="bi bi-grid"></i>`, 
            command:"show-blocks", 
            togglable:false}, 
          {
            id: 'show-layers',
            active: true,
            label: '<i class="bi bi-layers"></i>',
            command: 'show-layers',
            // Once activated disable the possibility to turn it off
            togglable: false,
          },
          {
            id: 'show-traits',
            active: true,
            label: '<i class="bi bi-node-plus"></i>',
            command: 'show-traits',
            togglable: false,
          },           
          {
            id: 'show-style',
            active: true,
            label: '<i class="bi bi-palette"></i>',
            command: 'show-styles',
            togglable: false,
          },                                  
        ],
      }]
  },
  // The Selector Manager allows to assign classes and
  // different states (eg. :hover) on components.
  // Generally, it's used in conjunction with Style Manager
  // but it's not mandatory
  // =====
  selectorManager: {
    appendTo: '.styles-container'
  },
  // Storage manager
  storageManager: {
    id: 'gjs-',             // Prefix identifier that will be used inside storing and loading
    type: 'local',          // Type of the storage
    autosave: false,         // Store data automatically
    autoload: false,         // Autoload stored data on init
    stepsBeforeSave: 1,     // If autosave enabled, indicates how many changes are necessary before store method is triggered
    storeComponents: true,  // Enable/Disable storing of components in JSON format
    storeStyles: true,      // Enable/Disable storing of rules in JSON format
    storeHtml: true,        // Enable/Disable storing of components as HTML string
    storeCss: true,         // Enable/Disable storing of rules as CSS string
  },
  // Block manager
  blockManager: {
    appendTo: '.blocks-container',
    blocks: [
      //=== Layouts
      {
        id: 'one-column', // id is mandatory
        label: '<b>One Column</b>', // You can use HTML/SVG inside labels
        // attributes: { class:'gjs-block-section' },
        category: 'Layout',
        content: { type: 'one-column-layout' },
      }, 
      {
        id: 'two-column', // id is mandatory
        label: '<b>Two Column</b>', // You can use HTML/SVG inside labels
        // attributes: { class:'gjs-block-section' },
        category: 'Layout',
        content: { type: 'two-column-layout' },
      }, 
      //=== Widgets
      {
        id: 'content-body',
        category: 'Widgets',
        label: 'Content Body',
        content: {type: 'content-body'},
      }, 
      {
        id: 'assignments-widget',
        category: 'Widgets',
        label: 'Assignments',
        content: {type: 'assignments-widget'},
      }, 
      {
        id: 'blockquote',
        category: 'Widgets',
        label: 'Blockquote',
        content: {type: 'blockquote'},
      }, 
      {
        id: 'border',
        category: 'Widgets',
        label: 'Border',
        content: {type: 'border'},
      }, 
      {
        id: 'card-horizontal',
        category: 'Widgets',
        label: 'Card Horizontal',
        content: {type: 'card-horizontal'},
      }, 
      {
        id: 'side-by-side',
        category: 'Widgets',
        label: 'Side by Side',
        content: {type: 'side-by-side'},
      }, 
      {
        id: 'vocab-list',
        category: 'Widgets',
        label: 'Vocab List',
        content: {type: 'vocab-list'},
      },      
      {
        id: 'figure',
        category: 'Widgets',
        label: 'Image',
        content: {type: 'figure'},
      },      
      {
        id: 'figure-caption',
        category: 'Widgets',
        label: 'Image with Caption',
        content: {type: 'figure-caption'},
      },      
      // content
      {
        id: 'button',
        category: 'Content',
        label: 'Button',
        content: {type: 'button'},
      },        
      {
        id: 'hyperlink',
        category: 'Content',
        label: 'Hyperlink',
        content: {type: 'hyperlink'},
      },
      // text        
      {
        id: 'image',
        category: 'Text',
        label: 'Image',
        content: {type: 'image'},
      },      
      {
        id: 'ol',
        category: 'Text',
        label: 'Ordered List',
        content: {type: 'ol'},
      },      
      {
        id: 'ul',
        category: 'Text',
        label: 'Unordered List',
        content: {type: 'ul'},
      },      
      {
        id: 'dl',
        category: 'Text',
        label: 'Description List',
        content: {type: 'dl'},
      },      
      {
        id: 'paragraph',
        category: 'Text',
        label: 'Paragraph',
        content: {type: 'paragraph'},
      },      
      {
        id: 'h2',
        category: 'Text',
        label: 'H2',
        content: {type: 'h2'},
      },      
      {
        id: 'h3',
        category: 'Text',
        label: 'H3',
        content: {type: 'h3'},
      },      
      {
        id: 'h4',
        category: 'Text',
        label: 'H4',
        content: {type: 'h4'},
      },      
      {
        id: 'h5',
        category: 'Text',
        label: 'H5',
        content: {type: 'h5'},
      },      
      {
        id: 'h6',
        category: 'Text',
        label: 'H6',
        content: {type: 'h6'},
      },      
    ]
  },  
  // Device manager
  deviceManager: {
    devices: [{
        name: 'Desktop',
        width: '', // default size
      }, {
        name: 'Mobile',
        width: '320px', // this value will be used on canvas width
        widthMedia: '480px', // this value will be used in CSS @media
    }]
  },      
});
//=== end init ===//
//=== end init ===//
//=== end init ===//



// Set the canvas height and width to 100%
editor.setComponents(`
  <style>
    body, html {
      height: 100%;
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
  </style>
`);

//****** Render the editor ********
editor.render();

// Prevent addition of component if it's not being added to parent component.
function restrictParentComponent(type, validParents) {
  editor.on("component:mount", (component) => {
    if (component.get("type") === type) {
      let currentParentType = component.parent().get("type");

      if (!validParents.includes(currentParentType)) {
        if (component.previousParent) {
          component.previousParent.append(component);
        } else {
          component.remove();
        }
      } else {
        component.previousParent = component.parent();
      }
    }
  });
};

// Edit layer names
editor.on('component:title', setCustomLayerName);

// ====== COMPONENTS ====== //
// == Create one column component
editor.DomComponents.addType("one-column-layout", {
  model: {
    defaults: {
      tagName: "body",
      attributes: { id: "one-column" },
    },
    init() {
      if (!this.components().find((component) => component.get("type") === "header")) {
        this.components().add({ type: "header" });
      }
      
      if (!this.components().find((component) => component.get("type") === "content-wrapper")) {
        this.components().add({ type: "content-wrapper" });
      }
    },
  },
});

// == Create two column components
editor.DomComponents.addType("two-column-layout", {
  model: {
    defaults: {
      tagName: "body",
      attributes: { id: "two-column" },
    },
    init() {
      if (!this.components().find((component) => component.get("type") === "header")) {
        this.components().add({ type: "header" });
      }

      if (!this.components().find((component) => component.get("type") === "content-wrapper")) {
        this.components().add({ type: "content-wrapper" });
      }

      if (!this.components().find((component) => component.get("type") === "second-column")) {
        this.components().add({ type: "second-column" });
      }
    },
  },
});

// Header
editor.DomComponents.addType("header", {
  model: {
    defaults: {
      tagName: "header",
      attributes: {
        class: "header",
      },
    }, 
    init() {
      if (!this.components().find((component) => component.get("type") === "banner-image")) {
        this.components().add({ type: "banner-image" });
      }

      if (!this.components().find((component) => component.get("type") === "text-container")) {
        this.components().add({ type: "text-container" });
      }
    },              
  },
});

// Banner image
editor.DomComponents.addType("banner-image", {
  model: {
    defaults: {
      tagName: "img",
      attributes: {
        src: "https://via.placeholder.com/1920x650",
        alt: "Banner image"
      },
      draggable: false,
      resizable: false,
      highlightable: true,
      selectable: true,
    },
    init() {
      this.set("title", "Banner Image");
    },
  },
});
restrictParentComponent('banner-image', ['header']);

// Text container
editor.DomComponents.addType("text-container", {
  model: {
    defaults: {
      tagName: "div",
      attributes: {
        class: "text-container",
      },
    }, 
    init() {
      if (!this.components().find((component) => component.get("type") === "h1")) {
        this.components().add({ type: "h1" });
      }
      if (!this.components().find((component) => component.get("type") === "paragraph")) {
        this.components().add({ type: "paragraph" });
      }
    },           
  },
});    

// Content wrapper
editor.DomComponents.addType("content-wrapper", {
  model: {
    defaults: {
      tagName: "div",
      attributes: {
        id: "content-wrapper",
      },
    },
    init() {
      if (!this.components().find((component) => component.get("type") === "content-body")) {
        this.components().add({ type: "content-body" });
      }
    },        
  },
});

// Second column
editor.DomComponents.addType("second-column", {
  model: {
    defaults: {
      tagName: "div",
      attributes: {
        id: "second-column",
      },
    },
    init() {
      if (!this.components().find((component) => component.get("type") === "content-body")) {
        this.components().add({ type: "content-body" });
      }
    },        
  },
});


// Content-body
editor.DomComponents.addType('content-body', {
  model: {
    defaults: {
      tagName: 'div',
      attributes: {
        class: 'content-body',
        //'data-gjs-type': 'content-body',
      },
    },
    init() {
      if (!this.components().find((component) => component.get("type") === "h2")) {
        this.components().add({ type: "h2" });
      }
    },    
  },
});
restrictParentComponent('content-body', ['content-wrapper', 'second-column']);


// Border widget
editor.DomComponents.addType('border', {
  model: {
    defaults: {
      tagName: 'div',
      attributes: { class: "border" },        
    },
    init() {
      if (!this.components().find((component) => component.get("type") === "h3")) {
        this.components().add({ type: "h3" });
      }
      if (!this.components().find((component) => component.get("type") === "paragraph")) {
        this.components().add({ type: "paragraph" });
      }
    },    
  }
});    
restrictParentComponent('border', ['content-body']);

// Card Horizontal
editor.DomComponents.addType('card-horizontal', {
  model: {
    defaults: {
      tagName: 'div',
      attributes: { class: "card-horizontal" },        
    },
    init() {
      if (!this.components().find((component) => component.get("type") === "card-body")) {
        this.components().add({ type: "card-body" });
      }
      if (!this.components().find((component) => component.get("type") === "card-img")) {
        this.components().add({ type: "card-img" });
      }      
    },    
  }
});    
restrictParentComponent('card-horizontal', ['content-body']);

  // card body
  editor.DomComponents.addType('card-body', {
    model: {
      defaults: {
        tagName: 'div',
        attributes: { class: "card-body" }, 
      },    
      init() {
        if (!this.components().find((component) => component.get("type") === "paragraph")) {
          this.components().add({ type: "paragraph" });
        }
      },    
    }
  });    
  restrictParentComponent('card-body', ['card-horizontal']);

  // card image
  editor.DomComponents.addType('card-img', {
    model: {
      defaults: {
        tagName: 'div',
        attributes: { class: "card-img" }, 
      },
      init() {
        if (!this.components().find((component) => component.get("type") === "image")) {
          this.components().add({ type: "image" });
        }
      },          
    }
  });    
  restrictParentComponent('card-img', ['card-horizontal']);


// Side-by-side Widget
editor.DomComponents.addType('side-by-side', {
  model: {
    defaults: {
      tagName: 'div',
      attributes: { class: "side-by-side" },        
    },
    init() {
      if (!this.components().find((component) => component.get("type") === "side-by-side-item")) {
        this.components().add({ type: "side-by-side-item" });
        this.components().add({ type: "side-by-side-item" });
      }
    },    
  }
});    
restrictParentComponent('side-by-side', ['content-body']);

  // Side-by-side Item
  editor.DomComponents.addType('side-by-side-item', {
    model: {
      defaults: {
        tagName: 'div',
        attributes: { class: "side-by-side-item" },        
      },
      init() {
        if (!this.components().find((component) => component.get("type") === "h3")) {
          this.components().add({ type: "h3" });
        }
        if (!this.components().find((component) => component.get("type") === "paragraph")) {
          this.components().add({ type: "paragraph" });
        }
      },      
    }
  });    
  restrictParentComponent('side-by-side-item', ['side-by-side']);

// Vocabulary widget
editor.DomComponents.addType('vocab-list', {
  model: {
    defaults: {
      tagName: 'dl',
      attributes: { class: "vocab-list" },        
    },
    init() {
      if (!this.components().find((component) => component.get("type") === "description-term")) {
        this.components().add({ type: "description-term" });
      }
      if (!this.components().find((component) => component.get("type") === "description-definition")) {
        this.components().add({ type: "description-definition" });
      }      
    },
  }
});    
restrictParentComponent('vocab-list', ['content-body']);

  // Vocabulary widget TERM
  editor.DomComponents.addType('description-term', {
    model: {
      defaults: {
        tagName: 'dt',
        content: 'Term'
      }
    }
  });   
  restrictParentComponent('description-term', ['vocab-list']);

  // Vocabulary widget DEFINITION
  editor.DomComponents.addType('description-definition', {
    model: {
      defaults: {
        tagName: 'dd',
        content: 'This is the definition.'
      }
    }
  });   
  restrictParentComponent('description-definition', ['vocab-list']);

// Assignments Widget
editor.DomComponents.addType('assignments-widget', {
  model: {
    defaults: {
      tagName: 'ul',
      attributes: { class: "assignments-widget" },
    },
    init() {
      if (!this.components().find((component) => component.get("type") === "assignment")) {
        this.components().add({ type: "assignment" });
      }     
    },    
  }
});   
restrictParentComponent('assignments-widget', ['content-body']);

  // Assignment
  editor.DomComponents.addType('assignment', {
    model: {
      defaults: {
        tagName: 'li',
        attributes: { class: "assignment" },
      },
      init() {
        if (!this.components().find((component) => component.get("type") === "h3")) {
          this.components().add({ type: "h3" });
        }
        if (!this.components().find((component) => component.get("type") === "paragraph")) {
          this.components().add({ type: "paragraph" });
        }      
        if (!this.components().find((component) => component.get("type") === "button")) {
          this.components().add({ type: "button" });
        }      
      },    
    }
  });   
  restrictParentComponent('assignment', ['assignments-widget']);

// Blockquote
editor.DomComponents.addType('blockquote', {
  model: {
    defaults: {
      tagName: 'blockquote',        
    },
    init() {
      if (!this.components().find((component) => component.get("type") === "paragraph")) {
        this.components().add({ type: "paragraph" });
      }     
    },    
  }
});
restrictParentComponent('blockquote', ['content-body']);

// Raw image - Not a sole component, only used to build other components
editor.DomComponents.addType('image', {
  model: {
    defaults: {
      tagName: 'img',
      attributes: {
        src: 'your-image-url-here'
      },
      resizable: true,
    },
  },
  view: {},
});

// Image no caption
editor.DomComponents.addType('figure', {
  model: {
    defaults: {
      tagName: 'figure',        
    },
    init() {
      if (!this.components().find((component) => component.get("type") === "image")) {
        this.components().add({ type: "image" });
      }          
    },    
  }
});
restrictParentComponent('figure', ['content-body']);

// Image with caption
editor.DomComponents.addType('figure-caption', {
  model: {
    defaults: {
      tagName: 'figure',        
    },
    init() {
      if (!this.components().find((component) => component.get("type") === "image")) {
        this.components().add({ type: "image" });
      }     
      if (!this.components().find((component) => component.get("type") === "figcaption")) {
        this.components().add({ type: "figcaption" });
      }     
    },    
  }
});
restrictParentComponent('figure-caption', ['content-body']);

  // Figcaption
  editor.DomComponents.addType('figcaption', {
    model: {
      defaults: {
        tagName: 'figcaption',     
        attributes: { contenteditable: 'true' },
        content: 'Insert image caption'
      },    
    }
  });
 // restrictParentComponent('figcaption', ['figure-caption']);  

// Buttons
editor.DomComponents.addType('button', {
  model: {
    defaults: {
      type: 'link',
      tagName: 'a',
      attributes: { class: "btn" },
      traits: [
        {
          type: 'text',
          label: 'URL',
          name: 'href',
          placeholder: 'https://d2l.pima.edu/d2l/login'
        },
        {
          type: 'text',
          label: 'Text',
          name: 'content',
          changeProp: 1
        },
        {
          type: 'checkbox',
          label: 'Open in new tab',
          name: 'target',
          changeProp: 1,
          valueTrue: '_blank',
          valueFalse: ''
        }
      ],
      content: 'Link Text'
    },
    init() {
      this.listenTo(this, 'change:content', this.updateContent);
    },
    updateContent() {
      this.components(this.get('content'));
    }
  },
  view: {},
  isComponent: el => el.tagName == 'A' && el.classList.contains('btn')
});
restrictParentComponent('button', ['assignment', 'blockquote', 'border', 'card-body', 'content-body', 'side-by-side-item', 'description-definition', 'description-term']);


// Hyperlinks
editor.DomComponents.addType('hyperlink', {
  model: {
    defaults: {
      type: 'link',
      tagName: 'a',
      traits: [
        {
          type: 'text',
          label: 'URL',
          name: 'href',
          placeholder: 'https://d2l.pima.edu/d2l/login'
        },
        {
          type: 'text',
          label: 'Text',
          name: 'content',
          changeProp: 1
        },
        {
          type: 'checkbox',
          label: 'Open in new tab',
          name: 'target',
          changeProp: 1,
          valueTrue: '_blank',
          valueFalse: ''
        }
      ],
      content: 'Link Text'
    },
    init() {
      this.listenTo(this, 'change:content', this.updateContent);
    },
    updateContent() {
      this.components(this.get('content'));
    }
  },
  view: {},
  isComponent: el => el.tagName == 'A'
});
restrictParentComponent('hyperlink', ['assignment', 'blockquote', 'border', 'card-body', 'content-body', 'side-by-side-item', 'description-definition', 'description-term']);

// ol
editor.DomComponents.addType('ol', {
  model: {
    defaults: {
      tagName: 'ol',        
    },
    init() {
      if (!this.components().find((component) => component.get("type") === "li")) {
        this.components().add({ type: "li" });
      }     
    },    
  }
});
//restrictParentComponent('blockquote', ['content-body']);

// ul
editor.DomComponents.addType('ul', {
  model: {
    defaults: {
      tagName: 'ul',        
    },
    init() {
      if (!this.components().find((component) => component.get("type") === "li")) {
        this.components().add({ type: "li" });
      }     
    },    
  }
});
//restrictParentComponent('blockquote', ['content-body']);

// li
editor.DomComponents.addType('li', {
  model: {
    defaults: {
      tagName: 'li',        
      attributes: { contenteditable: 'true' },
      content: 'Insert list-item'
    },    
  }
});
//restrictParentComponent('blockquote', ['content-body']);

// Description Lists
editor.DomComponents.addType('dl', {
  model: {
    defaults: {
      tagName: 'dl',        
    },
    init() {
      if (!this.components().find((component) => component.get("type") === "dt")) {
        this.components().add({ type: "dt" });
      }
      if (!this.components().find((component) => component.get("type") === "dd")) {
        this.components().add({ type: "dd" });
      }      
    },
  }
});    
restrictParentComponent('dl', ['content-body']);

  // Term
  editor.DomComponents.addType('dt', {
    model: {
      defaults: {
        tagName: 'dt',
        content: 'Term'
      }
    }
  });   
  restrictParentComponent('dt', ['dl']);

  // Definition
  editor.DomComponents.addType('dd', {
    model: {
      defaults: {
        tagName: 'dd',
        content: 'Add definition'
      }
    }
  });   
  restrictParentComponent('dd', ['dl']);

// Heading 1
editor.DomComponents.addType('h1', {
  model: {
    defaults: {
      tagName: 'h1',        
      attributes: { contenteditable: 'true' },
      content: 'Insert subheading.'
    }
  }
});
restrictParentComponent('h1', ['text-container']);

// Heading 2
editor.DomComponents.addType('h2', {
  model: {
    defaults: {
      tagName: 'h2',        
      attributes: { contenteditable: 'true' },
      content: 'Insert subheading.'
    }
  }
});
restrictParentComponent('h2', ['assignment', 'blockquote', 'border', 'card-body', 'content-body', 'side-by-side-item', 'description-definition', 'description-term']);

// Heading 3
editor.DomComponents.addType('h3', {
  model: {
    defaults: {
      tagName: 'h3',
      attributes: { contenteditable: 'true' },
      content: 'Insert subheading.'
    }
  }
});
restrictParentComponent('h3', ['assignment', 'blockquote', 'border', 'card-body', 'content-body', 'side-by-side-item', 'description-definition', 'description-term']);

// Heading 4
editor.DomComponents.addType('h4', {
  model: {
    defaults: {
      tagName: 'h4',        
      attributes: { contenteditable: 'true' },
      content: 'Insert subheading.'
    }
  }
});    
restrictParentComponent('h4', ['assignment', 'blockquote', 'border', 'card-body', 'content-body', 'side-by-side-item', 'description-definition', 'description-term']);

// Heading 5
editor.DomComponents.addType('h5', {
  model: {
    defaults: {
      tagName: 'h5',        
      attributes: { contenteditable: 'true' },
      content: 'Insert subheading.'
    }
  }
});
restrictParentComponent('h5', ['assignment', 'blockquote', 'border', 'card-body', 'content-body', 'side-by-side-item', 'description-definition', 'description-term']);

// Heading 6
editor.DomComponents.addType('h6', {
  model: {
    defaults: {
      tagName: 'h6',        
      attributes: { contenteditable: 'true' },
      content: 'Insert subheading.'
    }
  }
});
restrictParentComponent('h6', ['assignment', 'blockquote', 'border', 'card-body', 'content-body', 'side-by-side-item', 'description-definition', 'description-term']);    

// Paragraph
editor.DomComponents.addType('paragraph', {
  model: {
    defaults: {
      tagName: 'p',
      content: 'Insert subheading.'
    }
  },
  view: {
    onRender() {
      this.el.setAttribute('contenteditable', 'true');
    }
  }
});
restrictParentComponent('paragraph', ['assignment', 'blockquote', 'border', 'card-body', 'content-body', 'side-by-side-item', 'description-definition', 'description-term']);  





// ======= END COMPONENTS ======


//
editor.Commands.add('remove-sibling-components', {
  run(editor, sender, data) {
    const component = data.component;
    const parent = component.parent();
    const siblings = parent.components();
    siblings.forEach((sibling) => {
      if (sibling !== component) {
        sibling.remove();
        // Trigger a custom event after removing the component
        sibling.trigger('custom:update');
      }
    });
  }
});

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
const allowedCopyableComponents = 
["content-body", "assignment", "paragraph", "ol", "ul", "dl", "li", "dt", "dd"];
setCopyableComponents(allowedCopyableComponents);

// editor.on("component:add", (component) => {
//   if (component.get("type") !== "content-body") {
//     component.set("copyable", false);
//   }
// });



//=== Top Panel =====//
editor.Panels.addPanel({
  id: 'panel-top',
  el: '.panel__top',
});
// editor.Panels.addPanel({
//   id: 'basic-actions',
//   el: '.panel__basic-actions',
//   buttons: [
//     {
//       id: 'visibility',
//       active: true, // active by default
//       className: 'btn-toggle-borders',
//       label: '<b>Course Builder</b>',
//       command: 'sw-visibility', // Built-in command
//     }, 
//   ],
// }); 
//=== end top panel ===//
    
//=== Define commands ===//
editor.Commands.add('show-layers', {
  getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
  getLayersEl(row) { return row.querySelector('.layers-container') },

  run(editor, sender) {
    const lmEl = this.getLayersEl(this.getRowEl(editor));
    lmEl.style.display = '';
  },
  stop(editor, sender) {
    const lmEl = this.getLayersEl(this.getRowEl(editor));
    lmEl.style.display = 'none';
  },
});
editor.Commands.add('show-styles', {
  getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
  getStyleEl(row) { return row.querySelector('.styles-container') },

  run(editor, sender) {
    const smEl = this.getStyleEl(this.getRowEl(editor));
    smEl.style.display = '';
  },
  stop(editor, sender) {
    const smEl = this.getStyleEl(this.getRowEl(editor));
    smEl.style.display = 'none';
  },
});    
editor.Commands.add("show-blocks", {
  getRowEl: editor => editor.getContainer().closest(".editor-row"),
  getBlocksEl: editor => editor.querySelector(".blocks-container"),
  run(editor, sender) {
    this.getBlocksEl(this.getRowEl(editor)).style.display = "";
  },
  stop(editor, sender) {
    this.getBlocksEl(this.getRowEl(editor)).style.display = "none";
  }
});

// End Define commands ===//

//=== Device manager commands ===//
editor.Commands.add('set-device-desktop', {
  run: editor => editor.setDevice('Desktop')
});
editor.Commands.add('set-device-mobile', {
  run: editor => editor.setDevice('Mobile')
});

// Traits manager commands
editor.Commands.add('show-traits', {
  getTraitsEl(editor) {
    const row = editor.getContainer().closest('.editor-row');
    return row.querySelector('.traits-container');
  },
  run(editor, sender) {
    this.getTraitsEl(editor).style.display = '';
  },
  stop(editor, sender) {
    this.getTraitsEl(editor).style.display = 'none';
  },
});

//=== Save/Open/export feature
// Save
async function saveToLocal(editor, saveAs = false) {
if (!currentFileName || saveAs) {
    saveWithDialog(editor);
} else {
    try {
        const handle = await window.showDirectoryPicker();
        const fileHandle = await handle.getFileHandle(currentFileName, { create: true });
        const writable = await fileHandle.createWritable();

        // Save components and assets together
        const data = {
            components: editor.getComponents(),
            assets: editor.AssetManager.getAll()
        };

        const json = JSON.stringify(data);
        await writable.write(json);
        await writable.close();
    } catch (error) {
        console.error('Error saving file:', error);
    }
}
}

function saveWithDialog(editor) {
// Save components and assets together
const data = {
    components: editor.getComponents(),
    assets: editor.AssetManager.getAll()
};

const json = JSON.stringify(data);
const blob = new Blob([json], { type: "application/json;charset=utf-8" });
const url = URL.createObjectURL(blob);
const link = document.createElement("a");
link.href = url;
link.download = "grapesjs-layout.json";
link.click();
currentFileName = link.download;
setTimeout(() => URL.revokeObjectURL(url), 0);
}

// Open
function openFromLocal(editor) {
const input = document.createElement("input");
input.type = "file";
input.accept = ".json";
input.onchange = (event) => {
    const file = event.target.files[0];
    if (file) {
        currentFileName = file.name;
        const reader = new FileReader();
        reader.onload = (event) => {
            const result = event.target.result;
            try {
                const data = JSON.parse(result);
                editor.setComponents(data.components);
                editor.AssetManager.add(data.assets);
            } catch (error) {
                alert("Invalid file format.");
            }
        };
        reader.readAsText(file);
    }
};
input.click();
}


// Buttons
const btnSave = document.getElementById("btn-save");
btnSave.addEventListener("click", () => saveToLocal(editor, false));

const btnSaveAs = document.getElementById("btn-save-as");
btnSaveAs.addEventListener("click", () => saveToLocal(editor, true));

const btnOpen = document.getElementById("btn-open");
btnOpen.addEventListener("click", () => openFromLocal(editor));
// ===

// === Export 
document.getElementById('btn-export').addEventListener('click', function () {
  const filename = 'exported.html';
  const htmlContent = editor.getHtml();
  const cssContent = editor.getCss();

  // Create a temporary div and set its innerHTML to htmlContent
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;

  // Find and remove the first body element
  const firstBody = tempDiv.querySelector('body');
  if (firstBody) {
    firstBody.remove();
  }

  // Use the updated innerHTML for the exported content
  const updatedHtmlContent = tempDiv.innerHTML;

  const content = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@pimaonline/pimaonline-themepack/dist/css/themes/cards/styles.css">
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js" defer></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@pimaonline/pimaonline-themepack/dist/js/scripts2.js" defer></script>
<title>Starter Template</title>
</head>
<body>
${updatedHtmlContent}
</body>
</html>
`;
  const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
});

