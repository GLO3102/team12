define(['backbone'], function (Backbone) {

    console.log("TVShowEpisodesModel: entering define");

    var TVShowEpisodeModel = Backbone.Model.extend({
        parse: function (response) {
            return response.results;
        }
    });

    console.log("TVShowEpisodesModel: returning");

    return TVShowEpisodeModel;
});