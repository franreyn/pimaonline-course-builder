// This JS file is for JS that runs only within the editor for widgets that require JS

// To ensure this only runs when specific components are added to the editor, add the type to the requires JS array in config.js

const initResponsiveTables = () => {
  const tables = document.querySelectorAll(".display-lg")
  for (let table = 0; table < tables.length; table++) {
      let headertext = [],
      headers = tables[table].querySelectorAll(".display-lg table th, table.display-lg th"),
      tablebody = tables[table].querySelector(".display-lg table tbody, table.display-lg tbody");

      for (let header = 0; header < headers.length; header++) {
          let current = headers[header];
          headertext.push(current.textContent.replace(/\r?\n|\r/, ""));
      }
      for (let y = 0, row; row = tablebody.rows[y]; y++) {
          for (let j = 0, col; col = row.cells[j]; j++) {
              col.setAttribute("data-th", headertext[j]);
          }
      }
  }
}
initResponsiveTables();