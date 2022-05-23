function send(){
    console.log("1");
    $("#btn").on('click', function(){
        console.log("2");
        var h =
        `
        <iframe onclick="showPhone()" id="t" src="file:///C:/Users/hirjo/OneDrive/Files/Firma/Git/fiziosearch.github.io/templates/test3.html" width="640" height="1447" frameborder="0" marginheight="0" marginwidth="0">Se încarcă…</iframe>
        `;
        $(".test").html(h);
    });
}