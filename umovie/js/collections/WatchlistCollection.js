define(['backbone', 'models/WatchlistModel'], function (Backbone, WatchlistModel) {

    console.log("WatchlistCollection: entering DEFINE");

    var WatchlistCollection = Backbone.Collection.extend({
        model: WatchlistModel,
        parse: function (response) {
            console.log("WatchlistCollection parsing...");
            return response;
        }
    });

    console.log("WatchlistCollection: returning");

    return WatchlistCollection;
});