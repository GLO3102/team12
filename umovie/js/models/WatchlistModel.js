define(['backbone'], function (Backbone) {

    console.log("WatchlistModel: entering DEFINE");

    var WatchlistModel = Backbone.Model.extend({
        //validation name required
        validate: function (attrs) {
            if (!attrs.name)
                return "Watchlist name is required"
        },
        urlRoot: "unsecure/watchlists/",

        parse: function (response) {
            console.log("WatchlistModel parsing...");
            return response;
        }
    });

    console.log("Watchlistmodel: returning");

    return WatchlistModel;
});