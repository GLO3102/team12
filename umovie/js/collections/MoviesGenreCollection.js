define(['backbone'], function (Backbone) {


    var MoviesGenres = Backbone.Collection.extend({
        model: Backbone.Model.extend({}),
        parse: function (response) {
            return response;
        }
    });

    return MoviesGenres;
});