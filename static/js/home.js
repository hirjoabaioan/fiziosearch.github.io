$(document).ready(function(){
    $("button").click(function(){
        $("#test").hide();
        $("#nav-placeholder").hide();
        // $("#nav-placeholder").load("../../templates/nav.html");
    });
});

//OLD
// function searchTherapists(){
//     var foundTherapists = [];
//     var searchItem = $('#therapist-name').val();
//     var tsList = [];
//     var id = therapists.id; // verifica sa nu existe dubluri inainte de a afisa rezultatele
//     if(searchItem){

//       //cautat dupa nume
//       therapists.forEach(function(therapist){
//         var fName = therapist.name;
//         if (searchItem === fName){
//           foundTherapists.push(therapist);
//         }
//       });

//       //cautat dupa locatie
//       therapists.forEach(function(therapist){
//         var fAddress = therapist.address;
//         for(var loc = 0; loc<fAddress.length; loc++){
//           if(searchItem === fAddress[loc])
//             foundTherapists.push(therapist);
//         }
//       });

        
//       //cautat dupa sector 
//       therapists.forEach(function(therapist){
//         var keys = Object.getOwnPropertyNames(locations);
//         keys.forEach(i =>{
//           var fAddress = therapist.address;
//             if(i === searchItem){
//               for(var terLoc = 0; terLoc<fAddress.length; terLoc++){
//                 for(var j = 0; j<locations[i].length; j++){
//                   if(locations[i][j] === fAddress[terLoc]){
//                       foundTherapists.push(therapist);
//                   }
//                 }
//               }
//             }
//         });
//       });
//     }
//     else {
//         foundTherapists = therapists;
//     }
//     // Elimina dublurile
//     foundTherapists = foundTherapists.filter((value, index, self) => index === self.findIndex((t) => (t.id === value.id)));
    
//     displayTherapists(foundTherapists.sort(()=> Math.random() - 0.5));
//     showTherapistData(foundTherapists);
// }


