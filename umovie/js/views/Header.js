define(['backbone', 'text!templates/HeaderView.html'], function (Backbone, HeaderTemplate) {
    var HeaderView = Backbone.View.extend({
        el: '.header',
        render: function () {
            console.log("HeaderView: rendering template...");
            var template = _.template(HeaderTemplate);
            var vars = {foo: "bar"};
            var html = template(vars);
            this.$el.html(html);
            console.log("HeaderView: done");
        }
    });

    return HeaderView;
});
