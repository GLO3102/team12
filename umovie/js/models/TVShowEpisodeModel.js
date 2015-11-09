define(['backbone'], function (Backbone) {

    console.log("TVShowEpisodesModel: defined");

    var TVShowEpisodeModel = Backbone.Model.extend({
        parse: function (response) {
            return response.results;
        }
    });

    return TVShowEpisodeModel;
});