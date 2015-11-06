var app = app || {};

$(function () {
    'use strict';

    var UmovieRouter = Backbone.Router.extend({
        routes: {
            '': "home",
            "prefs": "prefs",
            "movies/:id" : "getMovie",
            "actors/:id" : "getActor",
            "actors/:id/movies" : "getActorMovies",
            "*actions": "defaultRoute"

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

    app.router.on('route:getMovie', function(id) {
        var modFilm = new MovieModel();
        modFilm.url = modFilm.urlRoot + id;
        modFilm.fetch().done(function()
        {
            var movieView = new MovieView({
                model: modFilm
            });
        });
    });

    app.router.on('route:getActor', function(id) {
        var modActor = new ActorModel();
        var modActorMovies = new ActorMovies();
        modActor.url = modActor.urlRoot + id;
        modActorMovies.url = modActor.url + "/movies";
        modActor.fetch().done(function()
        {
            modActorMovies.fetch().done(function() {
                var actorView = new ActorView({
                    model: modActor,
                    collection: modActorMovies
                });
            });

        });

    });

    Backbone.history.start();
});
