// $.get("templates/nav.html", function(data){
//     $("#nav-placeholder").replaceWith(data);
// });



// Hide Header on on scroll down
// var didScroll;
// var lastScrollTop = 0;
// var delta = 5;
// var navbarHeight = $('nav').outerHeight();

// $(window).scroll(function(event){
//     didScroll = true;
// });

// setInterval(function() {
//     if (didScroll) {
//         hasScrolled();
//         didScroll = false;
//     }
// }, 150);

// function hasScrolled() {
//     var st = $(this).scrollTop();
//     var h = 150;
    
//     // Make sure they scroll more than delta
//     if(Math.abs(lastScrollTop - st) <= delta)
//         return;
    
//     // If they scrolled down and are past the navbar, add class .nav-up.
//     // This is necessary so you never see what is "behind" the navbar.
//     if (st > lastScrollTop && st > navbarHeight){
//         // Scroll Down
//         $('nav').removeClass('nav-d').addClass('nav-u');
//     } else {
//         // Scroll Up
//         if(st + $(window).height() < $(document).height()+h) {
//             $('nav').removeClass('nav-u').addClass('nav-d');
//         }
//     }
    
//     lastScrollTop = st;
// }


// const nav = document.querySelector('nav');

// window.addEventListener('scroll', function() {
//   const offset = window.pageYOffset;
  
//   if(offset > 75)
//     nav.classList.add('scroll')
//   else 
//     nav.classList.remove('scroll')
// });






var pageURL = $(location).attr("href");

var pageAdress = "http://127.0.0.1:8000/"
if (pageURL == pageAdress){
    $(document).ready(function() {
        $('nav').removeClass('sticky-top').addClass('fixed-top');
    });
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
    setOnClickListener();
}


// function clearLocations(){
//     infoWindow.close();
//     for (var i = 0; i < markers.length; i++) {
//         markers[i].setMap(null);
//     }
//     markers.length = 0;
// }


function setOnClickListener() {
    var storeElements = document.querySelectorAll('.store-container');
    storeElements.forEach(function(elem, index){
        elem.addEventListener('click', function(){
            
        })
    });
}



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
//     document.querySelector('.ts-list').innerHTML = therapistsHtml;
// }




// function showTherapistData(therapists) {
//     therapists.forEach(function(therapist, index){

//         var name = therapist.name;
//         var email = therapist.email;
//         var phone =therapist.phoneNumber;
//         var reviews = therapist.reviews;

//         createDetails(name, email, phone, reviews, index)
//     });
// }

// function createDetails(name, email, phone, reviews, index) {
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
  	var i = $(this).attr("id")-1;
    console.log(i);
    therapists.forEach(function(therapist){
				var id = Number(therapist.id);
        
        console.log("Is " + id + " == " +  i + " ?");
        console.log(Number(id) == i);
        
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
