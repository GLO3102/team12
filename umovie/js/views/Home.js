var app = app || {};

(function () {
    'use strict';

    require(['backbone', 'text!templates/HomeView.html'], function (Backbone, Template) {
        /**
         * View HomePage.
         */
        app.HomeView = Backbone.View.extend({
            el: '.page',
            render: function () {
                console.log("rendering template...");
                var template = _.template(Template);
                var vars = {foo: "bar"};
                var html = template(vars);
                console.log("done");
                this.$el.html(html);
            }
        });

        // Home View Instance
        app.homePage = new app.HomeView();
    });
})();
