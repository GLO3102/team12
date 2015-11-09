define(['backbone'], function (Backbone) {

    console.log("ActorImg: define");

    var ActorImgModel = Backbone.Model.extend({
        parse: function (response) {
            return response.results[0];
        }
    });

    console.log("ActorImg: returning");

    return ActorImgModel;
});