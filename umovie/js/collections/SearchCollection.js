define(['backbone'], function (Backbone) {


    var SearchCollection = Backbone.Collection.extend({
        model: Backbone.Model.extend({}),
        parse: function (response) {
            return response;
        }
    });

    return SearchCollection;
});