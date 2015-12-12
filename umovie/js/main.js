console.log("Configuring requirejs");
/**
 * Sets up all required paths and libraries, from CDNs.
 */
requirejs.config({
    baseUrl: 'js',
    paths: {
        templates: '../templates',
        jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min',
        bootstrap: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min',
        underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
        backbone: 'http://backbonejs.org/backbone-min',
        text: 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
        'jquery.cookie': 'https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min'
    },
    shim: {
        'jquery': {
            exports: "$"
        },
        'underscore': '_',
        'bootstrap': {
            deps: ['jquery'],
            exports: "$.fn.popover"
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'backbone'
        },
        'jquery.cookie': {
            deps: ['jquery']
        }
    }
    //enforceDefine: true
});
console.log("RequireJS configuration done.");

/**
 * exposes jquery and bootstrap so things like the dropdown menu works.
 */
require(['jquery', 'bootstrap'], function ($) {
    console.log("Jquery and bootstrap loaded.");
    return {};
});

define(['jquery', 'app', 'jquery.cookie'], function ($, App) {
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        // Sets the base URL to the API address.
        // if the requested URL already starts with 'http', consider it is not fetching form the API (but rather, i.e., Youtube API)
        if (!options.url.match("^http")) {
            jqXHR.setRequestHeader("Authorization", $.cookie('token'));
            options.url = 'https://umovie.herokuapp.com/' + options.url;
        }
    });
    console.log("App.initialize()");
    App.initialize();
});
