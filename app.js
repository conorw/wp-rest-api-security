"use strict";

var auth = auth();
$("#login").click(function () {

    var username = $("#username").val();
    var password = $("#password").val();
    // log out before we try to log in again
    auth.logout();
    auth.login(username, password, successFunction, errorFunction);
});

function successFunction() {
    checkLoggedIn();
    console.log("Success. Logged In");
}
function errorFunction(error) {
    checkLoggedIn();
    console.log("There was a error logging in. " + error.responseText);
}

$("#logout").click(function () {
    auth.logout();
    location.reload(true);
});
// check to see if a token already exists and use it if present
function checkLoggedIn() {
    var token = auth.getLoggedInToken();
    if (token) {
        // hide the login buttons and other fields if we are logged in
        $("#login").hide();
        $("#logindetails").hide();
        $("#specialcontent").show();
        $("#logout").show();
        $("#currentuser").text(token.user_display_name);
    } else {
        // hide the logout buttons and other fields if we are NOT logged in
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