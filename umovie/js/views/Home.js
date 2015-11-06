var app = app || {};

(function () {
    'use strict';

    require(['backbone', 'text!../templates/HomeView.html'], function (Backbone, Template) {
        /**
         * View HomePage.
         */
        app.HomeView = Backbone.View.extend({
            // Bind on the page container.
            el: '.page',
            //events: {
            //
            //},
            //initialize: function() {
            //    //this.listenTo(app.todos, 'add', this.addOne);
            //},
            render: function () {
                console.log("rendering template...");
                //var template = _.template($("#homepage-template").html());
                var template = _.template(Template);
                var vars = {foo: "bar"};
                var html = template(vars);
                console.log("done");
                this.$el.html(html);
            }
        });

        // View Instance
        app.homePage = new app.HomeView();
    });
})();
