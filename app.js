function checkedLoggedIn(){
    var cookie = auth.getLoggedInCookie();
    if (cookie) {
        cookie = JSON.parse(cookie);
        $("#login").hide();
        $("#register").hide();
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