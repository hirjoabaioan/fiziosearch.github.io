// Accessing the Document through jQuery

$(document).ready(function () {
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

  if (top.location.pathname === "/templates/search.html" || top.location.pathname === "/templates/pacienti/mesagerie.html" || top.location.pathname === "/templates/terapeuti/mesagerie.html") {
    const infoContainer = document.querySelector(".info-container");
    const listContainer = document.querySelector(".list-container");

    window.addEventListener("resize", function () {
      if (window.innerWidth < 750 && listContainer.style.display !== "none") {
        infoContainer.style.display = "none";
      } else if (window.innerWidth > 751) {
        infoContainer.style.display = "block";
      }
    });

    if (window.matchMedia("(max-width: 47rem)").matches) {
      infoContainer.style.display = "none";
    }

    document.querySelectorAll(".person-box").forEach(function (element) {
      element.addEventListener("click", function () {
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
  if (top.location.pathname === "/templates/terapeuti/notificari.html" || top.location.pathname === "/templates/pacienti/notificari.html") {
    const notificationConditions = document.querySelectorAll(".notification-condition");
    notificationConditions.forEach(function (condition) {
      // console.log(condition.textContent);
      if (condition.textContent === "Văzut") {
        const getSiblings = function (e) {
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

  // Graphic table - de sters sau editat (RO)
  if (top.location.pathname === "/templates/terapeuti/dashboard.html") {
    const classToCheck = document.querySelector(".activity-toggler");
    const elementToAddClass = document.querySelector(".welcome-message");
    if (!classToCheck) {
      elementToAddClass.classList.add("large");
    } else {
      elementToAddClass.classList.remove("large");
    }

    //MOdifica pentru mai putine linii de cod (RO)
    const availability = document.querySelector("#availabilityCheckbox");

    availability.addEventListener("change", function () {
      const parentDiv = document.querySelector(".page-info-grid");
      const selectAllI = parentDiv.querySelectorAll("i");
      const selectAllSpan = parentDiv.querySelectorAll("span");

      if (availability.checked) {
        selectAllI.forEach((i) => i.classList.add("disableI"));
        selectAllSpan.forEach((s) => s.classList.add("disableS"));
      } else {
        selectAllI.forEach((i) => i.classList.remove("disableI"));
        selectAllSpan.forEach((s) => s.classList.remove("disableS"));
      }
    });
  }

  // Carousel for prices
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

  //Add hours and minutes to the dropdowns in the TERAPII page
  if (top.location.pathname === "/templates/terapeuti/terapii.html") {
    const dropDownHoursInsert = document.getElementById("dropdownDurataOre");
    const dropDownMinutesInsert = document.getElementById("dropdownDurataMin");
    const MAX_HOURS = 10;
    const MAX_MINUTES = 60;
    const MINUTES_INCREMENTATION = 5;

    for (let hour = 0; hour < MAX_HOURS; hour++) {
      if (hour < 10) {
        let optionHourElement = document.createElement("option");
        optionHourElement.value = "0" + hour;
        optionHourElement.text = "0" + hour;
        dropDownHoursInsert.add(optionHourElement);
      } else {
        let optionHourElement = document.createElement("option");
        optionHourElement.value = hour;
        optionHourElement.text = hour;
        dropDownHoursInsert.add(optionHourElement);
      }
    }

    for (let min = 0; min < MAX_MINUTES; min += MINUTES_INCREMENTATION) {
      if (min < 10) {
        let optionMinElement = document.createElement("option");
        optionMinElement.value = "0" + min;
        optionMinElement.text = "0" + min;
        dropDownMinutesInsert.add(optionMinElement);
      } else {
        let optionMinElement = document.createElement("option");
        optionMinElement.value = min;
        optionMinElement.text = min;
        dropDownMinutesInsert.add(optionMinElement);
      }
    }
  }

  // Patient Therapies page - Therapist Point Of View
  if (top.location.pathname === "/templates/terapeuti/pagina-pacient.html") {
    // Se preia numele pacientului din Baza de date (mockup)
    const patientName = "Popescu Ion";
    // Se preiau tearpiile introduse de terapeutul inregistrat din Baza de date (mockup)
    const therapies = [
      {
        Culoare: "red",
        Procedura: "Kinetoterapie",
        Durata: 2,
        Tarif: 100,
      },
      {
        Culoare: "green",
        Procedura: "Masaj",
        Durata: 1,
        Tarif: 100,
      },
    ];
    // Se preiau procedurile realizate de catre pacient cu terapeutul inregistrat din Baza de date (mockup)
    const patientTherapies = [
      {
        Culoare: "red",
        Data: "14.05.2023",
        Ora_inceput: 13,
        Ora_sfarsit: "15:00",
        Terapie: "Kinetoterapie",
        Status: "Realizat",
      },

      {
        Culoare: "green",
        Data: "15.05.2023",
        Ora_inceput: 10,
        Ora_sfarsit: "11:00",
        Terapie: "Masaj",
        Status: "Programat",
      },

      {
        Culoare: "red",
        Data: "16.05.2023",
        Ora_inceput: 13,
        Ora_sfarsit: "15:00",
        Terapie: "Kinetoterapie",
        Status: "Programat",
      },

      {
        Culoare: "pink",
        Data: "16.04.2023",
        Ora_inceput: 16,
        Ora_sfarsit: "18:00",
        Terapie: "Kinetoterapie",
        Status: "Programat",
      },
    ];

    const tableBody = document.querySelector("tbody");
    const modalInsert = document.querySelector(".modal-box");
    let therapiesCounter = 0;
    // link catre folderul pacientului - de integrat in JS (RO)
    patientTherapies.forEach((therapy) => {
      therapiesCounter++;
      const therapyColor = therapy.Culoare;

      const rowToAdd = `
        <tr>
          <!-- Se introduce culoarea terapiei selectat de catre utilizator in pagina de terapii -->
          <td>
            <div class="color" style="background-color: ${therapyColor};"></div>
          </td>
          <td>${therapy.Data}</td>
          <td>${therapy.Ora_inceput}</td>
          <td>${therapy.Ora_sfarsit}</td>
          <td>${therapy.Terapie}</td>
          <td>${therapy.Status}</td>
          <td>
            <div class="icon-data">
              <!-- data-bs-target => numerele introduse prin js odata cu popularea tabelului, folosit pentru editarea programarii -->
              <a href="#" data-bs-title="Modifică" data-bs-toggle="modal" data-bs-target="#modal_${therapiesCounter}" class="edit">
                <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
              </a>
              <!-- link catre folderul pacientului - de integrat in JS -->
              <a href="#" class="folder">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16">
                  <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/>
                </svg>
              </a>
            </div>
          </td>

          
        </tr>
      `;

      const modalToAdd = `
          <div class="modal fade patient-schedule-table-modal" id="modal_${therapiesCounter}" tabindex="-1" aria-labelledby="labelModal_${therapiesCounter}" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header modal-border">
                <h3 class="modal-title" id="labelModal_${therapiesCounter}">Programare</h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <h4>${patientName}</h4>
                <div class="input-area">
                  <div class="row g-3 align-items-center">
                    <div class="col-xs-2 col-sm-1">
                      <span class="col-form-label">Terapii:</span>
                    </div>
                    
                    <div class="col-xs-10 col-sm-11">
                      <div class="dropdown dash-drops">
                        <select name="Terapii" onchange="" class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuTerapii" data-bs-toggle="dropdown" aria-expanded="false">
                          <option selected>${therapy.Terapie}</option>
                          <!--// Inserare optiuni pentru terapii (RO) -->
                          <option value="dropdown-item" value="Kinetoterapie">Kinetoterapie</option>
                          <option class="dropdown-item" value="Masaj">Masaj</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div class="row g-3 align-items-center">
                    <div class="col-auto">
                      <label for="modal-input-date" class="col-form-label">Dată:</label>
                    </div>
                    <div class="col-auto">
                      <input type="date" id="modal-input-date" class="form-control" value="">
                    </div>
                  </div>

                  <div class="row g-3 align-items-center">
                    <div class="col-auto">
                      <label for="modal-input-time" class="col-form-label">Interval orar:</label>
                    </div>
                    <div class="col-auto">
                      <input type="time" id="modal-input-time" class="form-control" value="">
                    </div>
                    <div class="col-auto">
                      <span class=""> <i class="bi bi-arrow-right"></i> </span>
                    </div>
                  </div>
                </div>
                <div class="mt-2">
                  <h3>Descriere</h3>
                  <hr>
                  <div class="mb-3">
                    <textarea class="form-control" name="description" rows="4"></textarea>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary">Salvează</button></div>
            </div>
          </div>
        </div>
      `;

      tableBody.insertAdjacentHTML("beforeend", rowToAdd);
      modalInsert.insertAdjacentHTML("beforeend", modalToAdd);
    });

    function calculateDuration(therapy, startHour) {
      if (therapies.some((element) => element.Terapie === therapy)) {
        return startHour + therapy.Durata;
      }
    }
  }

  if (top.location.pathname === "/templates/search.html" || top.location.pathname === "/templates/pacienti/mesagerie.html" || top.location.pathname === "/templates/terapeuti/mesagerie.html") {
    // Inserting GET parameters in the input fields for searching

    const params = new URLSearchParams(window.location.search);
    const location = document.querySelector("#inputSearchField");
    const service = document.querySelector("#dropdownService");
    const specialization = document.querySelector("#dropdownSpecialization");

    if (top.location.pathname === "/templates/search.html") {
      location.value = params.get("place");
      service.value = params.get("service");
      specialization.value = params.get("specialization");
    }

    const therapies = [
      {
        Culoare: "red",
        Procedura: "Kinetoterapie",
        Durata: 2,
        Tarif: 100,
      },
      {
        Culoare: "green",
        Procedura: "Masaj",
        Durata: 1,
        Tarif: 100,
      },
    ];

    const reviews = [
      {
        Name: "Popescu Ion",
        Content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, minus, voluptate ea iure, eius temporibus soluta similique dicta debitis repellendus rem ex! Voluptatum magni unde quos quidem! Deleniti, obcaecati iusto.",
        Review: "Bună",
      },
      {
        Name: "Ana Moretti",
        Content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, minus, voluptate ea iure, eius temporibus soluta similique dicta debitis repellendus rem ex! Voluptatum magni unde quos quidem! Deleniti, obcaecati iusto.",
        Review: "Bună",
      },
      {
        Name: "Anastasiu Ion",
        Content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, minus, voluptate ea iure, eius temporibus soluta similique dicta debitis repellendus rem ex! Voluptatum magni unde quos quidem! Deleniti, obcaecati iusto.",
        Review: "Bună",
      },
      {
        Name: "Alecu Andrei",
        Content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, minus, voluptate ea iure, eius temporibus soluta similique dicta debitis repellendus rem ex! Voluptatum magni unde quos quidem! Deleniti, obcaecati iusto.",
        Review: "Bună",
      },
    ];

    const therapistsList = [
      {
        id: 0,
        Name: "Alin Popescu",
        Profile_Picture: "../img/profiles/PozaH.webp",
        Profession: "Kinetoterapie",
        Specialization: ["Kinetoterapie", "Masaj", "Kinetoterapie pediatrică"],
        Locations: ["București", "Sector 2", "Aviatorilor"],
        Phone: "0754579331",
        SecondPhone: "0123456789",
        Email: "hirjoaba_ioasafdafdsgdfghsdfsdhggdsfgdgjgdtgfdhgfjhdgxvcn@yahoo.com",
        Web: "http://google.ro",
        Facebook: "https://www.facebook.com/hirjoaba.ioan/",
        Instagram: "https://www.instagram.com/hirjoaba_ioan/",
        TikTok: "https://www.tiktok.com/?utm_medium=msn",
        LinkedIn: "https://www.linkedin.com/in/h%C3%AErjoab%C4%83-ioan-266238103/",
        Rating: "Bun",
        Reviews_Number: 4,
        Experience: 2018,
        Description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aliquam autem ipsum sint magnam accusantium, aut facere iure quae ab similique hic animi at dolor ea eius consequatur laudantium veniam.",
        Therapies: therapies,
        Courses: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aliquam autem ipsum sint magnam accusantium, aut facere iure quae ab similique hic animi at dolor ea eius consequatur laudantium veniam.",
        Reviews: reviews,
      },

      {
        id: 1,
        Name: "Gonea Marian",
        Profile_Picture: "../img/profiles/PozaW.webp",
        Profession: "Masaj",
        Specialization: ["Masaj", "Masaj de relaxare", "Reflexoterapie"],
        Locations: ["București", "Sector 1", "Aviatorilor"],
        Phone: "0754579331",
        Email: "hirjoaba_ioan@yahoo.com",
        Rating: "Bun",
        Reviews_Number: 4,
        Experience: 2020,
        Description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aliquam autem ipsum sint magnam accusantium, aut facere iure quae ab similique hic animi at dolor ea eius consequatur laudantium veniam.",
        Therapies: therapies,
        Courses: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aliquam autem ipsum sint magnam accusantium, aut facere iure quae ab similique hic animi at dolor ea eius consequatur laudantium veniam.",
        Reviews: reviews,
      },

      {
        id: 2,
        Name: "Gonea Marian",
        Profile_Picture: "../img/profiles/PozaW.webp",
        Profession: "Masaj",
        Specialization: ["Masaj", "Masaj de relaxare", "Reflexoterapie"],
        Locations: ["București", "Sector 1", "Aviatorilor"],
        Phone: "0754579331",
        Email: "hirjoaba_ioan@yahoo.com",
        Rating: "Bun",
        Reviews_Number: 4,
        Experience: 2020,
        Description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aliquam autem ipsum sint magnam accusantium, aut facere iure quae ab similique hic animi at dolor ea eius consequatur laudantium veniam.",
        Therapies: therapies,
        Courses: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aliquam autem ipsum sint magnam accusantium, aut facere iure quae ab similique hic animi at dolor ea eius consequatur laudantium veniam.",
        Reviews: reviews,
      },

      {
        id: 3,
        Name: "Gonea Marian",
        Profile_Picture: "../img/profiles/PozaW.webp",
        Profession: "Masaj",
        Specialization: ["Masaj", "Masaj de relaxare", "Reflexoterapie"],
        Locations: ["București", "Sector 1", "Aviatorilor"],
        Phone: "0754579331",
        Email: "hirjoaba_ioan@yahoo.com",
        Rating: "Bun",
        Reviews_Number: 4,
        Experience: 2020,
        Description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aliquam autem ipsum sint magnam accusantium, aut facere iure quae ab similique hic animi at dolor ea eius consequatur laudantium veniam.",
        Therapies: therapies,
        Courses: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aliquam autem ipsum sint magnam accusantium, aut facere iure quae ab similique hic animi at dolor ea eius consequatur laudantium veniam.",
        Reviews: reviews,
      },

      {
        id: 4,
        Name: "Gonea Marian",
        Profile_Picture: "../img/profiles/PozaW.webp",
        Profession: "Masaj",
        Specialization: ["Masaj", "Masaj de relaxare", "Reflexoterapie"],
        Locations: ["București", "Sector 1", "Aviatorilor"],
        Phone: "0754579331",
        Email: "hirjoaba_ioan@yahoo.com",
        Rating: "Bun",
        Reviews_Number: 4,
        Experience: 2020,
        Description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aliquam autem ipsum sint magnam accusantium, aut facere iure quae ab similique hic animi at dolor ea eius consequatur laudantium veniam.",
        Therapies: therapies,
        Courses: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aliquam autem ipsum sint magnam accusantium, aut facere iure quae ab similique hic animi at dolor ea eius consequatur laudantium veniam.",
        Reviews: reviews,
      },

      {
        id: 5,
        Name: "Gonea Marian",
        Profile_Picture: "../img/profiles/PozaW.webp",
        Profession: "Masaj",
        Specialization: ["Masaj", "Masaj de relaxare", "Reflexoterapie"],
        Locations: ["București", "Sector 1", "Aviatorilor"],
        Phone: "0754579331",
        Email: "hirjoaba_ioan@yahoo.com",
        Rating: "Bun",
        Reviews_Number: 4,
        Experience: 2020,
        Description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aliquam autem ipsum sint magnam accusantium, aut facere iure quae ab similique hic animi at dolor ea eius consequatur laudantium veniam.",
        Therapies: therapies,
        Courses: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aliquam autem ipsum sint magnam accusantium, aut facere iure quae ab similique hic animi at dolor ea eius consequatur laudantium veniam.",
        Reviews: reviews,
      },

      {
        id: 6,
        Name: "Gonea Marian",
        Profile_Picture: "../img/profiles/PozaW.webp",
        Profession: "Masaj",
        Specialization: ["Masaj", "Masaj de relaxare", "Reflexoterapie"],
        Locations: ["București", "Sector 1", "Aviatorilor"],
        Phone: "0754579331",
        Email: "hirjoaba_ioan@yahoo.com",
        Rating: "Bun",
        Reviews_Number: 4,
        Experience: 2020,
        Description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aliquam autem ipsum sint magnam accusantium, aut facere iure quae ab similique hic animi at dolor ea eius consequatur laudantium veniam.",
        Therapies: therapies,
        Courses: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aliquam autem ipsum sint magnam accusantium, aut facere iure quae ab similique hic animi at dolor ea eius consequatur laudantium veniam.",
        Reviews: reviews,
      },

      {
        id: 7,
        Name: "Gonea Marian",
        Profile_Picture: "../img/profiles/PozaW.webp",
        Profession: "Masaj",
        Specialization: ["Masaj", "Masaj de relaxare", "Reflexoterapie"],
        Locations: ["București", "Sector 1", "Aviatorilor"],
        Phone: "0754579331",
        Email: "hirjoaba_ioan@yahoo.com",
        Rating: "Bun",
        Reviews_Number: 4,
        Experience: 2020,
        Description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aliquam autem ipsum sint magnam accusantium, aut facere iure quae ab similique hic animi at dolor ea eius consequatur laudantium veniam.",
        Therapies: therapies,
        Courses: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aliquam autem ipsum sint magnam accusantium, aut facere iure quae ab similique hic animi at dolor ea eius consequatur laudantium veniam.",
        Reviews: reviews,
      },

      {
        id: 8,
        Name: "Gonea Marian",
        Profile_Picture: "../img/profiles/PozaW.webp",
        Profession: "Masaj",
        Specialization: ["Masaj", "Masaj de relaxare", "Reflexoterapie"],
        Locations: ["București", "Sector 1", "Aviatorilor"],
        Phone: "0754579331",
        Email: "hirjoaba_ioan@yahoo.com",
        Rating: "Bun",
        Reviews_Number: 4,
        Experience: 2020,
        Description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aliquam autem ipsum sint magnam accusantium, aut facere iure quae ab similique hic animi at dolor ea eius consequatur laudantium veniam.",
        Therapies: therapies,
        Courses: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aliquam autem ipsum sint magnam accusantium, aut facere iure quae ab similique hic animi at dolor ea eius consequatur laudantium veniam.",
        Reviews: reviews,
      },

      {
        id: 9,
        Name: "Gonea Marian",
        Profile_Picture: "../img/profiles/PozaW.webp",
        Profession: "Masaj",
        Specialization: ["Masaj", "Masaj de relaxare", "Reflexoterapie"],
        Locations: ["București", "Sector 1", "Aviatorilor"],
        Phone: "0754579331",
        Email: "hirjoaba_ioan@yahoo.com",
        Rating: "Bun",
        Reviews_Number: 4,
        Experience: 2020,
        Description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aliquam autem ipsum sint magnam accusantium, aut facere iure quae ab similique hic animi at dolor ea eius consequatur laudantium veniam.",
        Therapies: therapies,
        Courses: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aliquam autem ipsum sint magnam accusantium, aut facere iure quae ab similique hic animi at dolor ea eius consequatur laudantium veniam.",
        Reviews: reviews,
      },
    ];

    const inputFieldSearch = document.querySelector("#inputSearchField");
    inputFieldSearch.addEventListener("keypress", function (e) {
      if (e.which === 13) {
        searchTherapists(inputFieldSearch);
      }
    });
    const buttonSearch = document.querySelector("#btnSearch");
    buttonSearch.addEventListener("click", function (e) {
      searchTherapists(inputFieldSearch);
    });

    window.onload = searchTherapists(inputFieldSearch);

    function searchTherapists(search) {
      let foundTherapists = [];
      let filteredTherapists = [];
      const searchItem = search.value.toLowerCase();
      const service = (document.querySelector("#dropdownService") || {}).value;
      const specialization = (document.querySelector("#dropdownSpecialization") || {}).value;

      if (searchItem) {
        therapistsList.forEach((therapist) => {
          let match = therapist.Name.toLocaleLowerCase().includes(searchItem);
          if (match) {
            foundTherapists.push(therapist);
          }

          match = therapist.Locations.includes(searchItem);
          const fAdress = therapist.Locations;
          for (let location = 0; location < fAdress.length; location++) {
            if (fAdress[location].toLowerCase().includes(searchItem)) foundTherapists.push(therapist);
          }
        });
      } else {
        foundTherapists = therapistsList;
      }

      if (service || specialization) {
        filteredTherapists = filterTherapists(service, specialization, foundTherapists);
      } else {
        filteredTherapists = foundTherapists;
      }

      filteredTherapists = filteredTherapists.filter((value, index, self) => index === self.findIndex((t) => t.id === value.id));

      displayTherapists(filteredTherapists.sort(() => Math.random() - 0.5));
      showTherapistData(filteredTherapists);
    }

    function filterTherapists(service, specialization, foundTherapists) {
      const serviceFilteredTherapists = [];
      const specializationFilteredTherapists = [];
      if (service) {
        foundTherapists.forEach((therapist) => {
          if (therapist.Profession === service) {
            serviceFilteredTherapists.push(therapist);
          }
        });
      }

      if (specialization) {
        serviceFilteredTherapists.forEach((therapist) => {
          let specializationMatch = therapist.Specialization.includes(specialization);

          if (specializationMatch) {
            specializationFilteredTherapists.push(therapist);
          }
        });

        return specializationFilteredTherapists;
      } else {
        return serviceFilteredTherapists;
      }
    }

    function displayTherapists(therapists) {
      const listArea = document.querySelector(".list-area");
      listArea.innerHTML = "";
      therapists.forEach((therapist) => {
        const id = therapist.id;
        const profileImage = therapist.Profile_Picture;
        const name = therapist.Name;
        const areas = therapist.Locations;
        const location = [];
        const therapies = therapist.Therapies.map((therapyName) => therapyName.Procedura);

        areas.forEach((area) => {
          location.push(`; `);
        });

        let therapistBox = ``;

        if (top.location.pathname !== "/templates/search.html") {
          therapistBox = `
          <div class="person-box" tabindex="0" id="${id}">
          <div class="person-box-pic">
            <img src="../${profileImage}" alt="${name}'s ProfilePicture" />
          </div>
          <div class="row m-0 p-0 person-box-info">
            <div class="m-0 pe-0">
              <span class="me-0 pe-0 person-box-name">${name}</span>
              <div class="availability-dot"></div>
            </div>
          </div>
        `;
        } else {
          therapistBox = `
            <div class="person-box" tabindex="0" id="${id}">
            <div class="person-box-pic">
              <img src="${profileImage}" alt="${name}'s ProfilePicture" />
            </div>
            <div class="row m-0 p-0 person-box-info">
              <div class="m-0 pe-0">
                <span class="me-0 pe-0 person-box-name">${name}</span>
                <div class="availability-dot"></div>
              </div>
              <span class="col-12 me-0 pe-0 person-box-locations">${areas}</span>
              <span class="col-12 me-0 pe-0 person-box-therapies">${therapies}</span>
            </div>
          `;
        }

        listArea.insertAdjacentHTML("beforeend", therapistBox);
      });
    }

    function showTherapistData(therapists) {
      const personBoxes = document.querySelectorAll(".person-box");

      personBoxes.forEach((personBox) => {
        personBox.addEventListener("click", function () {
          const idAttribute = $(this).attr("id");
          const today = new Date();

          therapists.forEach((therapist) => {
            const years = today.getFullYear() - new Date(therapist.Experience).getFullYear();
            const id = Number(therapist.id);
            const picture = therapist.Profile_Picture;
            const name = therapist.Name;
            const phone = therapist.Phone;
            const phone_2 = therapist.SecondPhone;
            const email = therapist.Email;
            const web = therapist.Web;
            const fb = therapist.Facebook;
            const instagram = therapist.Instagram;
            const tikTok = therapist.TikTok;
            const linkedIn = therapist.LinkedIn;
            const rating = therapists.Rating;
            const reviews = therapist.Reviews;
            const reviewsNumber = therapist.Reviews_Number;
            const profession = therapist.Profession;
            const specialization = therapist.Specialization;
            const experience = years > 1 ? "&nbsp;ani" : "&nbsp;an";
            const description = therapist.Description;
            const courses = therapist.Courses;
            const location = therapist.Locations;

            if (idAttribute == id) {
              createDetails(id, name, phone, phone_2, email, web, fb, instagram, tikTok, linkedIn, picture, rating, reviews, reviewsNumber, profession, specialization, experience, description, courses, location);
            }
          });

          let btnClose;

          if (top.location.pathname === "/templates/search.html") {
            btnClose = document.querySelector(".btn-close");
          } else {
            btnClose = document.querySelectorAll(".btn-close");
            btnClose = btnClose[1];
          }

          btnClose.addEventListener("click", function () {
            console.log("CLOSE");
            const infoContainer = document.querySelector(".info-container");
            const listContainer = document.querySelector(".list-container");
            if (window.innerWidth < 768) {
              infoContainer.style.display = "none";
              listContainer.style.display = "block";
            } else if (window.innerWidth > 768) {
              listContainer.style.display = "flex";
              infoContainer.innerHTML = `
                <div class="no-selection-div">
                  <h3>Selectați un terapeut din listă!</h3>
                </div>
              `;
            } else {
              infoContainer.innerHTML = `
                <div class="no-selection-div">
                  <h3>Selectați un terapeut din listă!</h3>
                </div>
              `;
            }
          });
        });
      });
    }

    function createDetails(id, name, phone, phone_2, email, web, fb, instagram, tikTok, linkedIn, picture, rating, reviews, reviewsNumber, profession, specialization, experience, description, courses, location) {
      let cours = [];
      let loc = [];
      let therapistInformations = ``;

      let addSecondPhone = ``;
      let addWebAddress = ``;
      let addFacebook = ``;
      let addInstagram = ``;
      let addTikTok = ``;
      let addLinkedIn = ``;
      let addSocialMedia = ``;

      if (phone_2) {
        addSecondPhone = `
          <a href="tel:${phone_2}" class="btn btn-secondary msg-button med text-center">
            <i class="bi bi-telephone" id="phone_2">${phone_2}</i>
          </a>
        `;
      }

      if (web) {
        addWebAddress = `
        <a href="tel:${web}" class="btn btn-secondary msg-button med text-center">
          <i class="bi bi-envelope-at"> Site personal</i>
        </a>
      `;
      }

      if (fb || instagram || tikTok || linkedIn) {
        if (fb) {
          addFacebook = `
              <li>
                <a href="${fb}" target="_blank" rel="noopener noreferrer">
                  <i class="bi bi-facebook"></i>
                </a>
              </li>
          `;
        }

        if (instagram) {
          addInstagram = `
          <li>
            <a href="${instagram}" target="_blank" rel="noopener noreferrer">
              <i class="bi bi-instagram"></i>
            </a>
          </li>
      `;
        }

        if (tikTok) {
          addTikTok = `
          <li>
            <a href="${tikTok}" target="_blank" rel="noopener noreferrer">
              <i class="bi bi-tiktok"></i>
            </a>
          </li>
      `;
        }

        if (linkedIn) {
          addLinkedIn = `
          <li>
            <a href="${linkedIn}" target="_blank" rel="noopener noreferrer">
              <i class="bi bi-linkedin"></i>
            </a>
          </li>
      `;
        }

        addSocialMedia = `
          <ul class="social-media">
            ${addFacebook}
            ${addInstagram}
            ${addTikTok}
            ${addLinkedIn}
          </ul>
        `;
      }

      if (top.location.pathname === "/templates/search.html") {
        therapistInformations = `
              <div class="d-flex row info-header">
              <div class="d-flex m-0 mt-2 pb-0 justify-content-end align-items-center" id="close">
                <button type="button" class="btn-close" aria-label="Close" name="closeData" text="X"></button>
              </div>
              <div class="header-pn mt-0 pt-0">
                <div class="m-0 p-0 header-pn-pic">
                  <img src="${picture}" alt="${name}'s profile picture" />
                </div>
                <div class="m-0 p-0 header-pn-name">
                  <div class="d-flex row justify-content-start align-items-center name-box">
                    <span class="col-8">${name}</span>
                    <div class="availability-dot"></div>
                  </div>
                  <span class="profession">${profession}</span>
                </div>
              </div>
              <div class="header-loc-contact">
                <div class="header-locations">
                  <h5 class="info-titles">Locații</h5>
                  <div class="m-0 mb-2 ps-4 pe-4">
                    <span>${location}</span>
                  </div>
                </div>
                <div class="header-contact">
                  <h5 class="info-titles">Contact</h5>
                  <div class="d-flex row justify-content-center m-0 p-0">
                    
                    <button type="button" class="btn btn-primary contact-button" id="showContactForIdNo_${id}">Contactează terapeutul</button>
                    
                    <div class="row m-0 p-0 gap-2 contact-info">
                      <a href="tel:${phone}" class="btn btn-secondary msg-button med text-center">
                        <i class="bi bi-telephone"> ${phone}</i>
                      </a>
                      ${addSecondPhone}
                      <a href="mailto:${email}" class="btn btn-secondary msg-button med text-center">
                        <i class="bi bi-envelope-at"> ${email}</i>
                      </a>
                      ${addWebAddress}

                      ${addSocialMedia}
                      
                      <button class="btn btn-secondary msg-button">Trimite un mesaj prin platformă</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="info-bio">
              <div class="mb-4 info-bio-activities">
                <h5 class="info-titles">Activitate</h5>
                <div class="m-0 ps-4 pe-4">
                  
                  <div class="d-flex row">
                    <h6 class="col-8">Rating general:</h6>
                    <span class="col-4">${rating}</span>
                  </div>
                  <div class="d-flex row">
                    <h6 class="col-8">Recenzii primite:</h6>
                    <span class="col-4">${reviewsNumber}</span>
                  </div>
                  <div class="d-flex row">
                    <h6 class="col-8">Experiența:</h6>
                    <span class="col-4">${experience}</span>
                  </div>
                </div>
              </div>
              <div class="mb-4 info-bio-description">
                <h5 class="info-titles">Descriere</h5>
                <p class="m-0 ps-4 pe-4">${description}</p>
              </div>
              <div class="mb-4 info-bio-courses">
                <h5 class="info-titles">Cursuri</h5>
                <p class="m-0 ps-4 pe-4">${courses}</p>
              </div>
            </div>

            <div class="info-long">
              <div class="col-12 mb-4 table-responsive info-long-services">
                <h5 class="info-titles">Servicii</h5>
                <table class="table info-long-table ps-2 pe-2">
                  <tr>
                    <th class="col">Terapie</th>
                    <th class="col">Durată</th>
                    <th class="col">Tarif</th>
                  </tr>
                  <tr>
                    <td>Masaj</td>
                    <td class="search-time">30</td>
                    <td class="search-price">100</td>
                  </tr>
                  <tr>
                    <td>Terapie manuală</td>
                    <td class="search-time">30</td>
                    <td class="search-price">150</td>
                  </tr>
                  <tr>
                    <td>Ventuze</td>
                    <td class="search-time">15</td>
                    <td class="search-price">50</td>
                  </tr>
                </table>
              </div>
              <div class="col-12 table-responsive info-long-reviews">
                <h5 class="info-titles">Recenzii</h5>
                <div class="overflow-auto reviews-container">
                  <table class="table info-long-table ps-2 pe-2">
                    <tr>
                      <th class="col">Client</th>
                      <th class="col">Recenzie</th>
                    </tr>
                    <tr tabindex="0">
                      <td><span>Gheorghe</span> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, minus, voluptate ea iure, eius temporibus soluta similique dicta debitis repellendus rem ex! Voluptatum magni unde quos quidem! Deleniti, obcaecati iusto.</td>
                      <td>Bună</td>
                    </tr>
                    <tr tabindex="0">
                      <td><span>Gheorghe</span> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, minus, voluptate ea iure, eius temporibus soluta similique dicta debitis repellendus rem ex! Voluptatum magni unde quos quidem! Deleniti, obcaecati iusto.</td>
                      <td>Bună</td>
                    </tr>
                    <tr tabindex="0">
                      <td><span>Gheorghe</span> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, minus, voluptate ea iure, eius temporibus soluta similique dicta debitis repellendus rem ex! Voluptatum magni unde quos quidem! Deleniti, obcaecati iusto.</td>
                      <td>Bună</td>
                    </tr>
                    <tr tabindex="0">
                      <td><span>Gheorghe</span> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, minus, voluptate ea iure, eius temporibus soluta similique dicta debitis repellendus rem ex! Voluptatum magni unde quos quidem! Deleniti, obcaecati iusto.</td>
                      <td>Bună</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
        `;
      } else {
        therapistInformations = `
        <div class="info-header">
        <div class="d-flex m-0 mt-2 pb-0 justify-content-end align-items-center" id="close">
            <button type="button" class="btn-close" aria-label="Close" name="closeData" text="X"></button>
        </div>
        <div class="header-pn">
          <div class="m-0 p-0 header-pn-pic">
            <img src="../${picture}" alt="${name}" />
          </div>
          <div class="m-0 p-0 header-pn-name">
            <span class="">${name}</span>
          </div>
        </div>
      </div>
      <div class="info-long">
        <div class="messages-border-box">
          <div class="d-flex row justify-content-between align-items-start messages-box overflow-auto custom-scrollbar-css">
            <span class="mess-date h-auto">27.02.2023 14:02</span>
            <div class="row gap-2 message-received message-box">
              <div class="message-pic">
                <img src="../../img/profiles/PozaP.webp" alt="poza" />
              </div>
              <div class="message-received-text message-general">
                <span class="mess-text">Buna!</span>
              </div>
            </div>

            <div class="row gap-2 message-sent message-box">
              <div class="message-pic">
                <img src="../../img/profiles/PozaW.webp" alt="poza" />
              </div>
              <div class="message-sent-text message-general">
                <span class="mess-text">Hello!</span>
              </div>
            </div>

            <div class="row gap-2 message-received message-box">
              <div class="message-pic">
                <img src="../../img/profiles/PozaP.webp" alt="poza" />
              </div>
              <div class="message-received-text message-general">
                <span class="mess-text">M-ai putea ajuta cu stabilirea unei proceduri de kinetoterapie la domiciliu?</span>
              </div>
            </div>

            <div class="row gap-2 message-sent message-box">
              <div class="message-pic">
                <img src="../../img/profiles/PozaW.webp" alt="poza" />
              </div>
              <div class="message-sent-text message-general">
                <span class="mess-text">Sigur! Cand doriti sa ne vedem?</span>
              </div>
            </div>

            <div class="row gap-2 message-received message-box">
              <div class="message-pic">
                <img src="../../img/profiles/PozaP.webp" alt="poza" />
              </div>
              <div class="message-received-text message-general">
                <span class="mess-text">Maine ne putem vedea pe la ora 14?</span>
              </div>
            </div>

            <div class="row gap-2 message-sent message-box">
              <div class="message-pic">
                <img src="../../img/profiles/PozaW.webp" alt="poza" />
              </div>
              <div class="message-sent-text message-general">
                <span class="mess-text">Desigur, ramane maine la ora 14!</span>
              </div>
            </div>
          </div>
        </div>
        <form action="" class="col-12 d-flex row justify-content-center p-2 m-0 list-form search-box">
          <div class="col-12 d-flex justify-content-center align-items-center m-0 p-2">
            <div class="send-file">
              <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" class="bi bi-file-earmark-arrow-up send-file" viewBox="0 0 16 16">
                <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z" />
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
              </svg>
            </div>
            <div class="input-group d-flex justify-content-center text-center w-100 m-0 p-2">
              <input type="text" class="form-control" placeholder="Scrie..." aria-label="Caută" aria-describedby="search-button" />
              <button class="btn btn-success" type="button">
                <img src="../../img/search.webp" id="search-icon" alt="Caută" />
              </button>
            </div>
          </div>
        </form>
      </div>
        `;
      }

      document.querySelector(".info-container").innerHTML = therapistInformations;
      // Aici ai ramas, modifica codul astfel incat sa apara lista atunci cand apasa pe X si sa apara info atunci cand apasa pe therapist-box
      if (window.innerWidth < 768) {
        document.querySelector(".list-container").style.display = "none";
        document.querySelector(".info-container").style.display = "block";
      }

      if (top.location.pathname === "/templates/search.html") {
        document.querySelector(".contact-button").addEventListener("click", function () {
          document.querySelector(".contact-info").style.display = "flex";
        });
      }
    }

    function copyTextToClipboard(text) {
      if (navigator.clipboard) {
        // Modern versions of Chromium browsers, Firefox, etc.

        navigator.clipboard.writeText(text).then(
          function () {
            alert("Text successfully copied to clipboard!");
          },
          function (error) {
            alert("Failed to copy text to clipboard: " + error.message);
          }
        );
      } else if (window.clipboardData) {
        // Internet Explorer.

        window.clipboardData.setData("Text", text);

        alert("Text successfully copied to clipboard!");
      } else {
        // Fallback method using Textarea.

        var textArea = document.createElement("textarea");

        textArea.value = text;

        textArea.style.position = "fixed";

        textArea.style.top = "-999999px";

        textArea.style.left = "-999999px";

        document.body.appendChild(textArea);

        textArea.focus();

        textArea.select();

        try {
          var successful = document.execCommand("copy");

          if (successful) {
            alert("Text successfully copied to clipboard!");
          } else {
            alert("Could not copy text to clipboard");
          }
        } catch (error) {
          alert("Failed to copy text to clipboard: " + error.message);
        }

        document.body.removeChild(textArea);
      }
    }
  }

  //--------------------------------------------//
  //                  OTHERS                    //
  //--------------------------------------------//

  //--------- Popularea dropdown-urilor ---------//

  const placesDropdown = $("#placesList");
  const servicesDropdown = $("#servicesList");
  const specializationDropdown = $("#specializationList");
  const services = ["Kinetoterapie", "Masaj"];
  const inputDropdownChangeEvent = $("#dropdownService");

  const romanianPlaces = ["București", "Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5", "Sector 6", "Abrud", "Adjud", "Agnita", "Aiud", "Alba Iulia", "Aleșd", "Alexandria", "Amara", "Anina", "Aninoasa", "Arad", "Ardud", "Avrig", "Azuga", "Babadag", "Băbeni", "Bacău", "Baia de Aramă", "Baia de Arieș", "Baia Mare", "Baia Sprie", "Băicoi", "Băile Govora", "Băile Herculane", "Băile Olănești", "Băile Tușnad", "Băilești", "Bălan", "Bălcești", "Balș", "Baraolt", "Bârlad", "Bechet", "Beclean", "Beiuș", "Berbești", "Berești", "Bicaz", "Bistrița", "Blaj", "Bocșa", "Boldești-Scăeni", "Bolintin-Vale", "Borșa", "Borsec", "Botoșani", "Brad", "Bragadiru", "Brăila", "Brașov", "Breaza", "Brezoi", "Broșteni", "Bucecea", "Budești", "Buftea", "Buhuși", "Bumbești-Jiu", "Bușteni", "Buzău", "Buziaș", "Cajvana", "Calafat", "Călan", "Călărași", "Călimănești", "Câmpeni", "Câmpia Turzii", "Câmpina", "Câmpulung Moldovenesc", "Câmpulung", "Caracal", "Caransebeș", "Carei", "Cavnic", "Căzănești", "Cehu Silvaniei", "Cernavodă", "Chișineu-Criș", "Chitila", "Ciacova", "Cisnădie", "Cluj-Napoca", "Codlea", "Comănești", "Comarnic", "Constanța", "Copșa Mică", "Corabia", "Costești", "Covasna", "Craiova", "Cristuru Secuiesc", "Cugir", "Curtea de Argeș", "Curtici", "Dăbuleni", "Darabani", "Dărmănești", "Dej", "Deta", "Deva", "Dolhasca", "Dorohoi", "Drăgănești-Olt", "Drăgășani", "Dragomirești", "Drobeta-Turnu Severin", "Dumbrăveni", "Eforie", "Făgăraș", "Făget", "Fălticeni", "Făurei", "Fetești", "Fieni", "Fierbinți-Târg", "Filiași", "Flămânzi", "Focșani", "Frasin", "Fundulea", "Găești", "Galați", "Gătaia", "Geoagiu", "Gheorgheni", "Gherla", "Ghimbav", "Giurgiu", "Gura Humorului", "Hârlău", "Hârșova", "Hațeg", "Horezu", "Huedin", "Hunedoara", "Huși", "Ianca", "Iași", "Iernut", "Ineu", "Însurăței", "Întorsura Buzăului", "Isaccea", "Jibou", "Jimbolia", "Lehliu Gară", "Lipova", "Liteni", "Livada", "Luduș", "Lugoj", "Lupeni", "Măcin", "Măgurele", "Mangalia", "Mărășești", "Marghita", "Medgidia", "Mediaș", "Miercurea Ciuc", "Miercurea Nirajului", "Miercurea Sibiului", "Mihăilești", "Milișăuți", "Mioveni", "Mizil", "Moinești", "Moldova Nouă", "Moreni", "Motru", "Murfatlar", "Murgeni", "Nădlac", "Năsăud", "Năvodari", "Negrești", "Negrești-Oaș", "Negru Vodă", "Nehoiu", "Novaci", "Nucet", "Ocna Mureș", "Ocna Sibiului", "Ocnele Mari", "Odobești", "Odorheiu Secuiesc", "Oltenița", "Onești", "Oradea", "Orăștie", "Oravița", "Orșova", "Oțelu Roșu", "Otopeni", "Ovidiu", "Panciu", "Pâncota", "Pantelimon", "Pașcani", "Pătârlagele", "Pecica", "Petrila", "Petroșani", "Piatra Neamț", "Piatra-Olt", "Pitești", "Ploiești", "Plopeni", "Podu Iloaiei", "Pogoanele", "Popești-Leordeni", "Potcoava", "Predeal", "Pucioasa", "Răcari", "Rădăuți", "Râmnicu Sărat", "Râmnicu Vâlcea", "Râșnov", "Recaș", "Reghin", "Reșița", "Roman", "Roșiorii de Vede", "Rovinari", "Roznov", "Rupea", "Săcele", "Săcueni", "Salcea", "Săliște", "Săliștea de Sus", "Salonta", "Sângeorgiu de Pădure", "Sângeorz-Băi", "Sânnicolau Mare", "Sântana", "Sărmașu", "Satu Mare", "Săveni", "Scornicești", "Sebeș", "Sebiș", "Segarcea", "Seini", "Sfântu Gheorghe", "Sibiu", "Sighetu Marmației", "Sighișoara", "Simeria", "Șimleu Silvaniei", "Sinaia", "Siret", "Slănic", "Slănic-Moldova", "Slatina", "Slobozia", "Solca", "Șomcuta Mare", "Sovata", "Ștefănești", " Argeș", "Ștefănești", " Botoșani", "Ștei", "Strehaia", "Suceava", "Sulina", "Tălmaciu", "Țăndărei", "Târgoviște", "Târgu Bujor", "Târgu Cărbunești", "Târgu Frumos", "Târgu Jiu", "Târgu Lăpuș", "Târgu Mureș", "Târgu Neamț", "Târgu Ocna", "Târgu Secuiesc", "Târnăveni", "Tășnad", "Tăuții-Măgherăuș", "Techirghiol", "Tecuci", "Teiuș", "Țicleni", "Timișoara", "Tismana", "Titu", "Toplița", "Topoloveni", "Tulcea", "Turceni", "Turda", "Turnu Măgurele", "Ulmeni", "Ungheni", "Uricani", "Urlați", "Urziceni", "Valea lui Mihai", "Vălenii de Munte", "Vânju Mare", "Vașcău", "Vaslui", "Vatra Dornei", "Vicovu de Sus", "Victoria", "Videle", "Vișeu de Sus", "Vlăhița", "Voluntari", "Vulcan", "Zalău", "Zărnești", "Zimnicea", "Zlatna", "1 mai", "Aviatorilor", "Aviației", "Băneasa", "Bucureștii Noi", "Centrul Civic", "Dămăroaia", "Domenii", "Dorobanți", "Floreasca", "Gara de Nord", "Grivița", "Pajura", "Piața Romană", "Piepra", "Pipera", "Primăverii", "Străulești", "Victoriei", "Andronache", "Baicului", "Centrul Civic", "Colentina", "Floreasca", "Iancului", "Ion Creangă", "Moșilor", "Obor", "Pantelimon", "Pipera", "Ștefan cel Mare", "Tei", "Vatra Luminoasă", "Balta Albă", "Centru Civic", "Centrul Civic", "Centrul Istoric", "Dristor", "Dudești", "Industriilor", "Mihai Bravu", "Muncii", "Ozana", "Sălăjan", "Titan", "Trapezului", "Unirii", "Vitan", "Berceni", "Centrul Civic", "Giurgiului", "Olteniței", "Timpuri Noi", "Tineretului", "Văcărești", "13 septembrie", "Centrul Civic", "Cotroceni", "Dealul Spirii", "Ferentari", "Ghencea", "Giurgiului", "Rahova", "Sălaj", "Brâncuși", "Centrul Civic", "Crângași", "Drumul Taberei", "Ghencea", "Giulești", "Grozăvești", "Militari", "Andrei Mureșanu", "Becaș", "Borhanci", "Bulgaria", "Bună Ziua", "Centru", "Dâmbul Rotund", "Europa", "Făget", "Gheorgheni", "Grădini Mănăștur (Plopilor)", "Grigorescu", "Gruia", "Iris", "Între Lacuri", "Mănăștur", "Mărăști", "Someșeni", "Sopor", "Agronomie", "Alexandru cel Bun", "Aviației", "Baza 3", "Bucium", "Bucșinescu", "Bularga", "C.U.G. 1 și 2", "Canta", "Ciurchi", "Copou", "Dacia", "Dimitrie Cantemir", "Frumoasa", "Galata 1 și 2", "Gară", "Manta Roșie", "Metalurgie", "Mircea cel Bătrân", "Blașcovici", "Braytim", "Bucovina", "Calea Aradului", "Calea Lipovei", "Calea Șagului", "Cetate", "Ciarda Roșie", "Circumvalațiunii", "Dâmbovița", "Elisabetin", "Fabric", "Fratelia", "Freidorf", "Ghiroda", "Girocului", "Iosefin", "Kuncz", "Mehala", "Abatorul", "Anadalchioi", "Badea Cârțan", "Berechet", "Boreal", "Brătianu", "C.E.T.", "Casa de Cultură", "Centru", "Centrul Vechi", "Coiciu", "Compozitori", "Dacia", "Energia", "Faleza nord", "Faleza sud", "Farul", "Gara", "Groapa", "1 mai", "Bariera Vâlcii", "Bordei", "Brazda lui Novac", "Brestei", "Centru", "Craiovița Nouă", "Craiovița Veche", "Făcăi", "Ghercești", "Lascăr Catargiu", "Lăpuș-Argeș", "Lunca Jiului", "Mofleni", "Nisipuri Dorobănția", "Popoveni", "Romanești", "Rovine", "Sărari", "Astra", "Bartolomeu", "Blumăna", "Brașovechi", "Centrul Civic", "Centrul istoric", "Craiter", "Dârste", "Florilor", "Noua", "Poiana Brașov", "Scriitorilor", "Stupini", "Șcheii Brașovului", "Timiș-Triaj", "Tractorul", "Valea Cetății"];

  const KTspecializations = [
    "Kinetoterapie", //(preselectată dacă s-a ales fizioterapeut la servicii daca se poate)
    "Masaj", //(preselectată dacă s-a ales masaj la servicii daca se poate)
    "Cardiologie",
    "Balnceologie",
    "Geriartrie",
    "Limfedem",
    "Neurologie",
    "Pediatrie",
    "Traumatologie",
    "Recuperare sportivă",
  ];

  const Mspecializations = [
    "Masaj", // (preselectată dacă se alege masuer ca serviciu)
    "Masaj de relaxare",
    "Masaj terapeutic",
    "Masaj anticelulitic",
    "Masaj de drenaj limfatic",
    "Reflexoterapie",
    "Cupping",
    "Masaj cu miere",
    "Masaj cu bambus",
    "Acupunctură",
  ];

  romanianPlaces.forEach((place) => {
    placesDropdown.append(`<option value="${place}"></option>`);
  });

  services.forEach((service) => {
    servicesDropdown.append(`<option value="${service}"></option>`);
  });

  //  Populeaza specializarile cu optiunile corespunzatoare serviciilor
  inputDropdownChangeEvent.on("change", function specializationSetter() {
    if (inputDropdownChangeEvent.val() === "Kinetoterapie") {
      specializationDropdown.html("");
      KTspecializations.forEach((specialization) => {
        specializationDropdown.append(`<option value="${specialization}"></option>`);
      });
    } else if (inputDropdownChangeEvent.val() === "Masaj") {
      specializationDropdown.html("");
      Mspecializations.forEach((specialization) => {
        specializationDropdown.append(`<option value="${specialization}"></option>`);
      });
    } else {
      specializationDropdown.html("");
      services.forEach((service) => {
        specializationDropdown.append(`<option value="${service}"></option>`);
      });
    }
  });

  //--------- Index Page Search Form  ---------//

  const searchForm = $(".index-form");
  const searchURL = "templates/search.html";
  searchForm.attr("action", searchURL);

  //--------- Form Validation ---------//

  (() => {
    "use strict";

    const forms = $(".needs-validation");

    // Loop over forms and prevent submission
    Array.from(forms).forEach((form) => {
      // Required Age
      let requiredAge = 18;
      if (form.birthday) {
        // verifica daca este fiziotearpeut sau nu
        if (top.location.pathname === "/templates/terapeuti/setari-profil.html") {
          requiredAge = 20;
        }
        form.birthday.min = calculateDate(100);
        form.birthday.max = calculateDate(requiredAge);
      }

      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();

            // Register password check
            if (form.password) {
              const password = form.password;
              const passwordCheck = form.passwordCheck;
              const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
              if (password.value !== passwordCheck.value) {
                if (passwordRegex.test(passwordCheck.value)) {
                  form.passwordCheck.parentNode.querySelector(".invalid-feedback").innerText = "Parolele nu corespund!";
                }
                form.passwordCheck.setCustomValidity("Invalid");
              } else {
                form.passwordCheck.setCustomValidity("");
              }

              // Check if password matches if the user changes the password after pressing submit button
              form.passwordCheck.addEventListener("keyup", (event) => {
                if (password.value !== passwordCheck.value) {
                  event.preventDefault();
                  event.stopPropagation();

                  if (passwordRegex.test(passwordCheck.value)) {
                    form.passwordCheck.parentNode.querySelector(".invalid-feedback").innerText = "Parolele nu corespund!";
                  }
                  form.passwordCheck.setCustomValidity("Invalid");
                } else {
                  form.passwordCheck.setCustomValidity("");
                }
              });
            }
          }

          // Login password check
          if (form.loginEmail && form.loginPassword) {
            console.log("Introdu script pentru verificarea adresei de email si a parolei introduse cu cele salvate in baza de date");
            const userEmail = "email@email.com";
            const userPassword = "1234";

            if ((form.loginEmail.value !== userEmail && form.loginPassword.value !== userPassword) || (form.loginEmail.value === userEmail && form.loginPassword.value !== userPassword) || (form.loginEmail.value !== userEmail && form.loginPassword.value === userPassword) || (form.loginEmail.value === "" && form.loginPassword.value === "") || (form.loginEmail.value === userEmail && form.loginPassword.value === "") || (form.loginEmail.value === "" && form.loginPassword.value === userPassword)) {
              form.loginEmail.setCustomValidity("Invalid");
              form.loginPassword.setCustomValidity("Invalid");
            } else {
              form.loginEmail.setCustomValidity("");
              form.loginPassword.setCustomValidity("");
            }
          }

          // Birthday check
          if (form.birthday) {
            // Verifică vârsta
            const age = calculateAge(form.birthday.value);
            const birthdayParent = document.querySelector("#birthday").parentNode;
            const invalidFeedback = birthdayParent.querySelector(".invalid-feedback");

            if (age < requiredAge) {
              invalidFeedback.innerText = "Nu aveți vârsta necesară pentru a vă putea înregistra!";
            }
          }

          // Activity checkboxes
          if (form.activity) {
            const formChecks = document.querySelector(".specializari-checks").querySelectorAll(".form-check-input");
            const checkedCheckboxes = Array.from(formChecks).filter((checkBox) => checkBox.checked);

            if (checkedCheckboxes.length < 1 || checkedCheckboxes.length > 6) {
              formChecks.forEach((checkBox) => {
                checkBox.setCustomValidity("Invalid");
                document.querySelector(".activity-feedback").style.display = "block";
              });
            } else {
              formChecks.forEach((checkBox) => {
                checkBox.setCustomValidity("");
                checkBox.required = false;
              });
            }
          }

          form.classList.add("was-validated");
        },
        false
      );
    });

    function calculateDate(age) {
      const todayDate = new Date();
      const calculatedDate = new Date(todayDate.setFullYear(todayDate.getFullYear() - age));
      return calculatedDate.toJSON().split("T")[0];
    }

    function calculateAge(userBirthdate) {
      let today = Date.now();
      let birthday = new Date(userBirthdate);
      let month = new Date(today - birthday.getTime());
      let year = month.getUTCFullYear();
      let age = Math.abs(year - 1970);
      return age;
    }
  })();

  //--------- Activity Switch in therapists Dashboard page ---------//

  //Image upload script - adauga suportul pentur Safari (RO)
  $("#save-image").css("display", "none");
  // Prepare the preview for profile picture
  $("#image-input").change(function () {
    readURL(this);

    $(".controls").css("display", "flex");
    $("#upload-image").css("display", "none");
    $("#save-image").css("display", "inline-block");
    // $('.settings-upload').css('height', '')

    jQuery(function () {
      var picture = $("#image-preview");

      // Make sure the image is completely loaded before calling the plugin
      picture.one("load", function () {
        // Initialize plugin (with custom event)
        picture.guillotine({ eventOnChange: "guillotinechange" });

        // Display inital data
        var data = picture.guillotine("getData");
        for (var key in data) {
          $("#" + key).html(data[key]);
        }
        picture.guillotine("rotateLeft");
        picture.guillotine("rotateRight");
        picture.guillotine("fit");

        // Bind button actions
        $("#rotate_left").click(function () {
          picture.guillotine("rotateLeft");
        });
        $("#rotate_right").click(function () {
          picture.guillotine("rotateRight");
        });
        $("#fit").click(function () {
          picture.guillotine("fit");
        });
        $("#zoom_in").click(function () {
          picture.guillotine("zoomIn");
        });
        $("#zoom_out").click(function () {
          picture.guillotine("zoomOut");
        });

        // Update data on change
        picture.on("guillotinechange", function (ev, data, action) {
          data.scale = parseFloat(data.scale.toFixed(4));
          for (var k in data) {
            $("#" + k).html(data[k]);
          }
        });
      });

      // Make sure the 'load' event is triggered at least once (for cached images)
      if (picture.prop("complete")) picture.trigger("load");

      $("#save-image").click(function () {
        // let image = $('#image-preview');
        let data = picture.guillotine("getData");

        $(".controls").css("display", "none");
        $("#upload-image").css("display", "inline-block");
        $("#save-image").css("display", "none");

        picture.guillotine("disable");
        $(".guillotine-window body.guillotine-dragging").css("cursor", "pointer !important");
      });
    });
  });

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = src;
    });
  }

  function resizeImage(image, maxWidth, maxHeight) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const ratio = Math.min(maxWidth / image.width, maxHeight / image.height);
    canvas.width = image.width * ratio;
    canvas.height = image.height * ratio;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas;
  }

  function compressImage(canvas, targetSize) {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64data = reader.result;
            const image = new Image();
            image.src = base64data;
            image.onload = () => {
              const canvas = document.createElement("canvas");
              canvas.width = image.width;
              canvas.height = image.height;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(image, 0, 0);
              canvas.toBlob(
                (webpBlob) => {
                  const webpReader = new FileReader();
                  webpReader.readAsDataURL(webpBlob);
                  webpReader.onloadend = () => {
                    resolve(webpReader.result);
                  };
                },
                "image/webp",
                0.8
              );
            };
          };
        },
        "image/jpeg",
        0.8
      );
    });
  }
  // Upload image, resize it to 100 kb and then load it to be processed by the user
  async function readURL(input) {
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      const MAX_WIDTH = 500;
      const MAX_HEIGHT = 500;
      // 100KB target size
      const MAX_SIZE = 100 * 1024;

      reader.onload = async (event) => {
        try {
          const image = await loadImage(event.target.result);
          const resizedCanvas = resizeImage(image, MAX_WIDTH, MAX_HEIGHT);
          const compressedDataUrl = await compressImage(resizedCanvas, MAX_SIZE);
          $("#image-preview").attr("src", compressedDataUrl).fadeIn("slow");
        } catch (err) {
          console.error("Error resizing image:", err);
        }
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      alert("Vă rugăm să încărcați o imagine validă!");
      return;
    }
  }
});

function checkerFunction() {
  if ($("#checker").is(":checked")) {
    $("#toggle-inactive").css("color", "#f44336");
    $("#toggle-active").css("color", "black");
    // Terapeut indisponibil
  } else {
    $("#toggle-active").css("color", "#108F96");
    $("#toggle-inactive").css("color", "black");
    // Terapeut disponibil
  }
}

// Table Sorting - Pagina Pacient
const rows = document.querySelectorAll(".program-table tr.collapsible");
rows.forEach((row) => {
  const contentRow = row.nextElementSibling;
  contentRow.style.display = "none";
  row.addEventListener("click", function () {
    rows.forEach((otherRow) => {
      if (otherRow !== this) {
        const otherContentRow = otherRow.nextElementSibling;
        otherContentRow.style.maxHeight = "0";
        otherContentRow.style.display = "none";
      }
    });
    contentRow.style.display = contentRow.style.display === "none" ? "table-row" : "none";
  });
});

function sortTable(table, column, asc) {
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  // Sort the rows based on the specified column and order
  const order = asc ? 1 : -1;
  rows.sort((a, b) => {
    const aValue = a.querySelectorAll("td")[column].textContent;
    const bValue = b.querySelectorAll("td")[column].textContent;
    return order * aValue.localeCompare(bValue);
  });

  // Empty the table body and add the sorted rows
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
  rows.forEach((row) => tbody.appendChild(row));
}
const table = document.querySelector("#scheduleTable");

if (table) {
  // Add buttons and event listeners to table headers with "sort" class
  table.querySelectorAll("thead th").forEach((th, index) => {
    const button = document.createElement("button");
    button.classList.add("sort-button");
    button.textContent = "▼";
    button.addEventListener("click", () => {
      const asc = button.textContent === "▲";
      sortTable(table, index, asc);
      button.textContent = asc ? "▼" : "▲";
    });
    th.appendChild(button);
  });
}

const isNotLogged = document.querySelector("#loggedOut");

if (isNotLogged) {
  document.querySelector(".auth").style.display = "none";
  document.querySelector(".logIn").style.display = "block";
} else {
  document.querySelector(".auth").style.display = "block";
  document.querySelector(".logIn").style.display = "none";
  document.querySelector(".popover-name").innerText = "George";
  document.querySelector(".popover-function").innerText = "Kinetoterapeut";
}
