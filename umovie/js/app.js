var app = app || {};

requirejs.config({
    baseUrl: 'js',
    paths: {
        views: '/views',
        templates: '/templates',
        models: '/models',
        collections: '/collections',
        jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min',
        bootstrap: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min',
        underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
        backbone: 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone-min',
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

require(['jquery', 'bootstrap'], function ($) {
    console.log("Jquery and bootstrap loaded.");
    return {};
});

(function () {
    'use strict';

    require(['jquery'], function ($) {
        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            options.url = 'https://umovie.herokuapp.com/' + options.url;
        });
    });

})();

(function () {
    'use strict';

    require(['backbone'], function (Backbone) {
        console.log("Hello from require");
    });

})();
