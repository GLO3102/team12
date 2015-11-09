define(['backbone'], function (Backbone) {

    console.log("TVShowModel: entering DEFINE");

    var TVShowModel = Backbone.Model.extend({
        urlRoot: "unsecure/tvshows/season/",
        parse: function (response) {
            return response.results[0];
        }
    });

    console.log("TVShowModel: returning");

    return TVShowModel;
});