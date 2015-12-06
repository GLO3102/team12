define(['backbone'], function (Backbone) {

    console.log("MovieModel: defined");

    var MovieModel = Backbone.Model.extend({
        urlRoot: "movies/",
        parse: function (response) {
            console.log("MovieModel parsing...");
            if (typeof response.results !== 'undefined')
                return response.results[0];
            else
                return response;
        }
    });

    return MovieModel;
});
