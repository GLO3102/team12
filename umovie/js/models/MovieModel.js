define(['backbone'], function (Backbone) {

    console.log("MovieModel: entering DEFINE");

    var MovieModel = Backbone.Model.extend({
        urlRoot: "unsecure/movies/",
        parse: function (response) {
            console.log("MovieModel parsing...");
            if (typeof response.results !== 'undefined')
                return response.results[0];
            else
                return response;
        }
    });

    console.log("MovieModel: returning");

    return MovieModel;
});
