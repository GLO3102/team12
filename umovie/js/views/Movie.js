var app = app || {};

(function () {
    'use strict';

    require(['backbone', 'text!../templates/MovieView.html'], function (Backbone, Template) {

        app.MovieModel = Backbone.Model.extend({
            urlRoot: "unsecure/movies/",

            parse: function (response) {
                console.log("MovieModel parsing...");
                return response.results[0];
            }
        });

        app.MovieView = Backbone.View.extend({
            template: _.template(Template),
            el: ".page",

            initialize: function () {
                console.log("MovieView initializing...");
                this.render();
            },
            render: function () {
                console.log("MovieView rendering...");
                this.$el.html(this.template({
                    mod: this.model.toJSON()
                }));
            }
        });


    });
})();
