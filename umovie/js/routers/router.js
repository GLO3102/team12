var app = app || {};

(function () {
    'use strict';

    require(['backbone'], function (Backbone) {

        var UmovieRouter = Backbone.Router.extend({
            routes: {
                '': "home",
                "prefs": "prefs",
                "movies/:id": "getMovie",
                "actors/:id" : "getActor",
                "watchlists/:id": "getWatchlist",
                "*actions": "defaultRoute"
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
            getWatchlist: function (id) {
                console.log("getWatchlist function called with id: " + id);
                var modWatchlist = new app.WatchlistModel();
                modWatchlist.url = modWatchlist.urlRoot + id;
                modWatchlist.fetch().done(function () {
                    var watchlistView = new app.WatchlistView({
                        model: modWatchlist
                    });
                });
            },
            defaultRoute: function (actions) {
                console.log("defaultRoute Route Loaded.");
            }
        });

        app.router = new UmovieRouter();

        app.router.on('route:getMovie', function(id) {
            var modFilm = new app.MovieModel();
            modFilm.url = modFilm.urlRoot + id;
            modFilm.fetch().done(function()
            {
                var movieView = new app.MovieView({
                    model: modFilm
                });
            });
        });

        app.router.on('route:getActor', function(id) {
            var modActor = new app.ActorModel();
            var modActorMovies = new app.ActorMovies();
            modActor.url = modActor.urlRoot + id;
            modActorMovies.url = modActor.url + "/movies";
            modActor.fetch().done(function()
            {
                modActorMovies.fetch().done(function() {
                    var actorView = new app.ActorView({
                        model: modActor,
                        collection: modActorMovies
                    });
                });

            });

        });

        Backbone.history.start();
    });
})();
