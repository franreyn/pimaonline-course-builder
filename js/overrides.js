const courseBody = document.querySelector("body");
const contentWrapper = document.querySelector("#content-wrapper");
const secondColumn = document.querySelector("#second-column");
const thirdColumn = document.querySelector("#third-column");
const columnWidget = document.querySelector("#column-widget");
const videoWrapper = document.querySelector("#video-wrapper");
const rolePres = document.querySelectorAll('[role="presentation"]');
const imageGallery = document.querySelector(".image-gallery");
const vocabListWidget = document.querySelector("dl.vocab-list");
const vocabTerms = document.querySelectorAll("dl.vocab-list dt");
const vocabDefs = document.querySelectorAll("dl.vocab-list dd");
const vocabCloseBtns = document.querySelectorAll("dl.vocab-list button");
const vocabLists = document.querySelectorAll("dl[class^='vocab-list']");
const mediaContainers = document.querySelectorAll(".media-container"); 
const tabsWidgets = document.querySelectorAll(".tabs");


// JS to add role and aria-label to content-wrapper, second-column, and third-column
const addAria = () => {
  contentWrapper.setAttribute("role", "main");
  if (secondColumn) {
    secondColumn.setAttribute("role", "region");
    secondColumn.setAttribute("aria-label", "Second column");
  }
  if (thirdColumn) {
    thirdColumn.setAttribute("role", "region");
    thirdColumn.setAttribute("aria-label", "Third column");
  }
};
addAria();

// Clean up HTML
const cleanMarkup = () => {
// Remove role="presentation" attr from any element that has it  
  if (rolePres) {
    rolePres.forEach((roleElem) => roleElem.removeAttribute("role"));
  }  
  // Set functino to remove atrributes from elements
  const discardAttributes = (element, ...attributes) => { 
    attributes.forEach((attribute) => element.removeAttribute(attribute)); 
  }
  // Remove attributes from tables
  const tableElems = document.querySelectorAll("table, thead, tbody, tr, th, td");
  tableElems.forEach((elem) => {
    discardAttributes(elem, "cellspacing", "cellpadding", "width", "style");
  });
};
cleanMarkup();

// Helper JS for Responsive Tables
const initResponsiveTables = () => {
  const tables = document.querySelectorAll(".display, .display-lg")
  for (let table = 0; table < tables.length; table++) {
    let headertext = [],
      headers = tables[table].querySelectorAll(".display table th, table.display th, .display-lg table th, table.display-lg th"),
      tablebody = tables[table].querySelector(".display table tbody, table.display tbody, .display-lg table tbody, table.display-lg tbody");
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

// This is called by anchor links via onlick="" in the HTML
//  Added because default anchor links don't work on all browsers using D2L
const jumpTo = (anchor) => {
  document.getElementById(anchor).scrollIntoView();
}  

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

// Vocab list widget
const callVocabList = () => {
  if (vocabCloseBtns) {
    for(let btn = 0; btn < vocabCloseBtns.length; btn++) {
      vocabCloseBtns[btn].addEventListener("click", () => {
        for(let node = 0; node < vocabLists[btn].children.length;node++) {
          if(vocabLists[btn].children[node].tagName == "DD") {
            vocabLists[btn].children[node].removeAttribute("style");
          }
          if(vocabLists[btn].children[node].tagName == "DT") {
            vocabLists[btn].children[node].removeAttribute("class");
          }
        }});    
    }
  }  
  for (let activeTerm = 0; activeTerm < vocabTerms.length; activeTerm++) {
    vocabTerms[activeTerm].addEventListener("click", function() {
      this.classList.toggle("active");
      let termPanel = this.nextElementSibling;
      if (termPanel.style.display === "block") { termPanel.removeAttribute("style"); } 
      else { termPanel.style.display = "block"; }
    });

    vocabTerms[activeTerm].addEventListener("keydown", function(e) {
      if(e.key === "Enter") {
      this.classList.toggle("active");
      let termPanel = this.nextElementSibling;
      if (termPanel.style.display === "block") { termPanel.removeAttribute("style"); } 
      else { termPanel.style.display = "block"; }
      }
    });
  }
}
if (vocabListWidget) {callVocabList();}

// Media Container
const addMediaContainersAria = () => {
  mediaContainers.forEach((eachContainer, index) => {
    // loopID: find the current index value, convert it to its letter equivalent, then convert to lowercase
    let loopId = String.fromCharCode(index + 65).toLowerCase();
    let mediaObject = eachContainer.querySelector(".media-object");
    let iframe = mediaObject.firstElementChild;
    let mediaInfo = mediaObject.nextElementSibling;  

    // If element DOES NOT have "aria-describedby" && it DOES have a sibling element.
    if (!iframe.hasAttribute("aria-describedby") && mediaInfo != null) {
      iframe.setAttribute("aria-describedby", `${loopId}`);
      mediaInfo.id = `${[loopId]}`;
    }
  });
}
if (mediaContainers) {addMediaContainersAria();}

//Tabs Widget
const callTabsWidget = () => {

  let tabsWidgetsNum = 0;

  tabsWidgets.forEach((tab,index) => {
    let tabInputs = tab.querySelectorAll("input")
    let tabLabels = tab.querySelectorAll("label")
    let tabDivs = tab.querySelectorAll("div")

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

// Toggle footnotes
const toggleBtns = document.querySelectorAll(".toggle-btn, .toggle-footnotes");

if (document.querySelector(".toggle-btn") || document.querySelector(".toggle-footnotes")) {
  for (let toggleBtn = 0; toggleBtn < toggleBtns.length; toggleBtn++) {
    // Add tabindex
    toggleBtns[toggleBtn].setAttribute("tabindex", "0");

    // Show/hide on click
    toggleBtns[toggleBtn].addEventListener("click", () => {      
      toggleBtns[toggleBtn].nextElementSibling.classList.toggle("show");      
    })

    // Show/hide on enter for users who use tab
    toggleBtns[toggleBtn].addEventListener("keydown", (enter) => {
      if (enter.keyCode === 13) {
        toggleBtns[toggleBtn].nextElementSibling.classList.toggle("show");
      }
    })
  }
}

// Change footnotes from 'show' to 'hide'
const footnotes = document.querySelector(".toggle-footnotes");

footnotes.addEventListener("click", () => {
  footnotes.innerHTML = (footnotes.innerHTML === "[Show Footnotes]") ? "[Hide Footnotes]" : "[Show Footnotes]";
})

// Animated border for HRS theme
const hrsBorders = document.querySelectorAll(".hrs-border");

if(hrsBorders) {
  for (let hrsBorder = 0; hrsBorder < hrsBorders.length; hrsBorder++) {
    const callAnimateBorder = new IntersectionObserver(entries => {
      // Loop over the entries
      entries.forEach(entry => {
        // If the element is visible
        if (entry.isIntersecting) {
          // Add the animation class
          entry.target.classList.add('animate-border');
        }
      });
    });
    callAnimateBorder.observe(hrsBorders[hrsBorder]);
  }
};

// Call function with jQuery scripts
const callJquery = () => {
  // Toggle Button's Arrow Right Points Down on Click
  $('.arrow-right').on('click', function () {
    $(this).toggleClass('arrow-down');
  });
  // TOOLTIP
  //  Allows Screen readers to toggle a tooltip on click and to say if the tooltip is collapsed or expanded.
  $(".tooltip").click(function () {
    $(this).children(".tip-hover").toggle();
    if ($(this).children(".tip-hover").is(':visible')) {
      $(this).attr('aria-expanded', 'true');
      $(this).removeClass('hidden');
    } else {
      $(this).attr('aria-expanded', 'false');
      $(this).addClass('hidden');
    }
  });
  let start = 999;
  $('.tooltip').each(function (i) {
    $(this).css('z-index', start--);
  });
  $(".tooltip .video-container").parent().css("width", "450px");
}
callJquery();