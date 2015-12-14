define([
    'jquery',
    'underscore',
    'backbone',
    'select2',
    'text!templates/SearchView.html',
    'collections/SearchCollection',
    'collections/MoviesGenreCollection',
    'collections/TvshowGenreCollection',
    'models/WatchlistModel',
    'collections/WatchlistCollection'], function ($, _, Backbone, select2, Template, SearchCollection, MoviesGenres, TvshowGenres, WatchlistModel,WatchlistCollection) {


    var SearchView = Backbone.View.extend({

        el: '.page',
        events: {
            'click .addToWatchList': 'addToWatchlist',
            'click .follow-user':    'followUser',
            'change .movies-genres': 'selectMovieGenre',
            'change .tvshow-genres': 'selectTvshowGenre'
        },
        initialize: function(filter) {
            var self = this;
            self.filter = filter || {};

            self.results = [];
            self.moviesGenres = [];
            self.tvshowGenres = [];
            self.users = [];
            self.watchlists = [];

            if ($.cookie("userPublicInfo")) {
                var remote_auth_token = "";
                var userPublicInfo = JSON.parse($.cookie("userPublicInfo"));
                this.loggedUserId = userPublicInfo.id;
            }

            self.getResults();

        },
        remove: function() {
            this.$el.empty();
            this.undelegateEvents();
            return this;
        },
        render: function () {
            var self = this;
            var template = _.template(Template);
            var html = template({filter: self.filter, loggedUserId:  this.loggedUserId, watchlists: self.watchlists, results:self.results, moviesGenres:self.moviesGenres, tvshowGenres:self.tvshowGenres, users: self.users});
            this.$el.html(html);
            this.$el.find('.movies-genres').select2({ placeholder: "Movie genre", width: 'resolve' });
            this.$el.find('.tvshow-genres').select2({ placeholder: "Tv show genre", width: 'resolve' });
            this.$el.find('.btn-primary').popover({
                title: "Add to watchlist",
                html: true,
                animation: true
            });
        },

        addToWatchlist: function (evt) {
            var self = this;
            var watchlistId = $(evt.target).data('id');
            var movieId = $(evt.target).data('movie-id');
            var movie = self.results.find(function (m) {
                return m.trackId == movieId;
            });
            if(movie && watchlistId && movieId){
                var modWatchlist = new WatchlistModel();
                modWatchlist.url = modWatchlist.urlRoot + watchlistId + "/movies";
                modWatchlist.fetch({data: movie, type: 'POST'});
            } else {
                console.log('Error: Movie not found!!');
            }
        },

        followUser: function (evt) {
            var self=this;

            var userId = $(evt.target).data('id');
            $.ajax({
                type: "POST",
                url: "follow",
                contentType: "application/json",
                data: JSON.stringify({
                    id: userId
                })
            }).done( function(data) {
                console.log(userId);
            }).fail(function (XMLHttpRequest) {
                console.log("Something went wrong while adding a new friend.");
            });
        },

        selectMovieGenre: function (evt) {
            var mg = $(evt.target).val();
            if(mg != 0 && this.filter.q){
                var url = '/search?q='+ this.filter.q + '&mg=' + mg;
                if(this.filter.tg)
                    url += '&tg=' + this.filter.tg;
                Backbone.history.navigate(url,{trigger:true,replace:true});
            } else if(mg == 0){
                var url = '/search?q='+ this.filter.q;
                if(this.filter.tg)
                    url += '&tg=' + this.filter.tg;
                Backbone.history.navigate(url,{trigger:true,replace:true});
            }
        },

        selectTvshowGenre: function (evt) {
            var tg = $(evt.target).val();
            if(tg != 0 && this.filter.q){
                var url = '/search?q='+ this.filter.q + '&tg=' + tg;
                if(this.filter.mg)
                    url += '&mg=' + this.filter.mg;
                Backbone.history.navigate(url,{trigger:true,replace:true});
            } else if(tg == 0){
                var url = '/search?q='+ this.filter.q;
                if(this.filter.mg)
                    url += '&mg=' + this.filter.mg;
                Backbone.history.navigate(url,{trigger:true,replace:true});
            }
        },

        getResults: function () {
            var self = this;

            $('#loader img').css('display', 'block');

            self.moviesGenresDeferred = $.Deferred();
            self.tvshowGenresDeferred = $.Deferred();
            self.moviesDeferred = $.Deferred();
            self.tvshowsDeferred = $.Deferred();
            self.actorsDeferred = $.Deferred();
            self.usersDeferred = $.Deferred();
            self.watchlistDeferred = $.Deferred();

            self.watchlistCollection = new WatchlistCollection();
            self.watchlistCollection.fetch({url: 'watchlists',success:function(model, data) {
                self.watchlists = data;
                self.watchlistDeferred.resolve();
            }
            });

            self.moviesGenresCollection = new MoviesGenres();
            self.moviesGenresCollection.fetch({url: 'genres/movies', success:function(model, data) {
                self.moviesGenres = data;
                self.moviesGenresDeferred.resolve();
            }
            });

            self.tvshowGenresCollection = new MoviesGenres();
            self.tvshowGenresCollection.fetch({url: 'genres/tvshows', success:function(model, data) {
                self.tvshowGenres = data;
                self.tvshowGenresDeferred.resolve();
            }
            });

            var url_movies = 'search/movies';
            if(self.filter.q){
                url_movies += '?q=' + self.filter.q;
                if(self.filter.mg)
                    url_movies += '&genre=' + self.filter.mg;
            }
            self.moviesCollection = new SearchCollection();
            self.moviesCollection.fetch({url: url_movies, success:function(model, data) {
                self.results = data.results;
                self.moviesDeferred.resolve();
            }
            });

            var url_tvshows = 'search/tvshows/seasons';
            if(self.filter.q){
                url_tvshows += '?q=' + self.filter.q;
                if(self.filter.tg)
                    url_tvshows += '&genre=' + self.filter.tg;
            }
            self.tvshowsCollection = new SearchCollection();
            self.tvshowsCollection.fetch({url: url_tvshows, success:function(model, data) {
                self.results = self.results.concat(data.results);
                self.tvshowsDeferred.resolve();
            }
            });

            var url_actors = 'search/actors';
            if(self.filter.q){
                url_actors += '?q=' + self.filter.q;
            }
            self.actorsCollection = new SearchCollection();
            self.actorsCollection.fetch({url: url_actors, success:function(model, data) {
                self.results = self.results.concat(data.results);
                self.actorsDeferred.resolve();
            }
            });

            var url_users = 'search/users';
            if(self.filter.q){
                url_users += '?q=' + self.filter.q;
            }
            self.usersCollection = new SearchCollection();
            self.usersCollection.fetch({url: url_users, success:function(model, data) {
                self.users = data;
                self.usersDeferred.resolve();
            }
            });

            $.when(self.moviesGenresDeferred, self.tvshowGenresDeferred, self.moviesDeferred, self.tvshowsDeferred, self.actorsDeferred, self.usersDeferred).done(function () {
                self.render();
                $('#loader img').css('display', 'none');
            })

        }
    });

    function delay(elem, src, delayTime) {
        window.setTimeout(function () {
            elem.setAttribute("src", src);
        }, delayTime);
    }

    return SearchView;
});