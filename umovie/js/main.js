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
        text: 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min'
    },
    shim: {
        'underscore': '_',
        'bootstrap': {
            deps: ['jquery'],
            exports: "$.fn.popover"
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'backbone'
        }
    },
    enforceDefine: true
});
console.log("RequireJS configuration done.");

/**
 * exposes jquery and bootstrap so things like the dropdown menu works.
 */
require(['jquery', 'bootstrap'], function ($) {
    console.log("Jquery and bootstrap loaded.");
    return {};
});

/**
 * Sets the base URL to the API address.
 */
require(['jquery'], function ($) {
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        // if the requested URL already starts with 'http', consider it is not fetching form the API (i.e. Youtube)
        if (!options.url.match("^http")) {
            options.url = 'https://umovie.herokuapp.com/' + options.url;
        }
    });
});

require(['app'], function (App) {
    console.log("App.initialize()");
    App.initialize();
});
