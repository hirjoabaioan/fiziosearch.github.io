$('#copied_tip').hover(
    function(){$(this).removeClass('hide')}
    )
  
  // Tooltip
function copy(phone) {
    setTimeout(function() {
        $('#copied_tip').remove();
    }, 800);

    $('.my-btn').append(
        "<div class='tip' id='copied_tip'>Telefon copiat</div>"
    );

    var linkText = '0' + phone.toString();

    var input = document.createElement('input');
    input.setAttribute('value', linkText);
    document.body.appendChild(input);
    input.select();
    var result = navigator.clipboard.writeText(linkText);
    document.body.removeChild(input)

    return result;
}


setInterval(function(){
    var change =  $('.change')
    if(change.hasClass('bi-exclamation-triangle')){
        change.removeClass('bi-exclamation-triangle');
        change.addClass('bi-exclamation-triangle-fill')
    } else if(change.hasClass('bi-exclamation-triangle-fill')){
        change.removeClass('bi-exclamation-triangle-fill')
        change.addClass('bi-exclamation-triangle');
    }
}, 800);