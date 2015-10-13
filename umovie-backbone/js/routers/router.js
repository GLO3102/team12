var app = app || {};

(function () {
    'use strict';

    var UmovieRouter = Backbone.Router.extend({
        routes: {
            '': "home",
            "prefs": "prefs",
            "*actions": "defaultRoute",
            '*filter': 'setFilter'
        }
    });

    app.UmovieRouter = new UmovieRouter();

    app.UmovieRouter.on('route:home', function () {
        console.log("Home route loaded.");
        app.homePage.render();
    });

    app.UmovieRouter.on('route:prefs', function () {
        console.log("User Preferences Route Loaded.");
        $(".page").html("User Preference Page.");
    });

    app.UmovieRouter.on('route:defaultRoute', function (actions) {
        console.log("defaultRoute Route Loaded.");
    });

    Backbone.history.start();
})();
