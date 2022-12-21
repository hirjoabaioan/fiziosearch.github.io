$('.contact-info').hide();

if(window.matchMedia("(hover: none) and (pointer: coarse)").matches){
    $('.info-container').hide();
}else {
    $('.med').removeClass('btn btn-secondary');
}

$('.contact-button').click(function(){
    $('.contact-info').show();
    $(this).hide();
});


function showTherapistInfo() {
    if(window.matchMedia("(max-width: 57rem)").matches) {
        $('.list-container').removeClass('grid');
        $('.list-container').hide();
    }
    $('.info-container').show();
    $('.info-container').addClass('grid');

}

function closeTherapistInfo() {
    if(window.matchMedia("(max-width: 57rem)").matches){
        $('.list-container').addClass('d-flex');
        $('.list-container').show();
        $('.info-container').removeClass('grid');
        $('.info-container').hide();
    }
    var replace = `
    <div class="d-flex jusify-content-start align-items-center" style="width: 500px;"  id="startPage">
        <span id="txtCheck">Alege un terapeut din listă</span>
    </div>
    `;

    $('.info-container').html(replace);
}

function show (){

}

// if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    
// }else{

// }