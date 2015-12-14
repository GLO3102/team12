
define([
    'backbone',
    'underscore',
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
    'views/TVShowModal',
    'views/Watchlist',
    'collections/WatchlistCollection',
    'views/Login',
    'views/Signup',
    'models/userModel',
    'views/User',
    'views/Search',
    'jquery.cookie'
], function (Backbone,
             _,
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
             TVShowModalView,
             WatchlistView,
             WatchlistCollection,
             LoginView,
             SignupView,
             UserModel,
             UserView,
             SearchView) {
    var UmovieRouter = Backbone.Router.extend({
        routes: {
            '': "home",
            "prefs": "prefs",
            "movies/:id": "getMovie",
            "actors/:id": "getActor",
            "tvshows/season/:id": "getTVShow",
            "tvshows/season/:id/:id": "getTVShowModalView",
            "watchlists": "getWatchlists",
            "watchlists/:id": "getWatchlist",
            "login": "login",
            "logout": "logout",
            "signup": "signup",
            "users/:id": "getUser",
            "search":"search",
            "search(?*querystring)":"search",
            "*actions": "defaultRoute"
        },
        initialize: function () {
            // Renders Header.
            var Header = new HeaderView;
            Header.render();
            var Home = new HomeView;
            Home.render();
            this.firstvView=0;
            this.currentView = null;

        },
        _cleanUp: function() {

            if(this.firstvView !== 0){

                this.currentView.remove();

            }

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
        search: function(queryString) {
            this._cleanUp();
            var filter = this.parseQueryString(queryString);
            this.currentView = new SearchView(filter);
            this.currentView.render();
            console.log("Search Route Loaded.");
            this.firstvView=1;

        },
        getTVShowModalView: function(id) {
                this._cleanUp();
                var modTVShow = new TVShowModel();
                var tvShowEpisodesCollection = new TVShowEpisodesCollection();

                modTVShow.url = modTVShow.urlRoot + id;
                tvShowEpisodesCollection.url = modTVShow.url + "/episodes";
                var self=this;
                modTVShow.fetch().done(function () {
                    tvShowEpisodesCollection.fetch().done(function () {

                        self.currentView = new TVShowModalView({
                            model: modTVShow,
                            collection: tvShowEpisodesCollection
                        });

                    });
                });
            this.firstvView=1;
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
            this._cleanUp();
            var watchListsCollection = new WatchlistCollection;
            watchListsCollection.url = "watchlists";
            var self=this;
            watchListsCollection.fetch().done(function () {
                self.currentView = new WatchlistView({
                    collection: watchListsCollection
                });
            });
            this.firstvView=1;
        },
        getWatchlist: function (id) {
            this._cleanUp();
            console.log("getWatchlist function called with id: " + id);
            var modWatchlist = new WatchlistModel();
            modWatchlist.url = modWatchlist.urlRoot + id;
            var self=this;
            modWatchlist.fetch({
                async: true,
                success: function (collection, response, options) {
                    self.currentView= new WatchlistView({
                        model: modWatchlist
                    });
                },
                error: function (collection, response, options) {
                    var errorMessage = response.responseJSON.errorCode;
                    var errorHtml = '<div class="jumbotron"><h1>ERROR</h1><p>Could not fetch watchlist.  Please try again with another watchlist.</p></div>';
                    $(".page").html(errorHtml);
                }
            });
            this.firstvView=1;
        },
        getMovie: function (id) {
            this._cleanUp();
            var modFilm = new MovieModel();
            modFilm.url = modFilm.urlRoot + id;
            var watchListsCollection = new WatchlistCollection;
            watchListsCollection.url = "watchlists";
            var self=this;
            watchListsCollection.fetch().done(function () {
                modFilm.fetch().done(function () {
                    self.currentView = new MovieView({
                        model: modFilm,
                        collection: watchListsCollection
                    });
                });
            });
            this.firstvView=1;
        },
        getActor: function (id) {
            this._cleanUp();
            var modActor = new ActorModel();
            var modActorMovies = new ActorMovies();
            var modImgActor = new ActorImgModel();
            modActor.url = modActor.urlRoot + id;
            modActorMovies.url = modActor.url + "/movies";
            var self=this;
            modImgActor.url = modActorMovies.url;
            modActor.fetch().done(function () {
                modActorMovies.fetch().done(function () {
                    modImgActor.fetch().done(function () {
                        self.currentView = new ActorView({
                            model: modActor,
                            collection: modActorMovies
                        });
                        var actorImgView = new ActorImgView({
                            model: modImgActor
                        });

                    });
                });
            });
            this.firstvView=1;
        },
        getTVShow: function (id) {
            alert("allo");
            this._cleanUp();
            var modTVShow = new TVShowModel();
            var tvShowEpisodesCollection = new TVShowEpisodesCollection();

            modTVShow.url = modTVShow.urlRoot + id;
            tvShowEpisodesCollection.url = modTVShow.url + "/episodes";
            var self=this;

            modTVShow.fetch().done(function () {
                tvShowEpisodesCollection.fetch().done(function () {

                    self.currentView = new TVShowView({
                        model: modTVShow,
                        collection: tvShowEpisodesCollection
                    });

                });
            });
            this.firstvView=1;
        },
        getUser : function (id){
            this._cleanUp();


            var user = new UserModel();
            user.url = user.urlRoot + id;

            var userPublicInfo = JSON.parse($.cookie("userPublicInfo"));
            var loggedUserId = userPublicInfo.id;

            var loggedUser = new UserModel();
            loggedUser.url = loggedUser.urlRoot + loggedUserId;

            var self=this;

            var watchListsCollection = new WatchlistCollection;
            watchListsCollection.url = "watchlists";
            user.fetch().done(function() {
                watchListsCollection.fetch().done(function () {
                    loggedUser.fetch().done(function () {

                        self.currentView = new UserView(user, watchListsCollection,loggedUser);

                    });
                });
            });


            this.firstvView=1;

        },
        defaultRoute: function (actions) {
            console.log("defaultRoute Route Loaded.");
        },
        parseQueryString: function (queryString) {
            var params = {};
            if (queryString) {
                _.each(
                    _.map(decodeURI(queryString).split(/&/g), function (el, i) {
                        var aux = el.split('='), o = {};
                        if (aux.length >= 1) {
                            var val = undefined;
                            if (aux.length == 2)
                                val = aux[1];
                            o[aux[0]] = val;
                        }
                        return o;
                    }),
                    function (o) {
                        _.extend(params, o);
                    }
                );
            }
            return params;
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
