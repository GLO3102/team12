var app = app || {};

(function () {
    'use strict';

    require(['backbone'], function (Backbone) {

        var UmovieRouter = Backbone.Router.extend({
            routes: {
                '': "home",
                "prefs": "prefs",
                "movies/:id": "getMovie",
                "actors/:id": "getActor",
                "tvshows/season/:id": "getTVShow",
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
                modWatchlist.fetch({
                    async: true,
                    success: function (collection, response, options) {
                        var watchlistView = new app.WatchlistView({
                            model: modWatchlist
                        });
                    },
                    error: function (collection, response, options) {
                        var errorMessage = response.responseJSON.errorCode;
                        var errorHtml = '<div class="jumbotron"><h1>ERROR</h1><p>Could not fetch watchlist.  Please try again with another watchlist.</p></div>';
                        $(".page").html(errorHtml);
                    }
                });
            },
            getMovie: function (id) {
                var modFilm = new app.MovieModel();
                modFilm.url = modFilm.urlRoot + id;
                modFilm.fetch().done(function () {
                    var movieView = new app.MovieView({
                        model: modFilm
                    });
                });
            },
            getActor: function (id) {
                var modActor = new app.ActorModel();
                var modActorMovies = new app.ActorMovies();
                modActor.url = modActor.urlRoot + id;
                modActorMovies.url = modActor.url + "/movies";
                modActor.fetch().done(function () {
                    modActorMovies.fetch().done(function () {
                        var actorView = new app.ActorView({
                            model: modActor,
                            collection: modActorMovies
                        });
                    });
                });
            },
            getTVShow: function (id) {
                var modTVShow = new app.TVShowModel();
                var tvShowEpisodesCollection = new app.TVShowEpisodesCollection();
                modTVShow.url = modTVShow.urlRoot + id;
                tvShowEpisodesCollection.url = modTVShow.url + "/episodes";
                modTVShow.fetch().done(function () {
                    tvShowEpisodesCollection.fetch().done(function () {
                        var actorView = new app.TVShowView({
                            model: modTVShow,
                            collection: tvShowEpisodesCollection
                        });
                    });
                });
            },
            defaultRoute: function (actions) {
                console.log("defaultRoute Route Loaded.");
            }
        });

        app.router = new UmovieRouter();
        Backbone.history.start();
    });
})();
