$(document).ready(function(){

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
        if($(".checkbox").is(":checked")){
            // Terapeut indisponibil
        } else {
            // Terapeut disponibil
        }
    }
})


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


