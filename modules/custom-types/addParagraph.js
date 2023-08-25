export function addParagraph(editor) {
  editor.DomComponents.addType("paragraph", {
    model: {
      defaults: {
        tagName: "p",
        components: [
          {
            type: "text",
            content: "Add text",
          },
        ],        
      },
    },
    // view: {
    //   onRender() {
    //     this.el.setAttribute("contenteditable", "true");
    //   },
    // },
  });
  
}