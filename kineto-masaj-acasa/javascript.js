$('.msg-button').hide();

if(window.matchMedia("(hover: none) and (pointer: coarse)").matches){
    $('#informatii').hide();
}else {
    $('.med').removeClass('btn btn-secondary');
}

$('.contact-button').click(function(){
    $('.msg-button').show();
    $(this).hide();
});


function showTherapistInfo() {
    if(window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
        $('#lista-container').removeClass('d-flex');
        $('#lista-container').hide();
    }
    $('#informatii').show();
    $('#informatii').addClass('d-flex');

}

function closeTherapistInfo() {
    if(window.matchMedia("(hover: none) and (pointer: coarse)").matches){
        $('#lista-container').addClass('d-flex');
        $('#lista-container').show();
        $('informatii').removeClass('d-flex');
        $('#informatii').hide();
    }
    var replace = `
    <div class="d-flex jusify-content-start align-items-center" style="width: 500px;"  id="startPage">
        <span id="txtCheck">Alege un terapeut din listă</span>
    </div>
    `;

    $('#informatii').html(replace);
}

function show (){

}

// if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    
// }else{

// }