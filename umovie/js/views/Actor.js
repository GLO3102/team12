define([
    'backbone',
    'collections/ActorMovies',
    'models/ActorMovieModel',
    'models/ActorModel',
    '../models/ActorImgModel',
    'text!templates/ActorView.html',
    'text!templates/ActorImgView.html',
    'helper/util'
], function (Backbone, ActorMovies, ActorMovieModel, ActorModel, ActorImg, ActorTemplate, ActorImgTemplate, Util) {

    console.log("ActorView: defined");

    var ActorView = Backbone.View.extend({
        template: _.template(ActorTemplate),
        el: ".page",
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template({
                mod: this.model.toJSON(),
                movies: this.collection.toJSON(),
                resizer: Util
            }));
        },
        remove: function () {
            this.$el.empty();
            this.undelegateEvents();
            return this;
        }

    });

    return ActorView;
});