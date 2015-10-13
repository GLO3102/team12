var app = app || {};

$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    options.url = 'https://umovie.herokuapp.com/' + options.url;
});

$(function () {
    'use strict';

    new app.HomePageView();
});

