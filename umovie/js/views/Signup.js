define(['backbone', 'text!templates/SignupView.html', 'jquery.cookie'], function (Backbone, SignupTemplate) {
    var SignupView = Backbone.View.extend({
        template: _.template(SignupTemplate),
        el: '#modalContainer',
        events: {
            "click #submitRegister": "register",
            "click #cancel": "cancel"
        },
        register: function () {
            var name = ($("#registerName").val());
            var email = ($("#registerEmail").val());
            var password = ($("#registerPassword").val());
            $.ajax({
                type: "POST",
                url: "signup",
                contentType: "application/x-www-form-urlencoded",
                data: {name: name, email: email, password: password}
            }).done(function (data) {
                $("#register-modal").hide();
                $('.modal-backdrop').remove();
                Backbone.history.navigate('', {trigger: true});
            }).fail(function (XMLHttpRequest) {
                console.log("Something went wrong while creating a new account.");
            })
        },
        cancel: function () {
            $("#register-modal").hide();
            Backbone.history.navigate('login', {trigger: true});
        },
        render: function () {
            console.log("RegisterView: rendering template...");
            this.$el.html(this.template());
            console.log("RegisterView: done");
        }
    });

    return SignupView;
});