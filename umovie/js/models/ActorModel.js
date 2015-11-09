define(['backbone'], function (Backbone) {

    console.log("ActorModel: defined");

    var ActorModel = Backbone.Model.extend({
        urlRoot: "unsecure/actors/",
        parse: function (response) {
            console.log("ActorModel: parsing");
            return response.results[0];
        }
    });

    return ActorModel;
});