define(['backbone'], function (Backbone) {

    console.log("ActorImg: defined");

    var ActorImgModel = Backbone.Model.extend({
        parse: function (response) {
            return response.results[0];
        }
    });

    return ActorImgModel;
});