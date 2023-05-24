
// Accessing the Document through jQuery
$(document).ready(function () {
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

  // Script pentru dezactivarea trimiterii formularului dacă sunt câmpuri invalide
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


  if (top.location.pathname === "/templates/search.html" || top.location.pathname === "/templates/pacienti/mesagerie.html" || top.location.pathname === "/templates/terapeuti/mesagerie.html") {
    $(".contact-info").hide();

    $(window).resize(function () {
      if ($(window).width() < 750 && $(".list-container").is(":visible")) {
        $(".info-container").hide();
      } else if ($(window).width() > 751) {
        $(".info-container").show();
      }
    });

    if (window.matchMedia("(max-width: 47rem)").matches) {
      $(".info-container").hide();
    }

    if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
      $(".med").removeClass("btn btn-secondary");
    }

    $(".contact-button").click(function () {
      $(".contact-info").show();
      $(this).hide();
    });

    $(".person-box").click(function () {
      if (window.matchMedia("(max-width: 47rem)").matches) {
        $(".list-container").removeClass("d-flex");
        $(".list-container").hide();
      }
      $(".info-container").show();
      $(".info-container").addClass("grid");
    });

    $("#close").click(function () {
      if (window.matchMedia("(max-width: 47rem)").matches) {
        $(".list-container").addClass("d-flex");
        $(".list-container").show();
        $(".info-container").removeClass("grid");
        $(".info-container").hide();
      }

      if (window.matchMedia("(min-width: 47rem)").matches) {
        var replace = `
                <div class="grid jusify-content-start align-items-center" style="width: 500px;"  id="startPage">
                    <span id="txtCheck">Alege un terapeut din listă</span>
                </div>
                `;

        $(".info-container").html(replace);
      }
    });
  }

  if (top.location.pathname === "/templates/terapeuti/notificari.html" || top.location.pathname === "/templates/pacienti/notificari.html") {
    $(".notification-condition").each(function () {
      if ($(this).text() === "Văzut") {
        $(this).css({ color: "grey" });
        $(this).siblings().css({ color: "grey" });
      }
    });
  }

  if (top.location.pathname === "/templates/pacienti/dashboard-pacient.html" || top.location.pathname === "/templates/terapeuti/dashboard-terapeut.html") {
    let ySums = [300, 450, 200, 150, 300, 400, 100, 150, 300, 150];
    let xDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    new Chart("sumChart", {
      type: "line",
      data: {
        labels: xDays,
        datasets: [
          {
            fill: false,
            lineTension: 0,
            backgroundColor: "#108F96",
            borderColor: "rgba(0,0,255,0.1)",
            data: ySums,
          },
        ],
      },
      options: {
        legend: { display: false },
        scales: {
          yAxes: [{ ticks: { min: 6, max: 16 } }],
        },
      },
    });
  }

  if (top.location.pathname === "/templates/abonamente.html") {
    // hide next and prev buttons
    if ($(window).width() > 1023) {
      $(".rem-carousel").removeClass("carousel carousel-dark slide");
      $(".rem-inner").removeClass("carousel-inner");
      $(".rem-item").removeClass("carousel-item");
      //   $(".inner-cards").addClass("row");
      $(".desktop-hide").css({ display: "none" });
    }
    $(window).resize(function () {
      if ($(window).width() > 1023) {
        $(".rem-carousel").removeClass("carousel carousel-dark slide");
        $(".rem-inner").removeClass("carousel-inner");
        $(".rem-item").removeClass("carousel-item");
        $(".inner-cards").addClass("row");
        $(".desktop-hide").css({ display: "none" });
      }
      if ($(window).width() < 1024) {
        $(".rem-carousel").addClass("carousel carousel-dark slide");
        $(".rem-inner").addClass("carousel-inner");
        $(".rem-item").addClass("carousel-item");
        $(".inner-cards").removeClass("row");
        $(".desktop-hide").css({ display: "flex" });
      }
    });
  }


  // For the Activity Switch on therapists Dashboard page
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


  //Image upload script
    $('#save-image').css('display', 'none');
    // Prepare the preview for profile picture
    $("#image-input").change(function () {
      readURL(this);

      $(".controls").css('display', 'flex');
      $('#upload-image').css('display', 'none');
      $('#save-image').css('display', 'inline-block');
      // $('.settings-upload').css('height', '') 
      

      jQuery(function() {
        var picture = $('#image-preview');

        // Make sure the image is completely loaded before calling the plugin
        picture.one('load', function(){
          // Initialize plugin (with custom event)
          picture.guillotine({eventOnChange: 'guillotinechange'});

          // Display inital data
          var data = picture.guillotine('getData');
          for(var key in data) { $('#'+key).html(data[key]); }
          picture.guillotine('rotateLeft');
          picture.guillotine('rotateRight');
          picture.guillotine('fit');

          // Bind button actions
          $('#rotate_left').click(function(){ picture.guillotine('rotateLeft'); });
          $('#rotate_right').click(function(){ picture.guillotine('rotateRight'); });
          $('#fit').click(function(){ picture.guillotine('fit'); });
          $('#zoom_in').click(function(){ picture.guillotine('zoomIn'); });
          $('#zoom_out').click(function(){ picture.guillotine('zoomOut'); });

          // Update data on change
          picture.on('guillotinechange', function(ev, data, action) {
            data.scale = parseFloat(data.scale.toFixed(4));
            for(var k in data) { $('#'+k).html(data[k]); }
          });
        });

        // Make sure the 'load' event is triggered at least once (for cached images)
        if (picture.prop('complete')) picture.trigger('load')

        $('#save-image').click(function(){
          // let image = $('#image-preview');
          let data = picture.guillotine('getData');

          $(".controls").css('display', 'none');
          $('#upload-image').css('display', 'inline-block');
          $('#save-image').css('display', 'none');

          picture.guillotine('disable');
          $(".guillotine-window body.guillotine-dragging").css('cursor', 'pointer !important')
                        

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
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const ratio = Math.min(maxWidth / image.width, maxHeight / image.height);
    canvas.width = image.width * ratio;
    canvas.height = image.height * ratio;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas;
  }

  function compressImage(canvas, targetSize) {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          const image = new Image();
          image.src = base64data;
          image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0);
            canvas.toBlob((webpBlob) => {
              const webpReader = new FileReader();
              webpReader.readAsDataURL(webpBlob);
              webpReader.onloadend = () => {
                resolve(webpReader.result);
              };
            }, 'image/webp', 0.8);
          };
        };
      }, 'image/jpeg', 0.8);
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
          console.error('Error resizing image:', err);
        }
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      alert('Vă rugăm să încărcați o imagine validă!');
      return;
    }
  }

});


// Script pentru sortarea tabelelor - Pagina Pacient
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

//In Pagina Pacient
function sortTable(table, column, asc) {
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));

  // Sort the rows based on the specified column and order
  const order = asc ? 1 : -1;
  rows.sort((a, b) => {
    const aValue = a.querySelectorAll('td')[column].textContent;
    const bValue = b.querySelectorAll('td')[column].textContent;
    return order * aValue.localeCompare(bValue);
  });

  // Empty the table body and add the sorted rows
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
  rows.forEach(row => tbody.appendChild(row));
}
const table = document.querySelector('#scheduleTable');

// Add buttons and event listeners to table headers with "sort" class
table.querySelectorAll('thead th').forEach((th, index) => {
  const button = document.createElement('button');
  button.classList.add('sort-button');
  button.textContent = '▼';
  button.addEventListener('click', () => {
    const asc = button.textContent === '▲';
    sortTable(table, index, asc);
    button.textContent = asc ? '▼' : '▲';
  });
  th.appendChild(button);
});



// function compressImage(canvas, targetSize) {
//   let quality = 1;
//   let imageData = canvas.toDataURL('image/jpeg', quality);

//   while (imageData.length > targetSize) {
//     quality -= 0.1;
//     imageData = canvas.toDataURL('image/jpeg', quality);
//   }

//   return imageData;
// }



// cod email: 370055
