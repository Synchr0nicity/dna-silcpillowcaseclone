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
currencyBtn.addEventListener(
  "click",
  function () {
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

const hiddenListsArray = [
  newArrivalsList,
  shopList,
  benefitsList,
  pressList,
];

pageNavLinks.forEach((navItem, index) => {
  const hiddenList = hiddenListsArray[index];

  let isHovered = false;

  const showList = () => {
    hiddenList.classList.remove("hidden");
  };

  const hideList = () => {
    setTimeout(() => {
      if (!isHovered) {
        hiddenList.classList.add("hidden");
      }
    }, 1000); // Add a slight delay to allow for mouse movement
  };

  navItem.addEventListener("mouseenter", () => {
    isHovered = true;
    showList();
  });

  navItem.addEventListener("mouseleave", () => {
    isHovered = false;
    hideList();
  });

  hiddenList.addEventListener(
    "mouseenter",
    () => {
      isHovered = true;
    }
  );

  hiddenList.addEventListener(
    "mouseleave",
    () => {
      isHovered = false;
      hideList();
    }
  );
});

pageNavLinks.forEach((navItem, index) => {
  const hiddenList = hiddenListsArray[index];

  navItem.addEventListener("mouseenter", () => {
    hiddenList.classList.remove("hidden");
  });

  navItem.addEventListener("mouseleave", () => {
    setTimeout(() => {
      if (!hiddenList.matches(":hover")) {
        hiddenList.classList.add("hidden");
      }
    }, 1000); // Add a slight delay to allow for mouse movement
  });

  hiddenList.addEventListener(
    "mouseenter",
    () => {
      hiddenList.classList.remove("hidden");
    }
  );

  hiddenList.addEventListener(
    "mouseleave",
    () => {
      hiddenList.classList.add("hidden");
    }
  );
});

//stopping scroll past page
///////////////////////////////////////////////////

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
const pillowcaseSrcs = {
  azure: [
    "images/click-right-pillow-bar/Azure/azure-queen-zippered-pillowcase.webp",
    "images/click-right-pillow-bar/Azure/SLIP_S24_PC_QUEEN_AZUREBLUE_SHOT3.webp",
    "images/click-right-pillow-bar/Azure/SLIP_S24_PC_QUEEN_AZUREBLUE_SHOT4.webp",
  ],
  white: [
    "images/click-right-pillow-bar/white-queen/white-queen-sippered-pillowcase-2.webp",
    "images/click-right-pillow-bar/white-queen/SLIP_PC_QUEEN_White_SHOTB.webp",
    "images/click-right-pillow-bar/white-queen/PCwhite2_5e6ca63c-6594-49d4-8bae-80b89a788ed1.webp",
  ],
  niceWhite: [
    "images/click-right-pillow-bar/white-queen-nice/white-queen-zippered-pillowcase.webp",
    "images/click-right-pillow-bar/white-queen-nice/SLIP_PCQUEEN_A_SHOT3.webp",
    "images/click-right-pillow-bar/white-queen-nice/SLIP_PCQUEEN_A_SHOT4.webp",
  ],
  seashell: [
    "images/click-right-pillow-bar/seashell/seashell-queen-zippered-pillowcase.webp",
    "images/click-right-pillow-bar/seashell/SLIP_S24_PC_QUEEN_SEASHELL_SHOT3.webp",
    "images/click-right-pillow-bar/seashell/SLIP_S24_PC_QUEEN_SEASHELL_SHOT4.webp",
  ],
  seabreeze: [
    "images/click-right-pillow-bar/seabreeze/seabreeze-queen-zippered-pillowcase.webp",
    "images/click-right-pillow-bar/seabreeze/SLIP_S24_PC_QUEEN_SEABREEZE_SHOT3.webp",
    "images/click-right-pillow-bar/seabreeze/SLIP_S24_PC_QUEEN_SEABREEZE_SHOT4.webp",
  ],
  pink: [
    "images/click-right-pillow-bar/pink-queen/pink-queen-zippered-pillowcase.webp",
    "images/click-right-pillow-bar/pink-queen/SLIP_PC_QUEEN_Pink_SHOTB.webp",
    "images/click-right-pillow-bar/pink-queen/SLIP_PC_QUEEN_Pink_SHOTC.webp",
  ],
  coral: [
    "images/click-right-pillow-bar/coral/coral-queen-zippered-pillowcase.webp",
    "images/click-right-pillow-bar/coral/SLIP_S24_PC_QUEEN_CORALSUNSET_SHOT3.webp",
    "images/click-right-pillow-bar/coral/SLIP_S24_PC_QUEEN_CORALSUNSET_SHOT4.webp",
  ],
  petal: [
    "images/click-right-pillow-bar/petal-queen/petal-queen-zippered-pillowcase.webp",
    "images/click-right-pillow-bar/petal-queen/SLIP_PCQUEEN_PETAL_FL2.webp",
    "images/click-right-pillow-bar/petal-queen/SLIP_PCQUEEN_PETAL_FL3.webp",
  ],
};

let currentSelectedButtons = {
  first: null,
  second: null,
  third: null,
  fourth: null,
  fifth: null,
  sixth: null,
  seventh: null,
  eighth: null,
};

const buttons = {
  1: document.querySelectorAll(
    ".button-container-1 button"
  ),
  2: document.querySelectorAll(
    ".button-container-2 button"
  ),
  3: document.querySelectorAll(
    ".button-container-3 button"
  ),
  4: document.querySelectorAll(
    ".button-container-4 button"
  ),
  5: document.querySelectorAll(
    ".button-container-5 button"
  ),
  6: document.querySelectorAll(
    ".button-container-6 button"
  ),
  7: document.querySelectorAll(
    ".button-container-7 button"
  ),
  8: document.querySelectorAll(
    ".button-container-8 button"
  ),
};

Object.entries(buttons).forEach(
  ([containerKey, buttonContainer]) =>
    buttonContainer.forEach((button) =>
      button.addEventListener(
        "click",
        function () {
          const color = this.dataset.color;
          if (pillowcaseSrcs[color]) {
            const images =
              document.querySelectorAll(
                `.img-el-container-${parseInt(
                  containerKey.replace(/\D/g, "")
                )} img`
              );
            images.forEach((image, index) => {
              if (pillowcaseSrcs[color][index]) {
                image.src =
                  pillowcaseSrcs[color][index];
              }
            });

            // Remove border from previously selected button in this container
            if (
              currentSelectedButtons[
                containerKey
              ] &&
              currentSelectedButtons[
                containerKey
              ] !== this
            ) {
              currentSelectedButtons[
                containerKey
              ].classList.remove(
                "color-div-border"
              );
            }

            // Toggle border on clicked button
            this.classList.toggle(
              "color-div-border"
            );

            // Update currentSelectedButton for this container
            currentSelectedButtons[containerKey] =
              this.classList.contains(
                "color-div-border"
              )
                ? this
                : null;
          }
        }
      )
    )
);

// buttons.forEach((button) =>
//   button.addEventListener("click", function () {
//     pillowcaseSrcs.white.forEach((whiteEl) => {
//       pillowElements.azure.forEach((azureEl) => {
//         if (azureEl.src === whiteEl) return;
//         else azureEl.src = `${whiteEl}`;
//       });
//     });
//   })
// );

// function updateLastItemEnd() {
//   // Find the last item in your xScroll
//   const lastItem =
//     xScrollContainer.lastElementChild;
//   if (lastItem) {
//     // Calculate where the last item ends relative to the xScroll
//     lastItemEnd =
//       lastItem.offsetLeft + lastItem.offsetWidth;
//   }
// }

// Call updateLastItemEnd whenever the content of xScroll changes, for example:
// window.addEventListener(
//   "load",
//   updateLastItemEnd
// );
// window.addEventListener(
//   "resize",
//   updateLastItemEnd
// );
/*
have an object with the list items, and a number
const list - {
    1: New Arrivals,
    2: 
}


<div class="hidden-newArrivals-list">
                <div class="hidden-newArrivals-container">
                        <h3 class="hidden-newArrivals-links"><a href="#">NEW ARRIVALS</a></h3>
                        <a href="#">Shop New Arrivals</a>
                        <a href="#">Zodiac Collection</a>
                        <a href="#">Meribella Collection</a>
                        <a href="#">Back to Basics Collection</a>
                        <a href="#">Petal Collection</a>
                        <br>
                        <h3 class="hidden-exclusives-links"><a href="#">EXCLUSIVES</a></h3>
                        <a href="#">Shop exclusives</a>                    
                </div>
                <div class="image-container">
                        <image class="hidden-links-image" src="images\page-nav-images\SLIP_WATER_Thumbnail.webp" height="50%" width="70%"></image>
                        <p class="image-description">Shop New Arrivals</p>
                    </div>
            </div>
    
*/
