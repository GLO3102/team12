var app = app || {};

$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    options.url = 'https://umovie.herokuapp.com/' + options.url;
});

$(function () {
    'use strict';

    // kick things off by creating the `App`
    new app.HomePageView();
});

