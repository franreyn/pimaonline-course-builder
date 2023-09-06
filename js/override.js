// This JS file is for JS that runs only within the editor for widgets that require JS

const imageGallery = document.querySelector(".image-gallery");
const tabsWidgets = document.querySelectorAll(".tabs");

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
    imgBoxes = document.querySelectorAll(".image-box"),
    modalBoxContent = `<div class="modal-box invisible">
        <div class="gallery-overlay"></div>
        <figure class="modal-box--image"><i class="fa-solid fa-x close-img"></i> <img src="#" alt="image here" /><figcaption class="img-caption"></figcaption></figure>
        </div>
        <button class="hide-gallery">Hide</button>`;

  //  createModalBox.innerHTML = modalBoxContent;
  for (let imgGallery = 0; imgGallery < imgGalleries.length; imgGallery++) {
    imgGalleries[imgGallery].insertAdjacentHTML("afterbegin", modalBoxContent);
  }

  if (document.querySelector(".modal-box")) {
    const overlay = document.querySelector(".gallery-overlay"),
      modalBox = document.querySelector(".modal-box"),
      modalImg = document.querySelector(".modal-box--image img"),
      modalCaption = document.querySelector(".img-caption"),
      closeImg = document.querySelector(".close-img");

    for (let imgBox = 0; imgBox < imgBoxes.length; imgBox++) {
      imgBoxes[imgBox].onclick = function () {
        modalBox.classList.remove("invisible");
        let imgSrc = this.querySelector("img").src;
        modalImg.src = imgSrc;
        let imgCaption = this.querySelector("img").alt;
        modalCaption.innerHTML = imgCaption;
      }

      // Make images tab-able
      imgBoxes[imgBox].setAttribute("tabindex", "0");
      imgBoxes[imgBox].addEventListener("keydown", function (enter) {
        if (enter.key === "Enter") {
          modalBox.classList.remove("invisible");
          let imgSrc = this.querySelector("img").src;
          modalImg.src = imgSrc;
          let imgCaption = this.querySelector("img").alt;
          modalCaption.innerHTML = imgCaption;
        }
      })
    }
    overlay.onclick = () => {
      modalBox.classList.add("invisible");
    }
    window.onkeydown = (esc) => {
      if (esc.keyCode === 27) {
        modalBox.classList.add("invisible");
      }
    }

    closeImg.onclick = () => {
      modalBox.classList.add("invisible");
    }
    const hideGalleries = document.querySelectorAll(".hide-gallery");
    for (let hideGallery = 0; hideGallery < hideGalleries.length; hideGallery++) {
      hideGalleries[hideGallery].addEventListener("click", () => {
        hideGalleries[hideGallery].nextElementSibling.classList.toggle("invisible");
        if (hideGalleries[hideGallery].innerHTML === "Hide") {
          hideGalleries[hideGallery].innerHTML = "Show";
        } else {
          hideGalleries[hideGallery].innerHTML = "Hide";
        }
      });
    }
  };
}
if (imageGallery) {
  callImageGallery();
}

//Tabs Widget
const callTabsWidget = () => {

  let tabsWidgetsNum = 0;

  console.log(tabsWidgets)

  tabsWidgets.forEach((tab,index) => {

    let tabInputs = tab.querySelectorAll("input")
    let tabLabels = tab.querySelectorAll("label")
    let tabDivs = tab.querySelectorAll("div.tab-panel")

    let groupNum = index + 1;

    //Add region and aria-label to parent div      
    tab.setAttribute("role", "region");
    tab.setAttribute("aria-label", `tab group ${groupNum}`)

    for(tabIndex = 0; tabIndex < tabInputs.length; tabIndex++) {

      let tabNum = tabsWidgetsNum + 1;


      //Add class, id, name, and aria-described by for inputs
      tabInputs[tabIndex].classList.add("tab-input");
      tabInputs[tabIndex].setAttribute("type", "radio")
      tabInputs[tabIndex].setAttribute("id", `tab${tabNum}`);
      tabInputs[tabIndex].setAttribute("name", `hint-group-${groupNum}` )
      tabInputs[tabIndex].setAttribute("aria-describedby", `tabHeading${tabNum}`)
      //Add class and for for labels
      tabLabels[tabIndex].classList.add("tab-header");
      tabLabels[tabIndex].setAttribute("for", `tab${tabNum}`)
      //Add class, tabindex, and id for divs
      tabDivs[tabIndex].classList.add("tab-panel")
      tabDivs[tabIndex].setAttribute("tabindex", 0)
      tabDivs[tabIndex].setAttribute("id", `tabHeading${tabNum}`)
      //Add attributes for hide tab
      if(tabIndex + 1 == tabInputs.length) {
        tabLabels[tabIndex].classList.add("hide-tab")
        tabInputs[tabIndex].checked = true;
        tabDivs[tabIndex].classList.add("hide-panel")
      }
      tabsWidgetsNum++;
    }
  })
}
if (tabsWidgets) {callTabsWidget();}