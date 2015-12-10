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
    'collections/WatchlistCollection',
    'views/Login',
    'views/Signup',
    'models/userModel',
    'views/User',
    'jquery.cookie'
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
             WatchlistCollection,
             LoginView,
             SignupView,
             UserModel,
             UserView) {
    var UmovieRouter = Backbone.Router.extend({
        routes: {
            '': "home",
            "prefs": "prefs",
            "movies/:id": "getMovie",
            "actors/:id": "getActor",
            "tvshows/season/:id": "getTVShow",
            "watchlists": "getWatchlists",
            "watchlists/:id": "getWatchlist",
            "login": "login",
            "logout": "logout",
            "signup": "signup",
            "users/:id": "getUser",
            "*actions": "defaultRoute"
        },
        initialize: function () {
            // Renders Header.
            var Header = new HeaderView;
            Header.render();
            var Home = new HomeView;
            Home.render();
        },
        home: function () {
            console.log("Home route loaded.");
            if(typeof Header === "undefined") {
                var Header = new HeaderView;
                Header.render();
            }
            var Home = new HomeView;
            Home.render();
        },
        signup: function() {
            var Home = new HomeView;
            Home.render();
            var Signup = new SignupView;
            Signup.render();
        },
        login: function() {
            var Home = new HomeView;
            Home.render();
            var Login = new LoginView;
            Login.render();
        },
        logout: function() {
            $.removeCookie('token');
            this.navigate('', {trigger: true});
        },
        prefs: function () {
            console.log("User Preferences Route Loaded.");
            $(".page").html("User Preference Page.");
        },
        getWatchlists: function () {
            var watchListsCollection = new WatchlistCollection;
            watchListsCollection.url = "watchlists";
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
            watchListsCollection.url = "watchlists";
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
            modImgActor.url = modActorMovies.url;
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
        getUser : function (id){
            var user = new UserModel();
            user.url = user.urlRoot + id;

            var userPublicInfo = JSON.parse($.cookie("userPublicInfo"));
            var loggedUserId = userPublicInfo.id;

            var loggedUser = new UserModel();
            loggedUser.url = loggedUser.urlRoot + loggedUserId;



            var watchListsCollection = new WatchlistCollection;
            watchListsCollection.url = "watchlists";
            user.fetch().done(function() {
                watchListsCollection.fetch().done(function () {
                    loggedUser.fetch().done(function () {
                        var uView = new UserView(user, watchListsCollection,loggedUser);
                    });
                });
            });

        },
        defaultRoute: function (actions) {
            console.log("defaultRoute Route Loaded.");
        }
    });

    var initialize = function () {
        console.log("Starting Backbone history...");
        Backbone.history.start();
        var app_router = new UmovieRouter;
    };

    return {
        initialize: initialize
    };
});
