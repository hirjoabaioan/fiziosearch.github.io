var pageURL = $(location).attr("href");

var pageAdress = "http://127.0.0.1:8000/"
if (pageURL == pageAdress){
    $(document).ready(function() {
        $('nav').removeClass('sticky-top').addClass('fixed-top');
    });
};


// function searchTherapists(){
//     var foundTherapists = [];
//     var tName = document.getElementById('therapist-name').value;
//     if(tName){
//         therapists.forEach(function(therapist){
//             var fName = therapist.name;
//             if (tName === fName){
//                 foundTherapists.push(therapist);
//             }
//         });
//     }
//     else {
//         foundTherapists = therapists;
//     }

//     displayTherapists(foundTherapists);
//     showTherapistData(foundTherapists);
    
// }


// function displayTherapists(therapists) {
    
//     var therapistsHtml = "";

//     therapists.forEach(function(therapist, index){
//         var pic = therapist.picture;
//         var name = therapist.name;
//         var review = therapist.reviews;

//         therapistsHtml += `
//             <div class="ts-container" id="${index + 1}" onlcick="therapistPage()">
//                 <div class="ts-container-background">
//                     <div class="d-flex row p-2 justify-content-between">
//                         <div class="col-2 ts-pic">
//                             <img src="../static/images/${pic}" class="ts-pic" alt="profile pic">
//                         </div>
//                         <div class="col-10 d-flex row ts-details">
//                             <span class="col-12">${name}</span>
//                             <span class="col-12">${review}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `
//     });
//     $(".ts-list").html(therapistsHtml);
// }


// function showTherapistData(therapists) {
	
//     $(".ts-container").on('click', function(){
//         var i = $(this).attr("id")-1;
//       console.log(i);
//       therapists.forEach(function(therapist){
//                   var id = Number(therapist.id);
          
//           console.log("Is " + id + " == " +  i + " ?");
//           console.log(Number(id) == i);
          
//           var name = therapist.name;
//           var email = therapist.email;
//           var phone =therapist.phoneNumber;
//           var reviews = therapist.reviews;
//           if(i == id)
//               createDetails(name, email, phone, reviews, id);
//       });
//     })
//   }

// function createDetails(name, email, phone, reviews, id) {
//     var html =`
//     <div class="window">
//         <div class="name-open">
//             <span class="name">${name} </span> 
//             <span class="open">${reviews}</span>
//             <span class="open">${email}</span>
//         </div>
//         <div class="info">
//             <div class ="direction">
//                 <i class="far fa-compass"></i>
                
//             </div> </br>
//             <div class="phone">
//                 <i class="fas fa-phone-alt"></i>
//                 <span class="phone">${phone}</span>
//             </div>
//         </div>      
//     </div>     
//     `;    

//     document.querySelector('.t-container').innerHTML = html;
//     // innerHTML = html; /add eventListener 
//   }









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


function displayTherapists(therapists) {
    
    var therapistsHtml = "";

    therapists.forEach(function(therapist, index){
        var pic = therapist.picture;
        var name = therapist.name;
        var review = therapist.reviews;


        therapistsHtml += `
            <div class="ts-container" id="${index + 1}" onlcick="therapistPage()">
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
        var email = therapist.email;
        var phone =therapist.phoneNumber;
        var reviews = therapist.reviews;
        if(i == id)
        	createDetails(name, email, phone, reviews, id);
    });
  })
}

function createDetails(name, email, phone, reviews, id) {
		console.log("da");
    var html =`
    <div class="window">
        <div class="name-open">
            <span class="name">${name} </span> 
            <span class="open">${reviews}</span>
            <span class="open">${email}</span>
        </div>
        <div class="info">
            <div class ="direction">
                <i class="far fa-compass"></i>
                
            </div> </br>
            <div class="phone">
                <i class="fas fa-phone-alt"></i>
                <span class="phone">${phone}</span>
            </div>
        </div>      
    </div>     
    `;    
    document.querySelector('.t-container').innerHTML = html;

  }





























function showData(){
    document.getElementById("show-data").classList.remove("hide");
    document.getElementById("hide-data").classList.add("hide");
}

$('.but-data').click(()=>{
    $('#data').removeClass('hide');
});


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

localStorage.setItem("userDetails, userObj");

var details = localStorage.getItem("userDetails");


var count = 0;
var btn = document.getElementById("show");
var disp = document.getElementById("display");
btn.onclick = function () {
    count++;
    disp.innerHTML = count; 
}
