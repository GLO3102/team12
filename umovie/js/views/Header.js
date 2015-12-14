define(['backbone', 'text!templates/HeaderView.html', 'jquery.cookie', 'jquery-ui'], function (Backbone, HeaderTemplate) {
    var HeaderView = Backbone.View.extend({
        template: _.template(HeaderTemplate),
        el: '.header',
        events: {
            "keypress input#minisearch": "navigateToSearchPage"
        },
        navigateToSearchPage: function (event) {
            if (event.which == 13 || event.keyCode == 13) {
                Backbone.history.navigate('/search?q=' + $(event.target).val(), {trigger: true, replace: true});
                return false;
            }
            $.ajax({
                type: 'GET',
                url: 'search?q=' + $(event.target).val(),
                content: 'application/json'
            }).done(function (data) {
                var names = [];
                var results = data.results;
                results.forEach(function (result) {
                    var wrapperType = result.wrapperType;
                    if (wrapperType === 'track') {
                        names.push(result.trackName)
                    } else if (wrapperType === 'collection') {
                        names.push(result.collectionName)
                    } else if (wrapperType === 'artist') {
                        names.push(result.artistName)
                    }
                });
                $("#minisearch").autocomplete({
                    appendTo: $("#minisearch").next(),
                    source: names
                });
            });
            return true;
        },
        render: function () {
            var user = undefined;
            var token = $.cookie("token");
            var self = this;
            if (token) {
                $.ajax({
                    type: "GET",
                    url: "tokenInfo"
                }).done(function (data) {
                    user = data;
                    $.cookie("userPublicInfo", JSON.stringify(user));
                    console.log("HeaderView: rendering template...");
                    self.$el.html(self.template({
                        user: user
                    }));
                    console.log("HeaderView: done");
                });
            }
            else {
                console.log("Not logged in. Redirecting to login page...");
                Backbone.history.navigate('login', {trigger: true});
            }
        }
    });

    return HeaderView;
});
