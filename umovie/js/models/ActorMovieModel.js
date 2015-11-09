define(['backbone'], function (Backbone) {

    console.log("ActorMovieModel: defined");

    var ActorMovieModel = Backbone.Model.extend({
        parse: function (response) {
            return response.results;
        }
    });

    return ActorMovieModel;
});