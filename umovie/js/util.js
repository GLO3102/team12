define(['backbone', 'text!templates/WatchlistView.html'], function (Backbone, Template) {

    // validation user model
    var UserModel = Backbone.Model.extend({
        validate: function (attrs) {
            var email_filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var name_filter = /^([a-zA-Z])([a-zA-Z])+$/;
            var errors = [];

            if (attrs.name == '')
                errors.push({name: 'name', error: 'Please enter your  Name'});
            if (!name_filter.test(attrs.name))
                errors.push({name: 'name', error: 'Your name contains invalid characters.  names may only contain letters.'});
            if (!email_filter.test(attrs.email))
                errors.push({name: 'email', error: 'Please enter a valid email address'});
            if (attrs.password == '')
                errors.push({name: 'password', error: 'Please provide a password.'});
        }
    });

    // validation recherche
    var SearchModel = Backbone.Model.extend({
        validate: function (attrs) {
            if (attrs == '')
                errors.push('Please enter a word');
        }
    })

    app.song = app.WatchlistModel();

});
