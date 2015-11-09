define(['backbone', 'models/TVShowEpisodeModel'], function (Backbone, TVShowEpisodeModel) {

    console.log("TVShowEpisodesCollection: defined");

    var TVShowEpisodesCollection = Backbone.Collection.extend({
        model: TVShowEpisodeModel,
        parse: function (response) {
            return response;
        }
    });

    return TVShowEpisodesCollection;
});
