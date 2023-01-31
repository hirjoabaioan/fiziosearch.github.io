$(document).ready(function(){
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    if (top.location.pathname === '/templates/search.html' || 
        top.location.pathname === '/templates/mesagerie.html' ){

        $('.contact-info').hide();

        $(window).resize (function (){
            if($(window).width() < 750 && $('.list-container').is(":visible")){
                $('.info-container').hide();
            }else if($(window).width() > 751) {
                $('.info-container').show();
            }

        })

        if(window.matchMedia("(max-width: 47rem)").matches){
            $('.info-container').hide();
        }

        if(window.matchMedia("(hover:hover) and (pointer:fine)").matches){
            $('.med').removeClass('btn btn-secondary');
        }

        $('.contact-button').click(function(){
            $('.contact-info').show();
            $(this).hide();
        });


        $('.person-box').click(function() {
            if(window.matchMedia("(max-width: 47rem)").matches) {
                $('.list-container').removeClass('d-flex');
                $('.list-container').hide();
            }
            $('.info-container').show();
            $('.info-container').addClass('grid');
        });

        $('#close').click(function() {
            if(window.matchMedia("(max-width: 47rem)").matches){
                $('.list-container').addClass('d-flex');
                $('.list-container').show();
                $('.info-container').removeClass('grid');
                $('.info-container').hide();
            }

            if(window.matchMedia("(min-width: 47rem)").matches){
                var replace = `
                <div class="grid jusify-content-start align-items-center" style="width: 500px;"  id="startPage">
                    <span id="txtCheck">Alege un terapeut din listă</span>
                </div>
                `;
            
                $('.info-container').html(replace);
            }
        });
    }

    if(top.location.pathname === '/templates/notificari.html'){
        $(".notification-condition").each(function(){
            if($(this).text() === "Văzut"){
                $(this).css({"color": "grey"});
                $(this).siblings().css({"color": "grey"});
            }
        });
    }

    if(top.location.pathname === '/dashboard-terapeut.html'){
        let ySums = [300, 450, 200, 150, 300, 400, 100, 150, 300, 150];
        let xDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        
        new Chart("sumChart", {
            type: "line",
            data: {
                labels: xDays,
                datasets: [{
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "#108F96",
                    borderColor: "rgba(0,0,255,0.1)",
                    data: ySums
                }]
            },
            options: {
                legend: {display: false},
                scales: {
                    yAxes: [{ticks: {min: 6, max: 16}}],
                }
            }
        });
        
    }
    
})

function checkerFunction() {
    if($("#checker").is(":checked")){
        $("#toggle-inactive").css("color", "#f44336");
        $("#toggle-active").css("color", "black");
        // Terapeut indisponibil
    } else {
        $("#toggle-active").css("color", "#108F96");
        $("#toggle-inactive").css("color", "black");
        // Terapeut disponibil
    }
}



$(document).ready(function(){
    // Prepare the preview for profile picture
        $("#wizard-picture").change(function(){
            readURL(this);
        });
    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
    
            reader.onload = function (e) {
                $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
            }
            reader.readAsDataURL(input.files[0]);
        }
    }


const rows = document.querySelectorAll(".program-table tr.collapsible");

rows.forEach(row => {
  const contentRow = row.nextElementSibling;
  contentRow.style.display = "none";
  contentRow.style.translation = "max-height 0.5s ease-out";
  row.addEventListener("click", function() {
    rows.forEach(otherRow => {
      if (otherRow !== this) {
        const otherContentRow = otherRow.nextElementSibling;
        otherContentRow.style.maxHeight = "0";
        otherContentRow.style.display = "none";
      }
    });
    contentRow.style.display = contentRow.style.display === "none" ? "table-row" : "none";
  });
});







