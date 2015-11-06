var app = app || {};

(function () {
    'use strict';

    require(['backbone', 'text!../templates/ActorView.html'], function (Backbone, Template) {

        app.ActorMovieModel = Backbone.Model.extend({
            parse: function (response) {
                return response.results;
            }
        });

        app.ActorMovies = Backbone.Collection.extend({
            model: app.ActorMovieModel,
            parse: function (response) {
                return response;
            }
        });

        app.ActorModel = Backbone.Model.extend({
            urlRoot: "unsecure/actors/",

            parse: function (response) {
                return response.results[0];
            }
        });

        app.ActorView = Backbone.View.extend({

            template: _.template(Template),
            el: ".page",

            initialize: function () {
                this.render();
            },
            render: function () {
                this.$el.html(this.template({
                    mod: this.model.toJSON(),
                    movies: this.collection.toJSON()
                }));
            }

        });

    });
})();