var disqus_config = undefined;
var disqus_shortname = 'umovie-team12';

define(['backbone', 'models/MovieModel', 'models/WatchlistModel', 'text!templates/MovieView.html', 'helper/util', 'jquery.cookie'], function (Backbone, MovieModel, WatchlistModel, Template, Util) {

    var MovieView = Backbone.View.extend({
        template: _.template(Template),
        el: ".page",
        events: {
            "click .btn-default": "addToWatchlist"
        },
        initialize: function () {
            console.log("MovieView initializing...");

            if ($.cookie("userPublicInfo")) {
                var remote_auth_token = "";
                var userPublicInfo = JSON.parse($.cookie("userPublicInfo"));
                this.loggedUserId = userPublicInfo.id;

            }


            this.render();
        },
        render: function () {
            var modelJSON = this.model.toJSON();
            var youtubeVideo = this.findYoutubeVideo(modelJSON.trackName + 'trailer');
            var watchlists = this.collection.toJSON();
            console.log("Found youtube video: " + youtubeVideo);
            console.log("MovieView rendering...");
            this.renderReviewSection(modelJSON);
            this.$el.html(this.template({
                mod: modelJSON,
                youtubeVideoId: youtubeVideo,
                watchlists: watchlists,
                loggedUserId:  this.loggedUserId,
                resizer: Util
            }));
        },
        renderReviewSection: function (movie_infos) {
            console.log("Rendering Review section.");
            if ($.cookie("userPublicInfo")) {
                var remote_auth_token = "";
                var userPublicInfo = JSON.parse($.cookie("userPublicInfo"));
                var userData = {
                    user: {
                        id: userPublicInfo.id,
                        username: userPublicInfo.name,
                        email: userPublicInfo.email
                    }
                };
                $.post("http://localhost:8081/disqus/sso", userData, function (data, textStatus) {
                    disqus_config = function () {
                        var curloc = "http://localhost:63342/team12/umovie/movies/" + movie_infos.trackId;
                        this.page.url = curloc;
                        this.page.identifier = movie_infos.trackId;
                        this.page.title = movie_infos.trackName;
                        this.page.remote_auth_s3 = data.auth;
                        this.page.api_key = data.pubKey;
                    };
                    (function () { // DON'T EDIT BELOW THIS LINE
                        var d = document, s = d.createElement('script');
                        s.src = '//umovie-team12.disqus.com/embed.js';
                        s.setAttribute('data-timestamp', +new Date());
                        (d.head || d.body).appendChild(s);
                    })();
                    return {};
                }, "json");
            }
        },
        findYoutubeVideo: function (keyword) {
            var url = 'https://www.googleapis.com/youtube/v3/search?part=id&q=' + keyword + '&type=video&key=AIzaSyDkzzieUjeXVrM9m6JPVFT_MmfPxLaHkyI';
            var videos = undefined;
            var html_template = '<iframe id="player" type="text/html" width="640" height="390" src="http://www.youtube.com/embed/<%= youtubeVideoId %>" frameborder="0"></iframe>';

            $.getJSON(url, function (data) {
                $("#youtube-preview").html(html_template.replace('<%= youtubeVideoId %>', data.items[0].id.videoId));
            });
        },
        addToWatchlist: function (event) {
            var targetID = event.target.id;
            var modWatchlist = new WatchlistModel();
            modWatchlist.url = modWatchlist.urlRoot + targetID + "/movies";
            modWatchlist.fetch({data: this.model.attributes, type: 'POST'});
        }
    });

    return MovieView;
});
