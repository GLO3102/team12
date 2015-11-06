var app = app || {};

(function () {
    'use strict';

    require(['backbone', 'text!../templates/WatchlistView.html'], function (Backbone, Template) {

        app.WatchlistModel = Backbone.Model.extend({
            urlRoot: "unsecure/watchlists/",

            parse: function (response) {
                return response;
            }
        });

        app.WatchlistCollection = Backbone.Collection.extend({
            model: WatchlistModel,
            parse: function (response) {
                return response.movies;
            }
        });

        app.WatchlistView = Backbone.View.extend({
            template: _.template(Template),
            el: ".page",

            initialize: function () {
                this.render();
            },
            render: function () {
                this.$el.html(this.template({
                    watchlist: this.model.toJSON()
                }));
            }

        });
    });
})();
