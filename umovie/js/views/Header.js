define(['backbone','text!templates/HeaderView.html', 'jquery.cookie'], function (Backbone, HeaderTemplate) {
    var HeaderView = Backbone.View.extend({
        template: _.template(HeaderTemplate),
        el: '.header',

        render: function () {
            var user = undefined;
            var token = $.cookie("token");
            var self = this;
            debugger;
            if(token) {
                $.ajax({
                    type: "GET",
                    url: "https://umovie.herokuapp.com/tokenInfo"
                }).done( function (data) {
                    user = data;
                    console.log("HeaderView: rendering template...");
                    self.$el.html(self.template({
                        user: user
                    }));
                    console.log("HeaderView: done");
                });
            }
            else {
                console.log("Not logged in. Redirecting to login page...");
                Backbone.history.navigate('login',{trigger: true});
            }
        }
    });

    return HeaderView;
});
