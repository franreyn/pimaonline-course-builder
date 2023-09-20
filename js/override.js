// This JS file is for JS that runs only within the editor for widgets that require JS

const imageGallery = document.querySelector(".image-gallery");

// Image gallery
const callImageGallery = () => {
  // Create link element with font-awesome cdn and append it to the <head>
  const docHead = document.querySelector("head");
  const fontAwesomeCdn = document.createElement("link");
  fontAwesomeCdn.setAttribute("rel", "stylesheet");
  fontAwesomeCdn.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css");
  docHead.appendChild(fontAwesomeCdn);
  // Begin image gallery
  const imgGalleries = document.querySelectorAll(".image-gallery"),
    modalBoxContent = `<div class="modal-box invisible">
        <div class="gallery-overlay"></div>
        <figure class="modal-box--image"><i class="fa-solid fa-x close-img"></i> <img src="#" alt="image here" /><figcaption class="img-caption"></figcaption></figure>
        </div>
        <button class="hide-gallery">Hide</button>`;

  for (let imgGallery = 0; imgGallery < imgGalleries.length; imgGallery++) {
    imgGalleries[imgGallery].insertAdjacentHTML("afterbegin", modalBoxContent);
  }
}
if (imageGallery) {
  callImageGallery();
}

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