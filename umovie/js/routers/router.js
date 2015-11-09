define([
    'backbone',
    'views/Header',
    'views/Home',
    'models/ActorModel',
    'collections/ActorMovies',
    'views/Actor',
    'views/ActorImg',
    'models/ActorImgModel',
    'models/MovieModel',
    'views/Movie',
    'models/TVShowModel',
    'collections/TVShowEpisodesCollection',
    'views/TVShow',
    'views/Watchlist',
    'collections/WatchlistCollection'
], function (Backbone,
             HeaderView,
             HomeView,
             ActorModel,
             ActorMovies,
             ActorView,
             ActorImgView,
             ActorImgModel,
             MovieModel,
             MovieView,
             TVShowModel,
             TVShowEpisodesCollection,
             TVShowView,
             WatchlistView,
WatchlistCollection) {
    var UmovieRouter = Backbone.Router.extend({
        routes: {
            '': "home",
            "prefs": "prefs",
            "movies/:id": "getMovie",
            "actors/:id": "getActor",
            "tvshows/season/:id": "getTVShow",
            "watchlists": "getWatchlists",
            "watchlists/:id": "getWatchlist",
            "*actions": "defaultRoute"
        },
        initialize: function () {
            // Renders Header.
            var Header = new HeaderView;
            Header.render();
        },
        home: function () {
            console.log("Home route loaded.");
            var Home = new HomeView;
            Home.render();
        },
        prefs: function () {
            console.log("User Preferences Route Loaded.");
            $(".page").html("User Preference Page.");
        },
        getWatchlists: function () {
            var watchListsCollection = new WatchlistCollection;
            watchListsCollection.url = "unsecure/watchlists";
            watchListsCollection.fetch().done(function () {
                var watchlistView = new WatchlistView({
                    collection: watchListsCollection
                });
            });
        },
        getWatchlist: function (id) {
            console.log("getWatchlist function called with id: " + id);
            var modWatchlist = new WatchlistModel();
            modWatchlist.url = modWatchlist.urlRoot + id;
            modWatchlist.fetch({
                async: true,
                success: function (collection, response, options) {
                    var watchlistView = new WatchlistView({
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
            var modFilm = new MovieModel();
            modFilm.url = modFilm.urlRoot + id;
            var watchListsCollection = new WatchlistCollection;
            watchListsCollection.url = "unsecure/watchlists";
            watchListsCollection.fetch().done(function () {
                modFilm.fetch().done(function () {
                    var movieView = new MovieView({
                        model: modFilm,
                        collection: watchListsCollection
                    });
                });
            });
        },
        getActor: function (id) {
            var modActor = new ActorModel();
            var modActorMovies = new ActorMovies();
            var modImgActor = new ActorImgModel();
            modActor.url = modActor.urlRoot + id;
            modActorMovies.url = modActor.url + "/movies";
            modImgActor.url = "http://umovie.herokuapp.com/unsecure/actors/" + id + "/movies";
            modActor.fetch().done(function () {
                modActorMovies.fetch().done(function () {
                    modImgActor.fetch().done(function () {
                        var actorView = new ActorView({
                            model: modActor,
                            collection: modActorMovies
                        });
                        var actorImgView = new ActorImgView({
                            model: modImgActor
                        });

                    });
                });
            });
        },
        getTVShow: function (id) {
            var modTVShow = new TVShowModel();
            var tvShowEpisodesCollection = new TVShowEpisodesCollection();

            modTVShow.url = modTVShow.urlRoot + id;
            tvShowEpisodesCollection.url = modTVShow.url + "/episodes";

            modTVShow.fetch().done(function () {
                tvShowEpisodesCollection.fetch().done(function () {

                    var actorView = new TVShowView({
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

    var initialize = function () {
        var app_router = new UmovieRouter;
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
