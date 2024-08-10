import { PillowcaseModel } from "./model.js";
import { PillowcaseView } from "./view.js";

//stay in controller
//// AZURE
import azureMain from "../images/click-right-pillow-bar/Azure/azure-queen-zippered-pillowcase.webp";
import azureSecondary from "../images/click-right-pillow-bar/Azure/SLIP_S24_PC_QUEEN_AZUREBLUE_SHOT3.webp";
import azureTertiary from "../images/click-right-pillow-bar/Azure/SLIP_S24_PC_QUEEN_AZUREBLUE_SHOT4.webp";
//// WHITE NORMAL
import whiteQueenPrimary from "../images/click-right-pillow-bar/white-queen/white-queen-sippered-pillowcase-2.webp";
import whiteQueenSecondary from "../images/click-right-pillow-bar/white-queen/SLIP_PC_QUEEN_White_SHOTB.webp";
import whiteQueenTertiary from "../images/click-right-pillow-bar/white-queen/PCwhite2_5e6ca63c-6594-49d4-8bae-80b89a788ed1.webp";
//// WHITE FANCY
import whiteFancyPrimary from "../images/click-right-pillow-bar/white-queen-nice/white-queen-zippered-pillowcase.webp";
import whiteFancySecondary from "../images/click-right-pillow-bar/white-queen-nice/SLIP_PCQUEEN_A_SHOT3.webp";
import whiteFancyTertiary from "../images/click-right-pillow-bar/white-queen-nice/SLIP_PCQUEEN_A_SHOT4.webp";
//// SEASHELL
import seashellPrimary from "../images/click-right-pillow-bar/seashell/seashell-queen-zippered-pillowcase.webp";
import seashellSecondary from "../images/click-right-pillow-bar/seashell/SLIP_S24_PC_QUEEN_SEASHELL_SHOT3.webp";
import seashellTertiary from "../images/click-right-pillow-bar/seashell/SLIP_S24_PC_QUEEN_SEASHELL_SHOT4.webp";
//// SEABREEZE
import seabreezePrimary from "../images/click-right-pillow-bar/seabreeze/seabreeze-queen-zippered-pillowcase.webp";
import seabreezeSecondary from "../images/click-right-pillow-bar/seabreeze/SLIP_S24_PC_QUEEN_SEABREEZE_SHOT3.webp";
import seabreezeTertiary from "../images/click-right-pillow-bar/seabreeze/SLIP_S24_PC_QUEEN_SEABREEZE_SHOT4.webp";
///// PINK
import pinkPrimary from "../images/click-right-pillow-bar/pink-queen/pink-queen-zippered-pillowcase.webp";
import pinkSecondary from "../images/click-right-pillow-bar/pink-queen/SLIP_PC_QUEEN_Pink_SHOTB.webp";
import pinkTertiary from "../images/click-right-pillow-bar/pink-queen/SLIP_PC_QUEEN_Pink_SHOTC.webp";
//// CORAL
import coralPrimary from "../images/click-right-pillow-bar/coral/coral-queen-zippered-pillowcase.webp";
import coralSecondary from "../images/click-right-pillow-bar/coral/SLIP_S24_PC_QUEEN_CORALSUNSET_SHOT3.webp";
import coralTertiary from "../images/click-right-pillow-bar/coral/SLIP_S24_PC_QUEEN_CORALSUNSET_SHOT4.webp";
//// PETAL
import petalPrimary from "../images/click-right-pillow-bar/petal-queen/petal-queen-zippered-pillowcase.webp";
import petalSecondary from "../images/click-right-pillow-bar/petal-queen/SLIP_PCQUEEN_PETAL_FL2.webp";
import petalTertiary from "../images/click-right-pillow-bar/petal-queen/SLIP_PCQUEEN_PETAL_FL3.webp";

const currencyBtn = document.querySelector(
  ".currency-btn"
);
const pageNav =
  document.querySelector(".page-nav");
const pageNavLinks = [
  document.querySelector(".page-nav-newArrivals"),
  document.querySelector(".page-nav-shop"),
  document.querySelector(".page-nav-benefits"),
  document.querySelector(".page-nav-press"),
];
const newArrivalsList = document.querySelector(
  ".hidden-newArrivals-list"
);
const shopList = document.querySelector(
  ".hidden-shop-list"
);
const benefitsList = document.querySelector(
  ".hidden-benefits-list"
);
const pressList = document.querySelector(
  ".hidden-press-list"
);

const carouselContainer = document.querySelector(
  ".sliderAnouncement"
);
const anouncements = document.querySelectorAll(
  ".anouncements-text"
);

const hero1Container = document.querySelector(
  ".hero1-image-container"
);
const hero1Images = document.querySelectorAll(
  ".hero1-image"
);

const stickyAnchor = document.getElementById(
  "sticky-anchor"
);
const header = document.querySelector("header");
const placeholder = document.querySelector(
  ".placeholder"
);

const xScroll =
  document.querySelector(".xScroll-1");
const xScrollContainer = document.querySelector(
  ".xScroll-1-container"
);
const mainContainer = document.querySelector(
  ".main-container"
);

//cycling through advertisements
/*<script>
    document.addEventListener('DOMContentLoaded', () => {
      const sliderAnouncement = document.querySelector('.sliderAnouncement');
      const sliderContainer = document.querySelector('.slider-container');
      const containerWidth = sliderContainer.offsetWidth;
      const itemWidth = sliderAnouncement.firstElementChild.offsetWidth;

      // Center the first item initially
      const initialOffset = (containerWidth - itemWidth) / 2;
      sliderAnouncement.style.transform = `translateX(${initialOffset}px)`;
    });
  </script>
  */

//the sticky nav
//////////////////////////////////////////////////////

//view
if (stickyAnchor && header && placeholder) {
  // Check if elements are found
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          header.classList.remove("sticky");
          placeholder.style.display = "none";
          placeholder.style.height = "0";
        } else {
          header.classList.add("sticky");
          placeholder.style.display = "block";
          placeholder.style.height = `80px`;
        }
      });
    },
    {
      threshold: [0],
    }
  );
  observer.observe(stickyAnchor);
} else {
  console.error(
    "Sticky anchor, navigation, or placeholder element not found."
  );
}

//carousel anouncement bar
//////////////////////////////////////////////////////

//does this even have  any affect? if so how, becaseu my run() function does not
//get called
//view
let idxAnouncement = 0;
let intervalAnouncement = setInterval(run, 6000);

function run() {
  idxAnouncement++;

  changeAnouncement();
}

function changeAnouncement() {
  if (idxAnouncement > anouncements.length - 1) {
    idxAnouncement = 0;
  } else if (idxAnouncement < 0) {
    idxAnouncement = anouncements.length - 1;
  }

  carouselContainer.style.transform = `translateX(${
    -idxAnouncement * 1430
  }px)`;
}

//carousel hero
//////////////////////////////////////////////////////
//view
hero1Container.addEventListener("wheel", (e) => {
  if (e.deltaX !== 0) {
    e.preventDefault();
  }
});

let idxHero1 = 0;
let invervalHero = setInterval(runHero, 5000);

function runHero() {
  idxHero1++;

  changeHero();
}

function changeHero() {
  if (idxHero1 > hero1Images.length - 1) {
    idxHero1 = 0;
  } else if (idxHero1 < 0) {
    idxHero1 = hero1Images.length - 1;
  }

  hero1Container.style.transform = `translateX(${
    -idxHero1 * 100
  }vw)`;
}

//dropdown menu
//////////////////////////////////////////////////////
//view
currencyBtn.addEventListener(
  "click",
  function () {
    //could make this a function
    let activeList = document.querySelector(
      ".active-list"
    );

    if (!activeList) {
      const markup = `
                        <div class="active-list">
                            <a href="#">Australia $ AUD</a>
                            <a href="#">United States $ USD</a>
                            <a href="#">United Kingdom £ GBP</a>
                            <a href="#">Europe € EUR</a>
                            <a href="#">Canada $ CAD</a>
                        </div>
                        `;
      currencyBtn.insertAdjacentHTML(
        "afterbegin",
        markup
      );
    } else activeList.remove();
  }
);

// drop down menus on hover
//////////////////////////////////////////////////////
//view?
const hiddenListsArray = [
  newArrivalsList,
  shopList,
  benefitsList,
  pressList,
];

pageNavLinks.forEach((navItem, index) => {
  const hiddenList = hiddenListsArray[index];

  //functions for controller
  const showList = () => {
    hiddenList.classList.remove("hidden");
  };

  const hideList = () => {
    setTimeout(() => {
      if (
        !hiddenList.matches(":hover") &&
        !navItem.matches(":hover")
      ) {
        hiddenList.classList.add("hidden");
      }
    }, 1000);
  };

  // Event Listeners in view, but referencing handler in controller
  navItem.addEventListener(
    "mouseenter",
    showList
  );
  navItem.addEventListener(
    "mouseleave",
    hideList
  );

  hiddenList.addEventListener(
    "mouseenter",
    showList
  );
  hiddenList.addEventListener(
    "mouseleave",
    hideList
  );
});

//stopping scroll past page
///////////////////////////////////////////////////
//create functions for if clauses in here, and then rest goes into view
let lastItemEnd = 0;

function updateScrollLimits() {
  // Get the last child element
  const lastChild =
    xScrollContainer.children[
      xScrollContainer.children.length - 1
    ];

  // Calculate the end position of the last element
  lastItemEnd =
    lastChild.offsetLeft + lastChild.offsetWidth;
}

[xScroll, mainContainer].forEach((el) => {
  el.addEventListener("scroll", () => {
    // Check if scrolling beyond the limits and adjust the scroll position if needed
    if (el.scrollLeft < 0) {
      el.scrollLeft = 0; // Prevent scrolling left beyond the start
    } else if (
      el.scrollLeft >
      lastItemEnd - el.clientWidth
    ) {
      el.scrollLeft =
        lastItemEnd - el.clientWidth; // Prevent scrolling right beyond the end
    }
  });
});
updateScrollLimits();
//switching pillowcase images on button click
///////////////////////////////////////////////////

class PillowcaseController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.on(
      "buttonClick",
      this.handleButtonClick.bind(this)
    );
  }

  handleButtonClick({ button, containerKey }) {
    const color = button.dataset.color;
    const imageSrcs =
      this.model.getImagesByColor(color);
    const imageEls =
      this.view.getImageElements(containerKey);

    if (imageSrcs.length > 0) {
      this.view.updateImages(imageEls, imageSrcs);
    }

    const previousButton =
      this.model.getSelectedButton(containerKey);
    if (
      previousButton &&
      previousButton !== button
    ) {
      this.view.toggleButtonBorder(
        previousButton,
        false
      );
    }

    this.view.toggleButtonBorder(
      button,
      !button.classList.contains(
        "color-div-border"
      )
    );
    this.model.setSelectedButton(
      containerKey,
      button.classList.contains(
        "color-div-border"
      )
        ? button
        : null
    );
  }

  init() {
    this.view.bindButtonClick(
      (button, containerKey) => {
        this.view.emit("buttonClick", {
          button,
          containerKey,
        });
      }
    );
  }
}

const model = new PillowcaseModel();
const view = new PillowcaseView();
const controller = new PillowcaseController(
  model,
  view
);
controller.init();
