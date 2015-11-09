define(['backbone', 'models/ActorMovieModel'], function (Backbone, ActorMovieModel) {

    console.log("ActorMovies: defined");

    var ActorMovies = Backbone.Collection.extend({
        model: ActorMovieModel,
        parse: function (response) {
            return response;
        }
    });

    return ActorMovies;
});