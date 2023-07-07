export function initEditor() {
  return grapesjs.init({
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
        {
          id: 'panopto',
          category: 'Content',
          label: 'Panopto Video',
          content: {type: 'panopto-container'},
        },
        {
          id: 'youtube',
          category: 'Content',
          label: 'Youtube Video',
          content: {type: 'youtube-container'},
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
}