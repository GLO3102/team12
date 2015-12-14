define(['backbone'], function (Backbone) {


    var TvshowGenres = Backbone.Collection.extend({
        model: Backbone.Model.extend({}),
        parse: function (response) {
            return response;
        }
    });

    return TvshowGenres;
});