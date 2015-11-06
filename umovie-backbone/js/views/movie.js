var app = app || {};

$(function() {
    MovieModel = Backbone.Model.extend({
        urlRoot: "unsecure/movies/",

        parse: function(response){
            return response.results;
        }
    });
});

$(function() {
    MovieView = Backbone.View.extend({
        template: _.template($("#movie-tpl").html()),
        el: ".page",

        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(this.template({
                mod: this.model.toJSON()
            }));
        }

    });

});