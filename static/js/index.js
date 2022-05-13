// var pageURL = $(location).attr("href");

// var pageAdress = "https://hirjoabaioan.github.io/fiziosearch.github.io/"
// if (pageURL == pageAdress){
//     $(document).ready(function() {
//         $('nav').removeClass('sticky-top').addClass('fixed-top');
//     });
// }



function closeWindow(){
    var replace = `
    <div class="d-flex jusify-content-start align-items-center" style="width: 500px;">
        <span>Alege un terapeut din listă</span>
    </div>
    `;
    document.getElementById('cont').innerHTML = replace;
};



function searchTherapists(){
    var foundTherapists = [];
    var tName = document.getElementById('therapist-name').value;
    if(tName){
        therapists.forEach(function(therapist){
            var fName = therapist.name;
            if (tName === fName){
                foundTherapists.push(therapist);
            }
        });
    }
    else {
        foundTherapists = therapists;
    }

    displayTherapists(foundTherapists);
    showTherapistData(foundTherapists);

}

function showNumbers(){

  var tableCreate = "";
  var tr = "";
  var trName = "";
  var trPhone = "";
  var trEmail = "";



  therapists.forEach(function(therapist){
    var id = therapist.id + 1;
    var name = therapist.name;
    var phone = therapist.phoneNumber;
    var email = therapist.email;

    tr +=`
    <tr>
      <td>${name}</td>
      <td>${phone}</td>
      <td>${email}</td>
    </tr>`;

    trName += `
      <td>${name}</td>
    `
    trPhone += `
    <td>${phone}</td>
    `
    trEmail += `
    <td>${email}</td>
  `
  });

  tableCreate = `
  <thead>
    <th>Nume</th>
    <th>Telefon</th>
    <th>Email</th>
  </thead>
  <tbody>
    ${tr}
  </tbody>
  `

  $('#testing').html(tableCreate);
}

function displayTherapists(therapists) {
    
    var therapistsHtml = "";

    therapists.forEach(function(therapist, index){
        var pic = therapist.picture;
        var name = therapist.name;
        var review = therapist.reviews;


        therapistsHtml += `
            <div class="ts-container" id="${index + 1}" onlcick="showTherapistPage()">
                <div class="ts-container-background">
                    <div class="d-flex row p-2 justify-content-between">
                        <div class="col-2 ts-pic">
                            <img src="../static/images/${pic}" class="ts-pic" alt="profile pic">
                        </div>
                        <div class="col-10 d-flex row ts-details">
                            <span class="col-12">${name}</span>
                            <span class="col-12">${review}</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
    $(".ts-list").html(therapistsHtml);
    
}

function showTherapistData(therapists) {
	
    $(".ts-container").click(function(){
        var i = $(this).attr("id");
      therapists.forEach(function(therapist){
          var id = Number(therapist.id);
          var name = therapist.name;
          var reviews = therapist.reviews;
          var profession = therapist.profession;
          var specialization = therapist.specialization;
          var exp = therapist.exp;
          var about = therapist.about;
          var courses = therapist.courses;
          var address = therapist.address;
          if(i == id)
              createDetails(name, reviews, profession, specialization, exp, about, courses, address);
      });
    })
  }
  
  function createDetails(name, reviews,profession, specialization, exp, about, courses, address) {
    var cours = [];

    courses.forEach(function(course){
        cours.push(`<div class="col-12 d-flex row justyfy-content-start align-items-center">
            <span class="col-12 fw-bold lead-text">${course}</span>
        </div>`)
    });
        
    var html =`
        <div class="container p-2 h-100">
            <div class="d-flex row h-100 t-container">
                    <div class="col-12 d-flex row justify-content-center align-items-top p-0 t-description">
                      <div class="d-flex justify-content-center align-items-center col-4">
                        <i class="picture bi bi-person-circle"></i>                         
                      </div>
                      <div class="col-8 d-flex row justify-content-center align-items-center">
                        <div class="d-flex justify-content-end align-items-center m-0 p-0" onclick="closeWindow()">
                            <span class="fw-bolder" id="close">X</span>
                        </div>
                        <div class="col-12 mb-5 name d-flex justify-content-start align-items-center">
                          <span class="h1">${name}</span>
                        </div>
                        <div class="col-12 d-flex row datas justify-content-start align-items-center">
                          <div class="col-6">
                            <div class="titlu">
                              <span>${profession}</span>
                            </div>
                            <div class="address">
                              <span>${address}</span>
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="t-contact">
                              <div class="d-flex col-12 w-auto justify-content-start align-items-center order-2 box-el">
                                <button class="but btn btn-primary but-data" id="show" onclick="showData()">Afișează datele</button>
                              </div>
                            </div>
                          </div>                                    
                        </div>
                      
                        <!-- <div class="t-reviews col-12">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star"></i>
                       </div> -->
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
                              <span class="col-4 after-text justify-content-end">${exp}</span>
                            </div>
                          </div>
                          
                           <div class="col-6 d-flex row sumar justify-content-center align-items-top">
                            <div class="col-12 d-flex">
                              <span class="h3 fs-5 fw-bold">Activitate</span>
                            </div>
                            <hr>
                            <div class="col-12 d-flex row justyfy-content-between align-items-center">
                              <span class="col-8 fw-bold lead-text">Aprecieri:</span>
                              <span class="col-4 after-text">*****</span>
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
                              <p class="col-12 lead-text">${about}</p>
                            </div>
                            
                          </div>
                        </div>
  
                        </div>
                    </div>
                    </div>
                    </div>
    
      `;
      

      document.querySelector('#cont').innerHTML = html;
  
    }

function showData(){

  document.getElementById("show-data").classList.remove("hide");
  document.getElementById("hide-data").classList.remove("d-flex");
  document.getElementById("hide-data").classList.add("hide");

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

