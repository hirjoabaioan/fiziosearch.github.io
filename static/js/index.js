// var pageURL = $(location).attr("href");

// var pageAdress = "https://hirjoabaioan.github.io/fiziosearch.github.io/"
// if (pageURL == pageAdress){
//     $(document).ready(function() {
//         $('nav').removeClass('sticky-top').addClass('fixed-top');
//     });
// }

// $('mainMenu a').on('click', function(e){
//   e.preventDefault();
//   insertContent($(this).attr('href'));
// })

// function insertContent(pageHref){
//   pageHref = pageHref.replace('#', '');
//   $.ajax({
//     url: `templates/${pageHref}.html`,
//   }).done(function(data){
//     console.log(data);
//     $('#pageContent').html(data);;
//   })
// }
// window.onload = insertContent(location.hash);




var windowCheck = true;
var checkText = "Caută un terapeut în funcție de sectorul sau cartierul în care locuiești!";

function closeWindow(){
  console.log("press");
  console.log($(window).width() > 995);
  console.log($(window).width());
  // if($(window).width() > 995){
    console.log(">995");
    var replace = `
    <div class="d-flex jusify-content-start align-items-center" style="width: 500px;"  id="startPage">
        <span id="txtCheck">Alege un terapeut din listă</span>
    </div>
    `;

    $('#cont').html(replace);
  // }
  console.log("pass");
  windowCheck = false;
  $('#hide-call').removeClass('hide-call');
  $('#data-on').addClass('hide-call');
};

function namesList (){
  var names = [];
  var locations = [];
  therapists.forEach(function(therapist){
      names.push(therapist.name);
  })
}



// function searchTherapists(){
//     var foundTherapists = [];
//     var searchItem = $('#therapist-name').val();
//     var values = therapists
//     var location = $
//     if(searchItem){
//       //cautat dupa nume
//         therapists.forEach(function(therapist){
//             var fName = therapist.name;
//             if (searchItem === fName){
//                 foundTherapists.push(therapist);
//             }
//         });
//       //cautat dupa locatie
        
//         therapists.forEach(function(therapist){
//           var fAddress = therapist.address;
//           for(var loc = 0; loc<fAddress.length; loc++){
//             if(searchItem === fAddress[loc])
//               foundTherapists.push(therapist);
//           }
//         });

        
//       //cautat dupa sector - daca se cauta sectorul sa arate terapeutii care opereaza in sectorul respectiv chiar daca ei nu au dat sectorul ci doar zona de operare
//       var keys = Object.getOwnPropertyNames(locations);
//       console.log(keys);
//       keys.forEach(i =>{
//         // compara daca 
//         for(var j = 0; j<locations[i].length; j++){
//           cosnole.log(locations[i][j]);
//           if(locations[i][j] === searchItem){
//               foundTherapists.push(therapist);
//           }
//         }
//       });
//     }
//     else {
//         foundTherapists = therapists;
//     }

//     displayTherapists(foundTherapists);
//     showTherapistData(foundTherapists);
// }

var search = $('#therapist-name');
search.on('keypress', function(e){
  if (e.which == 13){
    searchTherapists()
  }
});

function searchTherapists(){
    var foundTherapists = [];
    var searchItem = $('#therapist-name').val();
    var tsList = [];
    var id = therapists.id; // verifica sa nu existe dubluri inainte de a afisa rezultatele
    if(searchItem){

      //cautat dupa nume
      therapists.forEach(function(therapist){
        var fName = therapist.name;
        if (searchItem === fName){
          foundTherapists.push(therapist);
        }
      });

      //cautat dupa locatie
      therapists.forEach(function(therapist){
        var fAddress = therapist.address;
        for(var loc = 0; loc<fAddress.length; loc++){
          if(searchItem === fAddress[loc])
            foundTherapists.push(therapist);
        }
      });

        
      //cautat dupa sector 
      therapists.forEach(function(therapist){
        var keys = Object.getOwnPropertyNames(locations);
        keys.forEach(i =>{
          var fAddress = therapist.address;
            if(i === searchItem){
              for(var terLoc = 0; terLoc<fAddress.length; terLoc++){
                for(var j = 0; j<locations[i].length; j++){
                  if(locations[i][j] === fAddress[terLoc]){
                      foundTherapists.push(therapist);
                  }
                }
              }
            }
        });
      });
    }
    else {
        foundTherapists = therapists;
    }
    // Elimina dublurile
    foundTherapists = foundTherapists.filter((value, index, self) => index === self.findIndex((t) => (t.id === value.id)));
    
    displayTherapists(foundTherapists.sort(()=> Math.random() - 0.5));
    showTherapistData(foundTherapists);
}




function displayTherapists(therapists) {
    
    var therapistsHtml = "";

    therapists.forEach(function(therapist){
        var id = therapist.id;
        var pic = therapist.picture;
        var name = therapist.name;
        var prename = therapist.prename;
        var address = therapist.address;

        var loc = [];
        address.forEach(function(address){
          loc.push(`<span class="loc-ls">${address}; </span>`);
        })


        therapistsHtml += `
            <div class="ts-container" id="${id}" onlcick="showTherapistPage()">
                <div class="ts-container-background">
                    <div class="d-flex row p-2 justify-content-between align-items-center">
                        <div class="col-2 ms-2 ts-pic d-flex justify-content-center align-items-center">
                            <img src="../static/images/${pic}" class="profile-picture" alt="profile pic">
                        </div>
                        <div class="col-10 d-flex row ts-details">
                            <span class="col-12">${name} ${prename}</span>
                            <span class="col-12 d-inline-block text-truncate trunc t-loc">${loc}</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
    $(".ts-list").html(therapistsHtml);
    
}

$(window).resize(function(){

  if($(window).width() < 995 & $('#txtCheck').text() == checkText & windowCheck){
    $('#hide-call').removeClass('hide-call');
    $('#data-on').addClass('hide-call');
    console.log($(window).width() + " " + $('#txtCheck').text() + " " + windowCheck);
  }

  if($(window).width() < 995 & $('#close').text() == "X" & windowCheck){
    $('#data-on').addClass('hide-call');
    $('#hide-call').removeClass('hide-call');
    console.log($(window).width() + " " + $('#close').text() + " " + windowCheck)
  }
  if($('#txtCheck').text() == checkText || $('#close').text() == "X"  & windowCheck){
    console.log($('#txtCheck').text() + " " + $('#close').text()+ " " + windowCheck)
    $('#data-on').removeClass('hide-call');
    $('#hide-call').removeClass('hide-call');
  }
  if($(window).width() > 995){
    $('#data-on').removeClass('hide-call');
    $('#hide-call').removeClass('hide-call');
  }
  
  console.log("fail");
});

function showTherapistData(therapists) {
    
    $(".ts-container").click(function(){
    var i = $(this).attr("id");
    var today = new Date();
      therapists.forEach(function(therapist){
          var id = Number(therapist.id);
          var picture = therapist.picture;
          var name = therapist.name;
          var prename = therapist.prename;
          var phoneNumber = therapist.phoneNumber;
          var email = therapist.email;
          var reviews = therapist.reviews;
          var profession = therapist.profession;
          var specialization = therapist.specialization;
          var exp = (today.getFullYear() - new Date(therapist.exp).getFullYear()) + "&nbsp;ani";
          var about = therapist.about;
          var courses = therapist.courses;
          var address = therapist.address;
          if(i == id){
            $('#cont').removeClass('s-h');
              if($(window).width() < 995)
                $('#hide-call').addClass('hide-call');
              createDetails(name, prename, phoneNumber, email, picture, reviews, profession, specialization, exp, about, courses, address);
          }
      });
    })
  }
  
  function createDetails(name, prename,  phoneNumber, email, picture, reviews,profession, specialization, exp, about, courses, address) {
    var cours = [];
    var loc = [];
    var email = (typeof email === 'undefined' || email === '') ? '' : `<span class="col-12 d-flex justify-content-end align-items-center"><span class="fw-bold">Email:</span>&nbsp;${email}</span>`;

    courses.forEach(function(cour){
        cours.push(`
        <div class="col-12 d-flex row justyfy-content-start align-items-center">
            <span class="col-12 fw-bold lead-text">${cour}</span>
        </div>`)
    });


    address.forEach(function(addr){
      loc.push(`<span class="loc-ls">${addr}; </span>`);
    })
        // <i class="picture bi bi-person-circle"></i>
    var html =`
        <div class="container p-2 h-100" id="data-on">
          
          <div class="d-flex row h-100 t-container">
            <div class="d-flex justify-content-end align-items-center" onclick="closeWindow()">
              <button type="button" class="btn-close" aria-label="Close"></button>
            </div>
            <div class="col-12 d-flex row justify-content-center align-items-center p-2 t-description">
              <div class="d-flex justify-content-center align-items-center col-4 profile-cropper">
                <img src="../static/images/${picture}" class="profile-picture" alt="profile pic">                         
              </div>
              <div class="col-8 d-flex row justify-content-center align-items-center">
                
                <div class="col-12 mb-5 name d-flex justify-content-start align-items-center">
                  <span class="h1">${name} ${prename}</span>
                </div>
                <div class="col-12 d-flex row datas justify-content-start align-items-center">
                  <div class="col-12">
                    <div class="titlu">
                      <span>${profession}</span>
                    </div>
                    <div class="specializasion">
                    <span>${specialization}</span>
                    </div>
                  </div>                                  
                </div>
                <div class="col-12 d-flex justify-content-end align-items-center">
                  <div class="t-contact d-flex">
                    <div class="d-flex col-12 w-auto justify-content-end align-items-center">
                      <button class="but btn btn-primary btn-data" id="hide" onclick="showData()">Afișează datele</button>
                      <div class="hide" id="show-data">
                        <div class="d-flex row">
                          <span class="col-12 d-flex justify-content-end align-items-center"><span class="fw-bold">Telefon:</span>&nbsp;${phoneNumber}</span>  
                          ${email}
                        </div>                
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex col-12 row justify-content-center align-items-center t-about">
              <div class="d-flex row ts-scroll  t-list">
                <div class="col-12 d-flex row justify-content-between align-items-top">
                  <div class="col-6 d-flex row sumar justify-content-center align-items-top">
                    <div class="col-12 d-flex">
                      <span class="h3 fs-5 fw-bold">Sumar</span>
                    </div>
                    <hr>
                    <div class="col-12 d-flex row justyfy-content-between align-items-center">
                      <span class="col-8 fw-bold lead-text">Profesie:</span>
                      <span class="col-4 after-text">${profession}</span>
                    </div>
                    <div class="col-12 d-flex row justyfy-content-between align-items-center">
                      <span class="col-8 fw-bold lead-text">Specializare:</span>
                      <span class="col-4 after-text justify-content-end">${specialization}</span>
                    </div>
                    <div class="col-12 d-flex row align-items-center">
                      <span class="col-8 fw-bold lead-text">Experiență:</span>
                      <div class="col-4 after-text justify-content-start">
                        <span>${exp}</span>
                      </div>
                    </div>
                  </div>      
                  <div class="col-6 d-flex row sumar justify-content-center align-items-top">
                    <div class="col-12 d-flex">
                      <span class="h3 fs-5 fw-bold">Activitate</span>
                    </div>
                    <hr>
                    <div class="col-12 d-flex row justyfy-content-between align-items-center">
                      <span class="col-8 fw-bold lead-text">Locații:</span>
                      <div class="col-4 after-text address">

                      </div>
                    </div>
                    <div class="col-12 d-flex row justyfy-content-between align-items-center">
                      <span class="col-8 fw-bold lead-text">Recenzii:</span>
                      <span class="col-4 after-text justify-content-end">${reviews}</span>
                    </div> 
                  </div>
                </div>
                <div class="col-12 d-flex pt-5 row justify-content-between align-items-center">
                  <div class="col-6 d-flex row sumar">
                    <div class="col-12 d-flex">
                      <span class="h3 fs-5 fw-bold">Cursuri și acreditări</span>
                    </div>
                    <hr>
                      ${cours}
                  </div>
                  <div class="col-6 d-flex row sumar">
                    <div class="col-12 d-flex">
                      <span class="h3 fs-5 fw-bold">Despre</span>
                    </div>
                    <hr>
                    <div class="col-12 d-flex row justyfy-content-start align-items-center">
                      <p class="col-12 m-0 p-0 lead-text loc-ls">${about}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    
      `;
      

      document.querySelector('#cont').innerHTML = html;
      $('.address').html(loc);
  
    }

// $(document).ready(function(){
//   $('#hide').click(function(){
//     $('#hide').hide();
//     $('#show-data').show();
//   });
// });

function showData(){
  $('#hide').hide();
  $('#show-data').show();
}

function addEmail() {
    var text = document.getElementById("email").value;
    var eObj = [];
    const storedIdea = localStorage.getItem("storedIdea");
    storedIdea.setItem("storedIdea", text);
    eObj.push(text);
    console.log(storedIdea);
    var li = "<li>" + text + "&nbsp" + "<input type=checkbox>" + "Ready" + "</input>" + "&nbsp" + "<input type=text>" + "</input>" + "</li>"
    document.getElementById("list").innerHTML += li;
}

var userObj = {
    "email": "email@email.com",
}

