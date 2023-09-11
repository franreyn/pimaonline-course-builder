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