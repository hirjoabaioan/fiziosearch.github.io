$('#t').on('ready', function(){
    alert("DA");
    var c = $('.test').text();
    if(c === "Multumim")
        console.log("DA");
})

function send2(){
    console.log("P")
    $("#btn2").on('click', function (){

        var h =
        `
        <iframe onclick="showPhone()" id="x" src="file:///C:/Users/hirjo/OneDrive/Files/Firma/Git/fiziosearch.github.io/templates/thankyou.html" width="640" height="1447" frameborder="0" marginheight="0" marginwidth="0">Se încarcă…</iframe>
        `;
        $("#frm").html(h);
    });
}