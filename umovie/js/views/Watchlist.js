var app = app || {};

(function () {
    'use strict';

    require(['backbone', 'text!../templates/WatchlistView.html'], function (Backbone, Template) {

        app.WatchlistModel = Backbone.Model.extend({
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
                return response.movies;
            }
        });

        app.WatchlistView = Backbone.View.extend({
            template: _.template(Template),
            el: ".page",
            initialize: function () {
                console.log("WatchlistView initializing...");
                this.render();
            },
            render: function () {
                console.log("WatchlistView rendering...");
                this.$el.html(this.template({
                    watchlist: this.model.toJSON()
                }));
            }
        });

    });
})();
