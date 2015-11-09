define(['backbone', 'models/WatchlistModel'], function (Backbone, WatchlistModel) {

    console.log("WatchlistCollection: defined");

    var WatchlistCollection = Backbone.Collection.extend({
        model: WatchlistModel,
        parse: function (response) {
            console.log("WatchlistCollection parsing...");
            return response;
        }
    });

    return WatchlistCollection;
});