var app = app || {};

(function () {
    'use strict';

    require(['backbone', 'text!templates/ActorView.html','text!templates/ActorImgView.html'], function (Backbone, Template,Template2) {


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
                console.log("ac");

                //alert(response.results[0]);
                return response.results[0];
            }
        });

        app.ActorImg= Backbone.Model.extend({
            //url: "http://umovie.herokuapp.com/unsecure/actors/272994458/movies",

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

        app.ActorImgView = Backbone.View.extend({

            template: _.template(Template2),
            el: ".imgActorSection",

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