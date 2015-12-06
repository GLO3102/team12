define(['backbone'], function (Backbone) {

    console.log("TVShowModel: defined");

    var TVShowModel = Backbone.Model.extend({
        urlRoot: "tvshows/season/",
        parse: function (response) {
            return response.results[0];
        }
    });

    return TVShowModel;
});