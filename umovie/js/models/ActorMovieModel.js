define(['backbone'], function (Backbone) {

    console.log("ActorMovieModel: entering define");

    var ActorMovieModel = Backbone.Model.extend({
        parse: function (response) {
            return response.results;
        }
    });

    console.log("ActorMovieModel: returning");

    return ActorMovieModel;
});