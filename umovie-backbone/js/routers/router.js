var app = app || {};

(function () {
    'use strict';

    require(['backbone'], function (Backbone) {


        var UmovieRouter = Backbone.Router.extend({
            routes: {
                '': "home",
                "prefs": "prefs",
                "*actions": "defaultRoute",
            },
            initialize: function () {
                // Renders Header.
                app.header.render();
            },
            home: function () {
                console.log("Home route loaded.");
                app.homePage.render();
            },
            prefs: function () {
                console.log("User Preferences Route Loaded.");
                $(".page").html("User Preference Page.");
            },
            defaultRoute: function (actions) {
                console.log("defaultRoute Route Loaded.");
            }
        });

        app.router = new UmovieRouter();
        Backbone.history.start();
    });
})();
