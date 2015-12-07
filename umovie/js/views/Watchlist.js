define(['backbone', 'models/WatchlistModel', 'models/MovieModel', 'text!templates/WatchlistView.html'], function (Backbone, WatchlistModel, MovieModel, Template) {

    console.log("Watchlist: defined");

    var WatchlistView = Backbone.View.extend({
        template: _.template(Template),
        el: ".page",
        events: {
            "click .btn-danger": "deleteWatchlist",
            "click .remove": "removeMovie",
            "click .btn-success": "addWatchlist",
            "click .modify": "modifyWatchlist"
        },
        initialize: function () {
            console.log("WatchlistView initializing...");
            var self = this;
            this.collection.bind('sync add remove update', function () {
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
            var modWatchlist = new WatchlistModel();
            modWatchlist.url = modWatchlist.urlRoot + targetID;
            modWatchlist.fetch({type: 'DELETE'}).done(function () {
                console.log("Deleting watchlist...")
            });
            this.collection.remove({
                "id": targetID
            });
        },
        removeMovie: function (event) {
            var data = $.parseJSON($(event.target).attr('data-button'));
            var watchlistID = data.watchlistId;
            var trackId = data.trackId;
            var modMovie = new MovieModel();
            modMovie.url = "watchlists/" + watchlistID + "/movies/" + trackId;
            modMovie.fetch({type: 'DELETE'}).done(function () {
                console.log("Removing movie...")
            });
            this.collection.fetch({
                update: true
            });
        },
        addWatchlist: function (event) {
            var isValid = this.collection.create({
                "name": $("#textArea").val(),
                "owner": "owner@mail.com"
            }, {
                type: 'POST',
                validate: true
            });
        },
        modifyWatchlist: function (event) {
            var self = this;
            var watchlistID = $(event.target).attr('data-button');
            var newName = $('#name' + watchlistID).val();
            var modWatchlist = new WatchlistModel();
            modWatchlist.url = modWatchlist.urlRoot + watchlistID;

            modWatchlist.fetch().done(function () {
                console.log("Modifying watchlist name...");
                modWatchlist.save({name: newName}).done(function () {
                    self.collection.fetch();
                });
            });
        }
    });

    return WatchlistView;
});