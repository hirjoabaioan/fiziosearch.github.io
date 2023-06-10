//--------------------------------------------//
//                   TOOLS                    //
//--------------------------------------------//

// BS Tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

// BS Popovers
const list = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
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

// Search page (RO) - de adaugat partea de HTML

if (top.location.pathname === "/templates/search.html" || top.location.pathname === "/templates/pacienti/mesagerie.html" || top.location.pathname === "/templates/terapeuti/mesagerie.html") {
  window.addEventListener("resize", function () {
    if (window.innerWidth < 750 && document.querySelector(".list-container").style.display !== "none") {
      document.querySelector(".info-container").style.display = "none";
    } else if (window.innerWidth > 751) {
      document.querySelector(".info-container").style.display = "block";
    }
  });

  if (window.matchMedia("(max-width: 47rem)").matches) {
    document.querySelector(".info-container").style.display = "none";
  }

  if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
    document.querySelector(".med").classList.remove("btn", "btn-secondary");
  }

  document.querySelectorAll(".person-box").forEach(function (element) {
    element.addEventListener("click", function () {
      if (window.matchMedia("(max-width: 47rem)").matches) {
        document.querySelector(".list-container").classList.remove("d-flex");
        document.querySelector(".list-container").style.display = "none";
      }
      document.querySelector(".info-container").style.display = "block";
      document.querySelector(".info-container").classList.add("grid");
    });
  });

  document.querySelector("#close").addEventListener("click", function () {
    if (window.matchMedia("(max-width: 47rem)").matches) {
      document.querySelector(".list-container").classList.add("d-flex");
      document.querySelector(".list-container").style.display = "block";
      document.querySelector(".info-container").classList.remove("grid");
      document.querySelector(".info-container").style.display = "none";
    }

    if (window.matchMedia("(min-width: 47rem)").matches) {
      var replace = `
                <div class="grid jusify-content-start align-items-center" style="width: 500px;"  id="startPage">
                    <span id="txtCheck">Alege un terapeut din listă</span>
                </div>
                `;

      document.querySelector(".info-container").innerHTML = replace;
    }
  });
}
