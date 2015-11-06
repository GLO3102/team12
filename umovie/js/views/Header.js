var app = app || {};

(function () {
    'use strict';

    require(['backbone', 'text!../templates/HeaderView.html'], function (Backbone, Template) {
        /**
         * Header View
         */
        app.HeaderView = Backbone.View.extend({
            // Bind on the page container.
            el: '.header',
            //events: {
            //
            //},
            //initialize: function() {
            //    //this.listenTo(app.todos, 'add', this.addOne);
            //},
            render: function () {
                console.log("rendering template...");
                var template = _.template(Template);
                var vars = {foo: "bar"};
                var html = template(vars);
                console.log("done");
                this.$el.html(html);
            }
        });

        // View Instance
        app.header = new app.HeaderView();
    });
})();
