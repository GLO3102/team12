/**
 * Created by user on 2015-12-08.
 */
define(['backbone'], function (Backbone) {

    console.log("userModel: defined");

    var userModel = Backbone.Model.extend({
        urlRoot: "users/",
        parse: function (response) {
            console.log("userModel parsing...");
            if (typeof response.results !== 'undefined')
                return response.results[0];
            else
                return response;
        }
    });

    return userModel;
});
