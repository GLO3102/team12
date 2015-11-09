define(['backbone', 'models/TVShowEpisodeModel'], function (Backbone, TVShowEpisodeModel) {

    console.log("TVShowEpisodesCollection: entering DEFINE");

    var TVShowEpisodesCollection = Backbone.Collection.extend({
        model: TVShowEpisodeModel,
        parse: function (response) {
            return response;
        }
    });

    console.log("TVShowEpisodesCollection: returning.");

    return TVShowEpisodesCollection;
});
