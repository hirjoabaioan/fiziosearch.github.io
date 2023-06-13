//--------------------------------------------//
//                   TOOLS                    //
//--------------------------------------------//

// BS Tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

// BS Popovers
const list = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
console.log(list);
list.map((el) => {
  let opts = {
    animation: true,
  };
  if (el.hasAttribute("data-bs-content-id")) {
    opts.content = document.getElementById(el.getAttribute("data-bs-content-id")).innerHTML;
    opts.html = true;
  }
  new bootstrap.Popover(el, opts);
});

//--------------------------------------------//
//               PAGE SPECIFIC                //
//--------------------------------------------//
const currentPage = top.location.pathname;

const searchPaths = ["/templates/search.html", "/templates/pacienti/mesagerie.html", "/templates/terapeuti/mesagerie.html"];

const notificationPaths = ["/templates/terapeuti/notificari.html", "/templates/pacienti/notificari.html"];

const infoContainer = document.querySelector(".info-container");
const listContainer = document.querySelector(".list-container");

window.addEventListener("resize", handleResize);

if (searchPaths.includes(currentPage)) {
  handleResize();

  document.querySelectorAll(".person-box").forEach((element) => {
    element.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 47rem)").matches) {
        listContainer.classList.remove("d-flex");
        listContainer.style.display = "none";
      }
      infoContainer.style.display = "block";
      infoContainer.classList.add("grid");
    });
  });
}

// Seen check - Notificari - de adaugat partea de html (RO)
if (notificationPaths.includes(currentPage)) {
  const notificationConditions = document.querySelectorAll(".notification-condition");
  notificationConditions.forEach((condition) => {
    if (condition.textContent === "Văzut") {
      const getSiblings = (e) => {
        let siblings = [];
        if (!e.parentNode) {
          return siblings;
        }

        let sibling = e.parentNode.firstChild;

        while (sibling) {
          if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
          }
          sibling = sibling.nextSibling;
        }

        return siblings;
      };

      const siblings = getSiblings(condition);

      siblings.map((elem) => (elem.style.color = "grey"));
      condition.style.color = "grey";
    }
  });
}

if (currentPage === "/templates/terapeuti/dashboard.html") {
  const activityToggler = document.querySelector(".activity-toggler");
  const welcomeMessage = document.querySelector(".welcome-message");

  if (!activityToggler) {
    welcomeMessage.classList.add("large");
  } else {
    welcomeMessage.classList.remove("large");
  }

  const availability = document.querySelector("#availabilityCheckbox");

  availability.addEventListener("change", function () {
    const parentDiv = document.querySelector(".page-info-grid");
    const selectAllI = parentDiv.querySelectorAll("i");
    const selectAllSpan = parentDiv.querySelectorAll("span");

    selectAllI.forEach((i) => {
      if (availability.checked) {
        i.classList.add("disableI");
      } else {
        i.classList.remove("disableI");
      }
    });

    selectAllSpan.forEach((s) => {
      if (availability.checked) {
        s.classList.add("disableS");
      } else {
        s.classList.remove("disableS");
      }
    });
  });
}

// Carousel for prices
if (top.location.pathname === "/templates/abonamente.html") {
  handleWindowResize();
  window.addEventListener("resize", handleWindowResize);

  const CAROUSEL_BREAKPOINT = 1023;
  const removeCarousel = document.querySelector(".rem-carousel");
  const removeInner = document.querySelector(".rem-inner");
  const removeItems = document.querySelectorAll(".rem-item");
  const innerCards = document.querySelectorAll(".inner-cards");
  const desktopHide = document.querySelectorAll(".desktop-hide");

  function removeCarouselClasses() {
    removeCarousel.classList.remove("carousel", "carousel-dark", "slide");
    removeInner.classList.remove("carousel-inner");
    removeItems.forEach(function (item) {
      item.classList.remove("carousel-item");
    });
  }

  function addCarouselClasses() {
    removeCarousel.classList.add("carousel", "carousel-dark", "slide");
    removeInner.classList.add("carousel-inner");
    removeItems.forEach(function (item) {
      item.classList.add("carousel-item");
    });
  }

  function setInnerCardsDisplay(display) {
    innerCards.forEach(function (item) {
      item.style.display = display;
    });
  }

  function setDesktopHideDisplay(display) {
    desktopHide.forEach(function (item) {
      item.style.display = display;
    });
  }

  function handleWindowResize() {
    if (window.innerWidth > CAROUSEL_BREAKPOINT) {
      removeCarouselClasses();
      setInnerCardsDisplay("flex");
      setDesktopHideDisplay("none");
    } else {
      addCarouselClasses();
      setInnerCardsDisplay("block");
      setDesktopHideDisplay("flex");
    }
  }
}

//--------------------------------------------//
//                 FUNCTIONS                  //
//--------------------------------------------//

const handleResize = () => {
  if (window.innerWidth < 750 && listContainer.style.display !== "none") {
    infoContainer.style.display = "none";
  } else if (window.innerWidth > 751) {
    infoContainer.style.display = "block";
  }

  if (window.matchMedia("(max-width: 47rem)").matches) {
    infoContainer.style.display = "none";
  }
};
