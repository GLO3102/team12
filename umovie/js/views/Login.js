define(['backbone','text!templates/LoginView.html', 'jquery.cookie'], function (Backbone, LoginTemplate) {
    var LoginView = Backbone.View.extend({
        template: _.template(LoginTemplate),
        el: '#modalContainer',
        events: {
            "click #submitLogin" : "login",
            "click #register" : "signup"
        },
        login: function() {
            $("#errorText").hide();
            var date = new Date();
            var minutes = 60;
            date.setTime(date.getTime() + (minutes * 60 * 1000));

            var email = ($("#loginEmail").val());
            var password = ($("#loginPassword").val());

            $.ajax({
                type: "POST",
                url: "login",
                contentType: "application/x-www-form-urlencoded",
                data: {email : email, password : password},
                success: function(data) {
                    $.ajaxSetup({
                        headers: { "Authorization": data["token"] }
                    });
                    $.cookie("token", data["token"], { expires: date });
                    $("#login-modal").hide();
                    $('.modal-backdrop').remove();
                    $('body').removeClass('modal-open');
                    Backbone.history.navigate('', {trigger: true});
                },
                error: function (XMLHttpRequest) {
                    var errorText = $("#errorText");
                    if (XMLHttpRequest.status == 401 || XMLHttpRequest.status == 403) {
                        errorText.text("Bad username/password combination");
                        errorText.show();
                    }
                }
            });
        },
        signup: function() {
            $("#login-modal").hide();
            Backbone.history.navigate('signup', {trigger: true});
        },
        render: function () {
            console.log("LoginView: rendering template...");
            this.$el.html(this.template());
            console.log("LoginView: done");
            //$("#login-modal").modal('show'); //parfois erreur ici si le template a pas fini de render
        }
    });

    return LoginView;
});