var app = app || {};

$(function() {
    WatchlistModel = Backbone.Model.extend({
        urlRoot: "unsecure/watchlists/",

        parse: function(response){
            return response;
        }
    });
});

$(function() {
    WatchlistCollection = Backbone.Collection.extend({
        model: WatchlistModel,
        parse: function(response) {
            return response.movies;
        }
    });
});

$(function() {
    WatchlistView = Backbone.View.extend({
        template: _.template($("#watchlist-view").html()),
        el: ".page",

        initialize: function() {
			this.render();
        },
        render: function() {
			this.$el.html(this.template({
                watchlist: this.model.toJSON()
            }));
        }

    });

});