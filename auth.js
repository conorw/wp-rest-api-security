"use strict";
function auth() {

    // save the valid token in a cookie so it is available next time you
    // come to the site
    var COOKIE_NAME = 'mycookiename';

    function login(email, password, success, failure) {
        // where is your wordpress site that we want to communicate with?
        var apiHost = '//localhost/wordpress/wp-json';

        var data = {
            username: email,
            password: password
        };
        // the important bit, contact the JWT end point and ask for an authentication token
        $.post(apiHost + '/jwt-auth/v1/token', data).error(function (error) {
            // pass back the failure message to the calling function
            failure(error);
        }).done(function (data) {
            // you are now logged in, save the cookie to validate further requests
            var jwtDetails = JSON.stringify(data);
            // show the cookie details in the console just for interest
            console.log(jwtDetails);
            // expire our cookie in 7 days
            createCookie(COOKIE_NAME, jwtDetails, 7);
            // pass back a successful message to our calling function
            success(data);
        });

    }
    function logout() {
        delete_cookie(COOKIE_NAME);
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
    function getToken(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return JSON.parse(parts.pop().split(";").shift());
    }

    function getLoggedInToken() {
        return getToken(COOKIE_NAME);
    }

    return {
        getLoggedInToken: getLoggedInToken,
        login: login,
        logout: logout
    }
};