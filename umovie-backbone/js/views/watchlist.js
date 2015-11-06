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