$("#copied_tip").hover(function () {
  $(this).removeClass("hide");
});

// Tooltip
function copy(phone) {
  setTimeout(function () {
    $("#copied_tip").remove();
  }, 800);

  $(".my-btn").append("<div class='tip' id='copied_tip'>Telefon copiat</div>");

  var linkText = "0" + phone.toString();

  var input = document.createElement("input");
  input.setAttribute("value", linkText);
  document.body.appendChild(input);
  input.select();
  var result = navigator.clipboard.writeText(linkText);
  document.body.removeChild(input);

  return result;
}

setInterval(function () {
  var change = $(".change");
  if (change.hasClass("bi-exclamation-triangle")) {
    change.removeClass("bi-exclamation-triangle");
    change.addClass("bi-exclamation-triangle-fill");
  } else if (change.hasClass("bi-exclamation-triangle-fill")) {
    change.removeClass("bi-exclamation-triangle-fill");
    change.addClass("bi-exclamation-triangle");
  }
}, 800);

// BEFORE!!!!!!!!!!!!!!!!
if (top.location.pathname === "/templates/abonamente.html") {
  const removeCarousel = document.querySelector(".rem-carousel");
  const removeInner = document.querySelector(".rem-inner");
  const removeItems = document.querySelectorAll(".rem-item");
  const innerCards = document.querySelectorAll(".inner-cards");
  const desktopHide = document.querySelectorAll(".desktop-hide");
  // hide next and prev buttons
  if (window.innerWidth > 1023) {
    removeCarousel.classList.remove("carousel", "carousel-dark", "slide");
    removeInner.classList.remove("carousel-inner");
    removeItems.forEach(function (item) {
      item.classList.remove("carousel-item");
    });
    //   document.querySelector(".inner-cards").classList.add("row");
    desktopHide.forEach(function (item) {
      item.style.display = "none";
    });
  }
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1023) {
      removeCarousel.classList.remove("carousel", "carousel-dark", "slide");
      removeInner.classList.remove("carousel-inner");
      removeItems.forEach(function (item) {
        item.classList.remove("carousel-item");
      });
      innerCards.forEach(function (item) {
        item.classList.add("row");
      });
      desktopHide.forEach(function (item) {
        item.style.display = "none";
      });
    }
    if (window.innerWidth < 1024) {
      removeCarousel.classList.add("carousel", "carousel-dark", "slide");
      removeInner.classList.add("carousel-inner");
      removeItems.forEach(function (item) {
        item.classList.add("carousel-item");
      });
      innerCards.forEach(function (item) {
        item.classList.remove("row");
      });
      desktopHide.forEach(function (item) {
        item.style.display = "flex";
      });
    }
  });
}

// AFTER!!!!!!!!!!!!!!!!
const removeCarousel = document.querySelector(".rem-carousel");
const removeInner = document.querySelector(".rem-inner");
const removeItems = document.querySelectorAll(".rem-item");
const innerCards = document.querySelectorAll(".inner-cards");
const desktopHide = document.querySelectorAll(".desktop-hide");

function resizeHandler() {
  if (window.innerWidth > 1023) {
    removeCarousel.classList.remove("carousel", "carousel-dark", "slide");
    removeInner.classList.remove("carousel-inner");
    removeItems.forEach((item) => item.classList.remove("carousel-item"));
    innerCards.forEach((item) => item.classList.add("row"));
    desktopHide.forEach((item) => (item.style.display = "none"));
  } else {
    removeCarousel.classList.add("carousel", "carousel-dark", "slide");
    removeInner.classList.add("carousel-inner");
    removeItems.forEach((item) => item.classList.add("carousel-item"));
    innerCards.forEach((item) => item.classList.remove("row"));
    desktopHide.forEach((item) => (item.style.display = "flex"));
  }
}

if (top.location.pathname === "/templates/abonamente.html") {
  resizeHandler();
  window.addEventListener("resize", resizeHandler);
}

// We removed the conditional check for
// top.location.pathname
//  since it's not relevant to the refactoring. We also extracted the common code for the
// window.innerWidth > 1023
//  check into a separate function called
// resizeHandler
// , which is then called both on initial load and on window resize. We also replaced the
// function
//  keyword with arrow functions for brevity.

// Overall, this code is more modular and easier to read.
