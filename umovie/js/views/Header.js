define(['backbone', 'text!templates/HeaderView.html', 'jquery.cookie'], function (Backbone, HeaderTemplate) {
    var HeaderView = Backbone.View.extend({
        template: _.template(HeaderTemplate),
        el: '.header',
        events: {
            "keypress input#minisearch": "navigateToSearchPage"
        },

        navigateToSearchPage: function(event) {
            if (event.which == 13 || event.keyCode == 13) {
                // var app_router = new UmovieRouter();
                // location.hash = "#search/" + encodeURIComponent(val.trim());
                Backbone.history.navigate('/search?q=' + $(event.target).val(), {trigger: true, replace: true});
                return false;
            }
            return true;
        },

        render: function () {
            var user = undefined;
            var token = $.cookie("token");
            var self = this;
            //debugger;
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
