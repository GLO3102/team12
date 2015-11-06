var app = app || {};

$(function ($) {
    'use strict';

    /**
     * View HomePage.
     */
    app.HomePageView = Backbone.View.extend({

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
            var template = _.template($("#homepage-template").html());
            var vars = {foo: "bar"};
            var html = template(vars);
            console.log("done");
            this.$el.html(html);
        }
    });

    // View Instance
    app.homePage = new app.HomePageView();
});
