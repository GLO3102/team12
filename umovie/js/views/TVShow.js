var app = app || {};

(function () {
    'use strict';

    require(['backbone', 'text!../templates/TVShowView.html'], function (Backbone, Template) {

        app.TVShowEpisodeModel = Backbone.Model.extend({
            parse: function (response) {
                return response.results;
            }
        });

        app.TVShowEpisodesCollection = Backbone.Collection.extend({
            model: app.TVShowEpisodeModel,
            parse: function (response) {
                return response;
            }
        });

        app.TVShowModel = Backbone.Model.extend({
            urlRoot: "unsecure/tvshows/season/",

            parse: function (response) {
                return response.results[0];
            }
        });

        app.TVShowView = Backbone.View.extend({

            template: _.template(Template),
            el: ".page",

            initialize: function () {
                this.render();
            },
            render: function () {
                this.$el.html(this.template({
                    mod: this.model.toJSON(),
                    episodes: this.collection.toJSON()
                }));
            }

        });

    });
})();