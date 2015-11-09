var app = app || {};

(function () {
    'use strict';

    require(['backbone', 'text!templates/WatchlistView.html'], function (Backbone, Template) {

        app.WatchlistModel = Backbone.Model.extend({
            //validation name required
            validate:function(attrs) {
                if (!attrs.name)
                    return "Watchlist name is required"
            },
            urlRoot: "unsecure/watchlists/",

            parse: function (response) {
                console.log("WatchlistModel parsing...");
                return response;
            }
        });

        app.WatchlistCollection = Backbone.Collection.extend({
            model: app.WatchlistModel,
            parse: function (response) {
                console.log("WatchlistCollection parsing...");
                return response;
            }
        });

        app.WatchlistView = Backbone.View.extend({
            template: _.template(Template),
            el: ".page",
            events: {
                "click .btn-danger" : "deleteWatchlist",
                "click .btn-warning" : "removeMovie",
                "click .btn-success" : "addWatchlist"
            },
            initialize: function () {
                console.log("WatchlistView initializing...");
                var self = this;
                this.collection.bind('sync add remove', function () {
                    self.render();
                });
                this.render();
            },
            render: function () {
                console.log("WatchlistView rendering...");
                this.$el.html(this.template({
                    watchlists: this.collection.toJSON()
                }));
            },
            deleteWatchlist: function () {
                var targetID = event.target.id;
                var modWatchlist = new app.WatchlistModel();
                modWatchlist.url = modWatchlist.urlRoot + targetID;
                modWatchlist.fetch({type: 'DELETE'}).done( function(){
                    console.log("Deleting watchlist...")
                });
                this.collection.remove({
                    "id" : targetID
                });
            },
            removeMovie: function(event) {
                var data = $.parseJSON($(event.target).attr('data-button'));
                var watchlistID = data.watchlistId;
                var trackId = data.trackId;
                var modMovie = new app.MovieModel();
                modMovie.url = "unsecure/watchlists/" + watchlistID + "/movies/" + trackId;
                modMovie.fetch({type: 'DELETE'}).done( function() {
                    console.log("Removing movie...")
                });
                this.collection.fetch({
                    update: true
                });
            },
            addWatchlist: function(event) {
                var isValid = this.collection.create({
                    "name": $("#textArea").val(),
                    "owner": "owner@mail.com"
                }, {
                    type : 'POST',
                    validate : true
                });
            }
        });

    });
})();
