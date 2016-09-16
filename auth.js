"use strict";
function auth() {

    var COOKIE_NAME = 'mycookiename';

    function login(email, password, success, failure) {

        var apiHost = '//localhost/wordpress/wp-json';

        var data = {
            username: email,
            password: password
        };
        $.post(apiHost + '/jwt-auth/v1/token', data).done(function (data) {
            // you are now logged in, save the cookie to validate further requests
            var jwtDetails = JSON.stringify(data);
            console.log(jwtDetails);
            // expire our cookie in 7 days
            createCookie(COOKIE_NAME, jwtDetails, 7);
            success(jwtDetails);
        });

    }
    function logout() {

    }
    function delete_cookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
    }

    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    function getLoggedInCookie() {
        return getCookie(COOKIE_NAME);
    }

    return {
        getLoggedInCookie: getLoggedInCookie,
        login: login,
        logout: logout
}
};