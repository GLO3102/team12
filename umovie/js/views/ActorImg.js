define([
    'backbone',
    'text!templates/ActorImgView.html',
    'helper/util'
], function (Backbone, ActorImgTemplate, Util) {

    console.log("ActorImg: defined");

    var ActorImgView = Backbone.View.extend({
        template: _.template(ActorImgTemplate),
        el: ".imgActorSection",
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template({
                mod: this.model.toJSON(),
                resizer: Util
            }));
        }
    });

    return ActorImgView;
});
