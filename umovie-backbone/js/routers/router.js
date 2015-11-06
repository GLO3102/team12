var app = app || {};

$(function () {
    'use strict';

    var UmovieRouter = Backbone.Router.extend({
        routes: {
            '': "home",
            "prefs": "prefs",
            "movies/:id" : "getMovie",
			"watchlists/:id" : "getWatchlist",
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
	
	app.router.on('route:getWatchlist', function(id) {
        var modWatchlist = new WatchlistModel();
        modWatchlist.url = modWatchlist.urlRoot + id;
        modWatchlist.fetch().done(function()
        {
            var watchlistView = new WatchlistView({
                model: modWatchlist
            });
        });
    });

    Backbone.history.start();
});
