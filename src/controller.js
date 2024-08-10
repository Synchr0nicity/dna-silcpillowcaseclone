import { StickyHeaderView } from "./views/StickyHeaderView.js";
import { AnouncementCarouselView } from "./views/AnouncementCarouselView.js";
import { CarouselHeroView } from "./views/CarouselHeroView.js";
import { PillowcaseModel } from "./model.js";
import { PillowcaseView } from "./views/PillowcaseView.js";
import { FacemaskModel } from "./model.js";
import { FacemaskView } from "./views/FacemaskView.js";

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
const footerCurrencyContainer =
  document.querySelector(
    ".footer-currency-container"
  );

const chevronContainer = document.querySelector(
  "#chevron-container"
);
//////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class CarouselHeroController {
  constructor() {
    const hero1Container = document.querySelector(
      ".hero1-image-container"
    );
    const hero1Images = document.querySelectorAll(
      ".hero1-image"
    );

    this.carouselHeroView = new CarouselHeroView(
      hero1Images,
      hero1Container
    );
  }

  update() {
    this.carouselHeroView.updateSlide();
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////

class HiddenMenuHandler {
  constructor(
    pageNavLinks,
    newArrivalsList,
    shopList,
    benefitsList,
    pressList
  ) {
    this.hiddenListsArray = [
      newArrivalsList,
      shopList,
      benefitsList,
      pressList,
    ];
    this.pageNavLinks = pageNavLinks;
    this.initEventListeners();
  }

  showList(hiddenList) {
    hiddenList.classList.remove("hidden");
  }

  hideList(hiddenList, navItem) {
    setTimeout(() => {
      if (
        !hiddenList.matches(":hover") &&
        !navItem.matches(":hover")
      ) {
        hiddenList.classList.add("hidden");
      }
    }, 1000);
  }

  initEventListeners() {
    this.pageNavLinks.forEach(
      (navItem, index) => {
        const hiddenList =
          this.hiddenListsArray[index];

        navItem.addEventListener(
          "mouseenter",
          () => this.showList(hiddenList)
        );
        hiddenList.addEventListener(
          "mouseenter",
          () => this.showList(hiddenList)
        );
        navItem.addEventListener(
          "mouseleave",
          () => this.hideList(hiddenList, navItem)
        );
        hiddenList.addEventListener(
          "mouseleave",
          () => this.hideList(hiddenList, navItem)
        );
      }
    );
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

class ScrollLimitHandler {
  constructor(
    xScrollContainer,
    xScroll,
    mainContainer
  ) {
    this.xScrollContainer = xScrollContainer;
    this.xScroll = xScroll;
    this.mainContainer = mainContainer;
    this.lastItemEnd = 0;

    this.updateScrollLimits();

    this.preventScrolling();
  }

  updateScrollLimits() {
    const lastChild =
      this.xScrollContainer.children[
        this.xScrollContainer.children.length - 1
      ];

    this.lastItemEnd =
      lastChild.offsetLeft +
      lastChild.offsetWidth;
  }

  preventScrolling() {
    [this.xScroll, this.mainContainer].forEach(
      (el) => {
        el.addEventListener("scroll", () => {
          if (el.scrollLeft < 0) {
            el.scrollLeft = 0;
          } else if (
            el.scrollLeft >
            this.lastItemEnd - el.clientWidth
          ) {
            el.scrollLeft =
              this.lastItemEnd - el.clientWidth;
          }
        });
      }
    );
  }
}

/////////////////////////////////////////////////////////////////////////////////////

class PillowcaseController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.subscribe(
      "buttonClick",
      this.handleButtonClick.bind(this)
    );
  }

  handleButtonClick({ button, containerKey }) {
    const color = button.dataset.color;
    console.log(
      `Button clicked: ${button}, ContainerKey: ${containerKey}, Color: ${color}`
    );

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
        this.view.publish("buttonClick", {
          button,
          containerKey,
        });
      }
    );
  }
}

//////////////////////////////////////////////////////////////////

class FacemaskController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.subscribe(
      "buttonClick",
      this.handleButtonClick.bind(this)
    );
  }

  handleButtonClick({ button, containerKey }) {
    const color = button.dataset.color;
    console.log(
      `Button clicked: ${button}, ContainerKey: ${containerKey}, Color: ${color}`
    );

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
        this.view.publish("buttonClick", {
          button,
          containerKey,
        });
      }
    );
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////
class CurrencyMenuFooter {
  constructor(
    footerCurrencyContainer,
    chevronContainer
  ) {
    this.footerCurrencyContainer =
      footerCurrencyContainer;
    this.chevronContainer = chevronContainer;

    this.chevronDown =
      document.createElement("i");
    this.chevronDown.classList.add(
      "fas",
      "fa-chevron-down",
      "fa-sm"
    );

    this.chevronUp = document.createElement("i");
    this.chevronUp.classList.add(
      "fas",
      "fa-chevron-up",
      "fa-sm"
    );

    this.chevronContainer.appendChild(
      this.chevronDown
    );

    this.isChevronDown = true;

    this.menuElement =
      document.createElement("div");
    this.menuElement.id = "currency-menu";
    this.menuElement.innerHTML = this.markup();
    this.menuElement.style.display = "none";

    this.footerCurrencyContainer.appendChild(
      this.menuElement
    );
    this.init();
  }

  toggleChevron() {
    if (this.isChevronDown) {
      // Change to chevron up
      this.chevronContainer.removeChild(
        this.chevronDown
      );
      this.chevronContainer.appendChild(
        this.chevronUp
      );
      this.isChevronDown = false; // Update state
      this.menuElement.style.display = "block";
    } else {
      // Change to chevron down
      this.chevronContainer.removeChild(
        this.chevronUp
      );
      this.chevronContainer.appendChild(
        this.chevronDown
      );
      this.isChevronDown = true; // Update state
      this.menuElement.style.display = "none";
    }
  }

  init() {
    this.chevronContainer.addEventListener(
      "click",
      this.toggleChevron.bind(this)
    );
  }

  markup() {
    return `
              <ul>
                <li>Australia $ AUD</li>
                <li>United States $ USD</li>
                <li>United Kingdom £ GBP</li>
                <li>Europe € EUR</li>
                <li>Canada $ CAD</li>
              </ul>
              `;
  }
}

// {/* <i class="fa-solid fa-chevron-down fa-sm"></i>; */}

///////////////initializing all classes
const stickyHeaderView = new StickyHeaderView(
  stickyAnchor,
  header,
  placeholder
);

const anouncementCarouselView =
  new AnouncementCarouselView(
    anouncements,
    carouselContainer
  );

const carouselHeroController =
  new CarouselHeroController();

new HiddenMenuHandler(
  pageNavLinks,
  newArrivalsList,
  shopList,
  benefitsList,
  pressList
);

new ScrollLimitHandler(
  xScrollContainer,
  xScroll,
  mainContainer
);

const pillowcaseModel = new PillowcaseModel();
const pillowcaseView = new PillowcaseView();
const pillowcaseController =
  new PillowcaseController(
    pillowcaseModel,
    pillowcaseView
  );
pillowcaseController.init();

const facemaskModel = new FacemaskModel();
const facemaskView = new FacemaskView();
const facemaskController = new FacemaskController(
  facemaskModel,
  facemaskView
);

facemaskController.init();
const currencyMenuFooter = new CurrencyMenuFooter(
  footerCurrencyContainer,
  chevronContainer
);
