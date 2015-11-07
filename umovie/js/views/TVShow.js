var app = app || {};

(function () {
    'use strict';

    require(['backbone', 'text!templates/TVShowView.html'], function (Backbone, Template) {

        app.TVShowEpisodeModel = Backbone.Model.extend({
            parse: function (response) {
                return response.results;
            }
        });

        app.TVShowEpisodesCollection = Backbone.Collection.extend({
            model: app.TVShowEpisodeModel,
            parse: function (response) {
                return response;
            }
        });

        app.TVShowModel = Backbone.Model.extend({
            urlRoot: "unsecure/tvshows/season/",

            parse: function (response) {
                return response.results[0];
            }
        });

        app.TVShowView = Backbone.View.extend({

            template: _.template(Template),
            el: ".page",

            initialize: function () {
                this.render();
            },
            render: function () {
                var modelJSON = this.model.toJSON();
                var youtubeVideo = this.findYoutubeVideo(modelJSON.artistName + 'trailer');
                this.$el.html(this.template({
                    mod: modelJSON,
                    episodes: this.collection.toJSON(),
                    youtubeVideoId: youtubeVideo
                }));
            },
            findYoutubeVideo: function(keyword) {
                var url = 'https://www.googleapis.com/youtube/v3/search?part=id&q=' + keyword + '&type=video&key=AIzaSyA2Sh1KhOUfKYpfQchT5oZPgO0PpTqB17M';
                var videos = undefined;
                $.ajaxSetup({
                    async: false
                });
                $.getJSON(url, function(data) {
                    videos = data;
                });
                $.ajaxSetup({
                    async: true
                });
                return videos.items[0].id.videoId;
            }

        });

    });
})();