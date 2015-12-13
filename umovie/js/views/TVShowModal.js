define([
    'backbone',
    'text!templates/TVShowModalView.html',
    'jquery.cookie',
    'helper/util'
], function (Backbone, TVShowModalViewTemplate, Util) {

    var TVShowModalView = Backbone.View.extend({
        template: _.template(TVShowModalViewTemplate),
        el: '#modalContainer',
        events: {
            "click #close" : "close",
        },
        initialize: function () {
            this.render();
        },
        close: function() {

            var EpisodeUrl = Backbone.history.getFragment();
            var SeasonUrl = EpisodeUrl.substring(0, EpisodeUrl.lastIndexOf("/")+1);

            $("#tvshow-modal").hide();
            $("#tvshow-modal").remove();
            $('.modal-backdrop').remove();
            $("body").removeClass("modal-open");

            Backbone.history.navigate('//' + SeasonUrl, {trigger: true});

        },
        render: function () {
            var EpisodeUrl = Backbone.history.getFragment();
            var episodeId = (EpisodeUrl.substring(EpisodeUrl.lastIndexOf('/') + 1));

            var modelJSON = this.model.toJSON();

            var youtubeVideo = this.findYoutubeVideo(modelJSON.collectionName +' E' + episodeId + ' ' + ' trailer');
            console.log(modelJSON.collectionName +' Episode ' + episodeId + ' trailer');

            console.log("TVShowModalView: rendering template...");
            /*this.$el.html(this.template());*/
            this.$el.html(this.template({
                mod: modelJSON,
                episodes: this.collection.toJSON(),
                youtubeVideoId: youtubeVideo,
                id: episodeId-1,
                resizer: Util
            }));
            console.log("TVShowModalView: done");
        },
        findYoutubeVideo: function (keyword) {
            var url = 'https://www.googleapis.com/youtube/v3/search?part=id&q=' + keyword + '&type=video&key=AIzaSyDkzzieUjeXVrM9m6JPVFT_MmfPxLaHkyI';
            var videos = undefined;
            $.ajaxSetup({
                async: false
            });
            $.getJSON(url, function (data) {
                videos = data;
            });
            $.ajaxSetup({
                async: true
            });
            return videos.items[0].id.videoId;
        }
    });

    return TVShowModalView;
});

