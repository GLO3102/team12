var app = app || {};

(function () {
    'use strict';

    require(['backbone', 'text!../templates/MovieView.html'], function (Backbone, Template) {

        app.MovieModel = Backbone.Model.extend({
            urlRoot: "unsecure/movies/",

            parse: function (response) {
                return response.results[0];
            }
        });

        app.MovieView = Backbone.View.extend({
            template: _.template(Template),
            el: ".page",

            initialize: function () {
                this.render();
            },
            render: function () {
                this.$el.html(this.template({
                    mod: this.model.toJSON()
                }));
            }

        });


    });
})();
