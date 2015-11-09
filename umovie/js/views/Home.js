define(['backbone', 'text!templates/HomeView.html'], function (Backbone, Template) {

    console.log("HomeView: entered DEFINE");

    var HomeView = Backbone.View.extend({
        el: '.page',
        render: function () {
            console.log("HomeView: rendering template...");
            var template = _.template(Template);
            var vars = {foo: "bar"};
            var html = template(vars);
            this.$el.html(html);
            console.log("HomeView: done");
        }
    });

    function delay(elem, src, delayTime) {
        window.setTimeout(function () {
            elem.setAttribute("src", src);
        }, delayTime);
    }

    console.log("HomeView: returning");

    return HomeView;
});