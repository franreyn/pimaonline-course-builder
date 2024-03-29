import { addOneColumnLayout } from "./custom-types/addOneColumnLayout.js";
import { addTwoColumnLayout } from "./custom-types/addTwoColumnLayout.js";
import { addThreeSectionLayout } from "./custom-types/addThreeSectionLayout.js";
import { addHeader } from "./custom-types/addHeader.js";
import { addBannerImage } from "./custom-types/addBannerImage.js";
import { addTextContainer } from "./custom-types/addTextContainer.js";
import { addContentWrapper } from "./custom-types/addContentWrapper.js";
import { addSecondColumn } from "./custom-types/addSecondColumn.js";
import { addContentBody, addContentBodyButton } from "./custom-types/addContentBody.js";
import { addCardBody, addCardHorizontal, addCardImg } from "./custom-types/addCardHorizontal.js";
import { addSideBySide, addSideBySideItem } from "./custom-types/addSideBySide.js";
import { addVocabButton, addVocabulary, addVocabularyWrapper } from "./custom-types/addVocabulary.js";
import { addAssignments, addAssignment, addAssignmentBtn } from "./custom-types/addAssignments.js";
import { addBlockquote } from "./custom-types/addBlockquote.js";
import { addRawImage } from "./custom-types/addRawImage.js";
import { addFigcaption, addFigure, addFigureCaption } from "./custom-types/addImage.js";
import { addButton } from "./custom-types/addButton.js";
import { addHyperlinks } from "./custom-types/addHyperlinks.js";
import { addPanoptoDisplay, addPanoptoCaption, addPanoptoIframe, addPanoptoInfo, addPanoptoObject } from "./custom-types/addPanoptoContainer.js";
import { addYoutubeCaption, addYoutubeContainer, addYoutubeIframe, addYoutubeInfo, addYoutubeObject } from "./custom-types/addYoutubeContainer.js";
import { addDescriptionDefinition, addDescriptionList, addDescriptionTerm, addDescriptionButton } from "./custom-types/addDescriptionList.js";
import { addH1, addH2, addH3, addH4, addH5, addH6 } from "./custom-types/addHeadings.js";
import { addParagraph } from "./custom-types/addParagraph.js";
import { addCallOut } from "./custom-types/addCallOut.js"
import { addHorizontalDisplay } from "./custom-types/addHorziontalDisplay.js";
import { addFooter, addFooterInfo, addFootnotes, addToggleFootnotes } from "./custom-types/addFooter.js";
import { addThirdColumn } from "./custom-types/addThirdColumn.js";
import { addTable, addThead, addTheadTr, addTh, addTbody, addTd, addTbodyTr } from "./custom-types/addTable.js";
import { addVocabCardButton, addVocabCards, addVocabItem } from "./custom-types/addVocabCards.js";
import { addH5pCaption, addH5pContainer, addH5pIframe, addH5pInfo, addH5pObject } from "./custom-types/addh5p.js";
import { addBorder } from "./custom-types/addBorder.js";
import { addScript } from "./custom-types/addScript.js";
import { addPlaypositIframe , addPlaypositCaption, addPlaypositContainer, addPlaypositInfo, addPlaypositObject } from "./custom-types/addPlayPosit.js";
import { addGalleryWrapper, addImageBox, addImageButton, addImageGallery, addStaticImage } from "./custom-types/addImageGallery.js";
import { addAccordion, addAccordionItem, addAccordionContent, addAccordionTitle, addAccordionButton } from "./custom-types/addAccordion.js";
import { addColItem, addColumns, addColumnsButton } from "./custom-types/addColumns.js";
import { addTabHide, addTabButton, addTabHeader, addTabs, addTabInput, addTabPanel } from "./custom-types/addTabs.js";

export function addCustomTypes(editor) {
  const allWidgets = [
		"accordion-title",
		"accordion-content",
    "assignment", 
    "blockquote",
    "border", 
		"call-out",
    "card-body", 
		"col-item",
    "content-body",
		"footer",
		"footnotes",
		"toggle-footnotes",
		"footer-info",
    "side-by-side-item", 
		"tab-panel",
		"text-container",
  ]

	// Prevent addition of component if it's not being added to parent component.
	function restrictParentComponent(type, validParents, validGrandParents) {
    editor.on("component:mount", (component) => {
        if (component.get("type") === type) {
            let currentParentType = component.parent().get("type");
            let currentGrandParentType = component.parent().parent() ? component.parent().parent().get("type") : null;

            if (type === "columns") {
                if (!validParents.includes(currentParentType) || (currentGrandParentType && !validGrandParents.includes(currentGrandParentType))) {
                    if (component.previousParent) {
                        component.previousParent.append(component);
                    } else {
                        component.remove();
                    }
                } else {
                    component.previousParent = component.parent();
                }
            } else {
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
        }
    });
	}

	// Add Scripts2.js
	addScript(editor);
	restrictParentComponent("script", ["wrapper"]);

	// One column component
  addOneColumnLayout(editor);
	restrictParentComponent("one-column-layout", ["wrapper"]);

	// Two column components
  addTwoColumnLayout(editor);
	restrictParentComponent("two-column-layout", ["wrapper"]);

	// Three section component
  addThreeSectionLayout(editor);
	restrictParentComponent("three-section-layout", ["wrapper"]);

	// Header
  addHeader(editor);

	// Banner image
  addBannerImage(editor);
  restrictParentComponent("banner-image", ["header"]);

	// Text container
  addTextContainer(editor);

	// Content wrapper
  addContentWrapper(editor);

	// Second column
  addSecondColumn(editor);

	// Third column
	addThirdColumn(editor);

	// Content-body
  addContentBody(editor);
	restrictParentComponent("content-body", ["content-wrapper", "second-column", "third-column"]);

	//Content Body Button
	addContentBodyButton(editor);
	// restrictParentComponent("add-content-body-btn", ["content-wrapper", "second-column", "third-column"])

	// Border widget
  addBorder(editor);
	restrictParentComponent("border", ["content-body"]);

	//Call Out
	addCallOut(editor);
	restrictParentComponent("call-out", ["content-body"]);

	// Card Horizontal
  addCardHorizontal(editor);  
	restrictParentComponent("card-horizontal", ["content-body"]);

	// card body
  addCardBody(editor);
	restrictParentComponent("card-body", ["card-horizontal"]);

  addCardImg(editor);
	restrictParentComponent("card-img", ["card-horizontal"]);

	// Footnotes
	addFooter(editor);

	addFooterInfo(editor);
	restrictParentComponent("footer-info", ["footer"]);

	addFootnotes(editor);
	restrictParentComponent("footnotes", ["footer-info"]);

	addToggleFootnotes(editor);
	restrictParentComponent("toggle-footnotes", ["footer-info"]);

	// Side-by-side Widget
  addSideBySide(editor);
	restrictParentComponent("side-by-side", ["content-body"]);

	// Side-by-side Item
  addSideBySideItem(editor);
	restrictParentComponent("side-by-side-item", ["side-by-side"]);

	// Vocab cards
	addVocabCards(editor);
	restrictParentComponent("vocab-cards", ["content-body"]);

	// Vocab item
	addVocabItem(editor);
	restrictParentComponent("vocab-item", ["vocab-cards"]);

	// add vocab btn
	addVocabCardButton(editor);
	restrictParentComponent("add-vocab-card-btn", ["vocab-cards"]);

	// Vocabulary widget
  addVocabulary(editor);
	restrictParentComponent("vocab-list", ["content-body"]);

	// Vocab item
	addVocabularyWrapper(editor);
	restrictParentComponent("vocab-wrapper", ["vocab-list"]);

	// Add vocab btn
	addVocabButton(editor);
	restrictParentComponent("add-vocab-btn", ["vocab-list"]);

	// Assignments Widget
  addAssignments(editor);
	restrictParentComponent("assignments-widget", ["content-body"]);
  
	// Assignment
  addAssignment(editor);
	restrictParentComponent("assignment", ["assignments-widget"]);

	// Add assignment button
	addAssignmentBtn(editor);
	// restrictParentComponent("add-assignment-btn", ["assignment"]);

	// Blockquote
  addBlockquote(editor);
	restrictParentComponent("blockquote", ["content-body"]);

	// Raw image - Not a sole component, only used to build other components
  addRawImage(editor);

	// Horizontal Display
	addHorizontalDisplay(editor);
	restrictParentComponent("horizontal-display", ["content-body"]);

	// Image no caption
  addFigure(editor);
	restrictParentComponent("figure", allWidgets);

	// Image with caption
  addFigureCaption(editor);
	restrictParentComponent("figure-caption", ["content-body"]);

	// Figcaption
  addFigcaption(editor);
	// restrictParentComponent('figcaption', ['figure-caption']);

	// Buttons
  addButton(editor);
	restrictParentComponent("button", ["assignment", "blockquote", "border", "card-body", "content-body", "side-by-side-item"]);

	// Hyperlinks
  addHyperlinks(editor);
	restrictParentComponent("hyperlink", ["assignment", "blockquote", "border", "card-body", "content-body", "side-by-side-item"]);

	//////////////////////////// Panopto container ////////////////////////////
	//Media object
  addPanoptoDisplay(editor);
	restrictParentComponent("panopto-container", ["content-body"]);

	// Media object
  addPanoptoObject(editor);
	restrictParentComponent("panopto-object", ["panopto-container"]);

	// Media info
  addPanoptoInfo(editor);
	restrictParentComponent("panopto-info", ["panopto-container"]);

	// media caption
  addPanoptoCaption(editor);
	restrictParentComponent("panopto-caption", ["panopto-info"]);

	// Panopto Iframe
  addPanoptoIframe(editor);
	restrictParentComponent("panopto-iframe", ["panopto-object"]);
	//////////////////////////// end panopto container ////////////////////////////

		//////////////////////////// Playposit container ////////////////////////////
	//Media object
  addPlaypositContainer(editor);
	restrictParentComponent("playposit-container", ["content-body"]);

	// Media object
  addPlaypositObject(editor);
	restrictParentComponent("playposit-object", ["playposit-container"]);

	// Media info
  addPlaypositInfo(editor);
	restrictParentComponent("playposit-info", ["playposit-container"]);

	// media caption
  addPlaypositCaption(editor);
	restrictParentComponent("playposit-caption", ["playposit-info"]);

	// Playposit Iframe
  addPlaypositIframe(editor);
	restrictParentComponent("playposit-iframe", ["playposit-object"]);
	//////////////////////////// end playposit container ////////////////////////////

	//////////////////////////// Youtube container ////////////////////////////
	//Media object
	addYoutubeContainer(editor);
	restrictParentComponent("youtube-container", ["content-body"]);

	// Media object
	addYoutubeObject(editor);
	restrictParentComponent("youtube-object", ["youtube-container"]);

	// Media info
	addYoutubeInfo(editor);
	restrictParentComponent("youtube-info", ["youtube-container"]);

	// media caption
	addYoutubeCaption(editor);
	restrictParentComponent("youtube-caption", ["youtube-info"]);

	// youtube Iframe
	addYoutubeIframe(editor);
	restrictParentComponent("youtube-iframe", ["youtube-object"]);
	//////////////////////////// end youtube container ////////////////////////////

	// Description Lists
	addDescriptionList(editor);
	restrictParentComponent("dl", ["content-body"]);

	// Term
	addDescriptionTerm(editor);
	restrictParentComponent("dt", ["dl", "vocab-item", "vocab-wrapper"]);

	// Definition
	addDescriptionDefinition(editor);
	restrictParentComponent("dd", ["dl", "vocab-item", "vocab-wrapper"]);

	// Add Definition Button
	addDescriptionButton(editor);
	restrictParentComponent("add-dl-btn", ["dl"]);

	// Heading 1
	addH1(editor);
	restrictParentComponent("h1", ["text-container"]);

	// Heading 2
	addH2(editor);
	restrictParentComponent("h2", ["assignment", "accordion-content", "blockquote", "border", "card-body", "content-body", "side-by-side-item"]);

	// Heading 3
	addH3(editor);
	restrictParentComponent("h3", ["accordion-title", "accordion-content", "assignment", "blockquote", "border", "card-body", "col-item", "content-body", "side-by-side-item", "tab-panel"]);

	// Heading 4
	addH4(editor);
	restrictParentComponent("h4", ["assignment", "accordion-content", "blockquote", "border", "card-body", "content-body", "side-by-side-item", "tab-panel"]);

	// Heading 5
	addH5(editor);
	restrictParentComponent("h5", ["assignment", "accordion-content", "blockquote", "border", "card-body", "content-body", "side-by-side-item", "tab-panel"]);

	// Heading 6
	addH6(editor);
	restrictParentComponent("h6", ["assignment", "accordion-content", "blockquote", "border", "card-body", "content-body", "side-by-side-item", "tab-panel"]);

//////////////////////////// H5P container ////////////////////////////

	// H5P 
	addH5pContainer(editor);
	restrictParentComponent("h5p-container", ["content-body"]);

	// H5P object
	addH5pObject(editor);
	restrictParentComponent("h5p-object", ["h5p-container"]);

	// H5P info
	addH5pInfo(editor);
	restrictParentComponent("h5p-info", ["h5p-container"]);

	// H5P caption
	addH5pCaption(editor);
	restrictParentComponent("h5p-caption", ["h5p-info"]);

	// H5P Iframe
	addH5pIframe(editor);
	restrictParentComponent("h5p-iframe", ["h5p-object"]);

	//////////////////////////// end youtube container ////////////////////////////

	// Paragraph
	addParagraph(editor);
	restrictParentComponent("paragraph", allWidgets);

	//////////////////////////// Tabs ////////////////////////////
	addTabs(editor);
	restrictParentComponent("tabs", ["content-body"]);

	addTabButton(editor);
	restrictParentComponent("add-tab-btn", ["tabs"]);

	addTabHeader(editor);

	addTabHide(editor);
	restrictParentComponent("tab-hide", ["tabs"])

	addTabInput(editor);
	restrictParentComponent("tab-input", ["tabs"]);

	addTabPanel(editor);
	restrictParentComponent("tab-panel", ["tabs"]);

		//////////////////////////// end tabs ////////////////////////////

	////////////// Table ///////////////

	// Table
	addTable(editor);
	restrictParentComponent("table", ["content-body"]);

	// thead
	addThead(editor);
	restrictParentComponent("thead", ["table"]);

	// tr
	addTheadTr(editor);
	restrictParentComponent("thead-tr", ["thead"]);

	// th
	addTh(editor);
	restrictParentComponent("th", ["thead-tr"]);

	// tbody
	addTbody(editor);
	restrictParentComponent("tbody", ["table"]);

	// tr nested in tbody
	addTbodyTr(editor);
	restrictParentComponent("tbody-tr", ["tbody"]);

	// td
	addTd(editor);
	restrictParentComponent("td", ["tbody-tr"]);

	////////////// Image gallery /////////////

	addImageGallery(editor);
	restrictParentComponent("image-gallery", ["content-body"]);

	addGalleryWrapper(editor);
	restrictParentComponent("gallery-wrapper", ["image-gallery"]);

	addImageBox(editor);
	restrictParentComponent("image-box", ["gallery-wrapper"]);

	addStaticImage(editor);
	restrictParentComponent("static-image", ["image-box"]);

	addImageButton(editor);
	restrictParentComponent("add-img-btn", ["gallery-wrapper"]);

	////////////// Accordion ///////////////

	addAccordion(editor);
	restrictParentComponent("accordion", ["content-body"]);

	addAccordionItem(editor);
	restrictParentComponent("accordion-item", ["accordion"]);

	addAccordionTitle(editor);
	restrictParentComponent("accordion-title", ["accordion-item"]);

	addAccordionContent(editor);
	restrictParentComponent("accordion-content", ["accordion-item"]);

	addAccordionButton(editor);
	restrictParentComponent("add-accordion-btn", ["accordion"]);

	///////////// Columns //////////////////

	addColumns(editor);
	restrictParentComponent("columns", ["content-body"], ["content-wrapper", "third-column"]);

	addColItem(editor);
	restrictParentComponent("col-item", ["columns"]);

	addColumnsButton(editor);
	restrictParentComponent("add-col-item-btn", ["columns"]);

	// ======= END COMPONENTS ======
	// ...
}
