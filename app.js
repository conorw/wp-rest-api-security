"use strict";
var auth = auth();
document.getElementById('login').click(function () {

    var email = $("#username").val();
    var password = $("#password").val();
    // log out before we try to log in again
    auth.logout();
    auth.login(email,password,successFunction,errorFunction);

});

function successFunction(){
    checkedLoggedIn();
}
function errorFunction(){
    checkedLoggedIn();
}

$("#logout").click(function () {
    auth.logout();
    location.reload(true);
});
// check to see if a cookie already exists and use it if present
function checkLoggedIn() {
    var cookie = auth.getLoggedInCookie();
    if (cookie) {
        $("#login").hide();
        $("#logindetails").hide();
        $("#logout").show();
        $("#currentuser").text(cookie.user_display_name);
    } else {
        $("#logout").hide();
        $("#login").show();
        $("#logindetails").show();
        $("#register").show();
        $("#currentuser").text('');
    }
}
// execute immediately to hide or show buttons
checkLoggedIn();