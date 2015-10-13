var app = app || {};

(function () {
    'use strict';

    var UmovieRouter = Backbone.Router.extend({
        routes: {
            '': "home",
            "prefs": "prefs",
            "*actions": "defaultRoute",
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
})();
