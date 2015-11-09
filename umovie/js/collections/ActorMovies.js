define(['backbone', 'models/ActorMovieModel'], function (Backbone, ActorMovieModel) {

    console.log("ActorMovies: entering define.");

    var ActorMovies = Backbone.Collection.extend({
        model: ActorMovieModel,
        parse: function (response) {
            return response;
        }
    });

    console.log("ActorMovies: returning");

    return ActorMovies;
});