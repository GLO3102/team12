var app = app || {};

$(function() {
    ActorMovieModel = Backbone.Model.extend({
        parse: function(response){
            return response.results;
        }
    });
});

$(function() {
    ActorMovies = Backbone.Collection.extend({
        model: ActorMovieModel,
        parse: function(response){
            return response;
        }
    });
});

$(function() {
    ActorModel = Backbone.Model.extend({
        urlRoot: "unsecure/actors/",

        parse: function(response){
            return response.results[0];
        }
    });
});

$(function() {
    ActorView = Backbone.View.extend({

        template: _.template($("#actor-tpl").html()),
        el: ".page",

        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(this.template({
                mod: this.model.toJSON(),
                movies: this.collection.toJSON()
            }));
        }

    });

});