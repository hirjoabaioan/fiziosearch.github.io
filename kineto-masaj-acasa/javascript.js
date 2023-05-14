//Import Cloudinary
// import { Cloudinary } from "@cloudinary/url-gen";
// import { Resize } from "@cloudinary/url-gen/actions";

// import ImageKit from "imagekit-javascript";

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
  })();

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

  // Script for image upload, resizing and compressing
  // $("#fileInput").change(function () {
  //   var file = this.files[0];
  //   var reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function (event) {
  //     $("#preview").attr("src", event.target.result);
  //   };
  // });

  // const cldInstance = new Cloudinary({ cloud: { cloudName: "ddi3ezx01" } });

  // //Upload image
  // const uploadWidget = cloudinary.creatUploadWidget(
  //   {
  //     cloudName: ddi3ezx01,
  //     uploadPreset: snqii95m,
  //     cropping: true,
  //     sources: ["local"],
  //     multiple: false,
  //     folder: "users",
  //     clientAllowedFormats: ["images"],
  //     maxImageFileSize: 2000000,
  //     maxImageWidth: 100,
  //   },
  //   (error, result) => {
  //     if (!error && result && result.event === "success") {
  //       console.log("Done! Here is the image info: ", result.info);
  //       document.getElementById("uploadImage").setAttribute("src", result.info.secure_url);
  //     }
  //   }
  // );

  // document.getElementById("upload_widget").addEventListener(
  //   "click",
  //   function () {
  //     uploadWidget.open();
  //   },
  //   false
  // );

  // // Transform

  // const myImage = cldInstance.image("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg").setDeliveryType("fetch").resize(Resize.fill().width(100).height(150));

  // console.log(myImage.toURL());
  // //res.cloudinary.com/<cloud_name>/image/fetch/c_fill,h_150,w_100/https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg

  // https: $("#compressAndCrop").click(function () {
  //   var img = document.getElementById("preview");
  //   var maxSize = 100; // maximum size in KB
  //   var width = img.width;
  //   var height = img.height;
  //   if (width > height) {
  //     if (width > maxSize * 1024) {
  //       height *= (maxSize * 1024) / width;
  //       width = maxSize * 1024;
  //     }
  //   } else {
  //     if (height > maxSize * 1024) {
  //       width *= (maxSize * 1024) / height;
  //       height = maxSize * 1024;
  //     }
  //   }

  //   $.ajax({
  //     url: "https://api.cloudinary.com/v1_1/ddi3ezx01/image/upload",
  //     type: "POST",
  //     data: {
  //       file: img.src,
  //       upload_preset: "snqii95m",
  //       crop: "fill",
  //       width: size,
  //       height: size,
  //       quality: "auto",
  //     },
  //     success: function (data) {
  //       $("#preview").attr("src", data.secure_url);
  //     },
  //   });
  // });
});

// const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/ddi3ezx01/upload";
// const CLOUDINARY_UPLOAD_PRESET = "snqii95m";

// const imgPreview = document.getElementById("img-preview");
// const fileUpload = document.getElementById("file-upload");

// fileUpload.addEventListener("change", function (event) {
//   const file = event.target.files[0];
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

//   axios({
//     url: CLOUDINARY_URL,
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     data: formData,
//   })
//     .then(function (res) {
//       console.log(res);
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// });

const imagekit = new ImageKit({
  publicKey: "public_NvmSDeqlwPDb2eKuraNmfVhJsYo=",
  urlEndpoint: "https://ik.imagekit.io/4eksvaiete",
  authenticationEndpoint: "http://127.0.0.1:5500/templates/terapeuti/setari-profil.html",
});

function upload(data) {
  const file = document.getElementById("file1");

  imagekit
    .upload({
      file: file.files[0],
      fileName: "abc1.jpg",
      tags: ["tag1"],
      extensions: [
        {
          name: "aws-auto-tagging",
          minConfidence: 80,
          maxTags: 10,
        },
      ],
    })
    .then((result) => {
      console.log(result);
    })
    .then((error) => {
      console.log(error);
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

//vezi in ce pagini e
$(document).ready(function () {
  // Prepare the preview for profile picture
  $("#wizard-picture").change(function () {
    readURL(this);
  });
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $("#wizardPicturePreview").attr("src", e.target.result).fadeIn("slow");
    };
    reader.readAsDataURL(input.files[0]);
  }
}

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
