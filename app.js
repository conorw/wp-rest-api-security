"use strict";

var auth = auth();
$("#login").click(function () {

    var email = $("#username").val();
    var password = $("#password").val();
    // log out before we try to log in again
    auth.logout();
    auth.login(email, password, successFunction, errorFunction);

});

function successFunction() {
    checkLoggedIn();
}
function errorFunction() {
    checkLoggedIn();
}

$("#logout").click(function () {
    auth.logout();
    location.reload(true);
});
// check to see if a token already exists and use it if present
function checkLoggedIn() {
    var token = auth.getLoggedInToken();
    if (token) {
        $("#login").hide();
        $("#logindetails").hide();
        $("#specialcontent").show();
        $("#logout").show();
        $("#currentuser").text(token.user_display_name);
    } else {
        $("#logout").hide();
        $("#specialcontent").hide();
        $("#login").show();
        $("#logindetails").show();
        $("#register").show();
        $("#currentuser").text('');
    }
}
// execute immediately to hide or show buttons
checkLoggedIn();