var app = app || {};

(function () {
    'use strict';

    require(['backbone', 'text!templates/MovieView.html'], function (Backbone, Template) {

        app.MovieModel = Backbone.Model.extend({
            urlRoot: "unsecure/movies/",

            parse: function (response) {
                console.log("MovieModel parsing...");
                return response.results[0];
            }
        });

        app.MovieView = Backbone.View.extend({
            template: _.template(Template),
            el: ".page",
            events: {
                "click .btn-default" : "addToWatchlist"
            },

            initialize: function () {
                console.log("MovieView initializing...");
                this.render();
            },
            render: function () {
                var modelJSON = this.model.toJSON();
                var youtubeVideo = this.findYoutubeVideo(modelJSON.trackName + 'trailer');
                var watchlists = this.collection.toJSON().slice(0,10);
                console.log("Found youtube video: " + youtubeVideo);
                console.log("MovieView rendering...");
                this.$el.html(this.template({
                    mod: modelJSON,
                    youtubeVideoId: youtubeVideo,
                    watchlists: watchlists
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
            },
            addToWatchlist: function(event) {
                var targetID = event.target.id;
                var modWatchlist = new app.WatchlistModel();
                modWatchlist.url = modWatchlist.urlRoot + targetID + "/movies";
                modWatchlist.fetch({data: this.model.attributes, type: 'POST'});
            }
        });

    });
})();
