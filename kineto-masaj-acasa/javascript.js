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


function showTherapistInfo() {
    if(window.matchMedia("(max-width: 47rem)").matches) {
        $('.list-container').removeClass('d-flex');
        $('.list-container').hide();
    }
    $('.info-container').show();
    $('.info-container').addClass('grid');

}

function closeTherapistInfo() {
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

}

function show (){

}

// if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    
// }else{

// }