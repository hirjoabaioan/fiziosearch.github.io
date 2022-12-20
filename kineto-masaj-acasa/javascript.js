$('.msg-button').hide();

if(window.matchMedia("(hover: none) and (pointer: coarse)").matches){
    $('.info-container').hide();
}else {
    $('.med').removeClass('btn btn-secondary');
}

$('.contact-button').click(function(){
    $('.msg-button').show();
    $(this).hide();
});


function showTherapistInfo() {
    if(window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
        $('.list-container').removeClass('d-flex');
        $('.list-container').hide();
    }
    $('.info-container').show();
    $('.info-container').addClass('d-flex');

}

function closeTherapistInfo() {
    if(window.matchMedia("(hover: none) and (pointer: coarse)").matches){
        $('.list-container').addClass('d-flex');
        $('.list-container').show();
        $('informatii').removeClass('d-flex');
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