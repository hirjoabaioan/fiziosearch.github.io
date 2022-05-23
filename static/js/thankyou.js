// function copyLink(){
//     var coppiedLink = $('#toCopy').text();
//     console.log(coppiedLink);
//     navigator.clipboard.writeText(coppiedLink);
//     alert(coppiedLink);
// }

function showNumbers(){

    var tableCreate = "";
    var tr = "";

    therapists.forEach(function(therapist){
        var id = therapist.id + 1;
        var name = therapist.name;
        var phone = therapist.phoneNumber;
        var email = therapist.email;

        tr +=`
            <tr>
              <td>${name}</td>
              <td>${phone}</td>
              <td>${email}</td>
            </tr>
        `;
    });

    tableCreate = `
      <table>
        <thead>
          <th>Nume</th>
          <th>Telefon</th>
          <th>Email</th>
        </thead>
        <tbody>
          ${tr}
        </tbody>
      </table>
    `;

    $('#testing').html(tableCreate);
    $(window.frameElement).parent().addClass('Adaugat');
    console.log($(window.frameElement).parent().html());
    console.log("A");
    console.log($('#para').text());
    console.log($('.a-frame')).css('background-color', 'red');
}


$('#copied_tip').hover(
  function(){$(this).removeClass('hide')}
  )

// Tooltip
function copy() {
  setTimeout(function() {
    $('#copied_tip').remove();
  }, 800);

  $('#copyLink').append(
    "<div class='tip' id='copied_tip'>Link copiat</div>"
  );

  var linkText = "https://hirjoabaioan.github.io/fiziosearch.github.io"

  var input = document.createElement('input');
  input.setAttribute('value', linkText);
  document.body.appendChild(input);
  input.select();
  var result = navigator.clipboard.writeText(linkText);
  document.body.removeChild(input)

  return result;
  }