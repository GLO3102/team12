define(['backbone', 'models/userModel', 'text!templates/UserView.html', 'jquery.cookie'], function (Backbone, userModel,Template) {

    var UserView = Backbone.View.extend({
        template: _.template(Template),
        el: ".page",
        events: {
            "click .btnAddFriend": "addFriend",
            "click .btn-remove": "removeFriend",
            "click .btn-GotoFriendPage": "goToFriendPage",
            "click .btn-danger": "deleteWatchlist",
            "click .remove": "removeMovie",
            "click .btn-success": "addWatchlist",
            "click .modify": "modifyWatchlist"

        },
        initialize: function (user, watchlists) {
            console.log("UserView initializing...");
            _.bindAll(this, 'render');
            this.user = user;
            this.watchlists = watchlists;
            this.user.on('change', this.render);
            //this.watchlists.on('change', this.render);

            var self = this;

            this.watchlists.bind('sync add remove update', function () {
                self.render();
            });

            this.render();

            console.log($.cookie('token'));

            var userPublicInfo = JSON.parse($.cookie("userPublicInfo"));
            var loggedUserId = userPublicInfo.id;
           // console.log(loggedUserId);

            this.showHideUserButtons();
        },
        render: function () {

            this.$el.html(this.template({
                mod: this.user.toJSON(),
                watchlists: this.watchlists.toJSON()
            }));
            this.showHideUserButtons();
        },
        addFriend: function (event) {

            //debugger;

            var userJson = this.user.toJSON();
            var userId = userJson.id;
            //console.log(userId);


                $.ajax({
                    type: "POST",
                    url: "follow",
                    contentType: "application/json",
                    data: {id: userId}
                }).done( function(data) {

                    }).fail(function (XMLHttpRequest) {
                        console.log("Something went wrong while adding a new friend.");
                    })



        },
        removeFriend: function (event) {

            var self=this;
            var friendId = event.target.id;
            //console.log(friendId);
            $.ajax({
                type: "DELETE",
                url: "follow/"+friendId,
                contentType: "application/json"
            }).done( function(data) {

                }).fail(function (XMLHttpRequest) {
                    console.log("Something went wrong while adding a new friend.");
                })

        },

        goToFriendPage: function(event){
            var friendId = event.target.id;
          // console.log("getting to friend page");
            Backbone.history.navigate('users/'+friendId, {trigger: true});
        },

        showHideUserButtons: function() {

            var pageUser= this.user.toJSON();
            var pageUserid= pageUser.id;


            if ($.cookie("userPublicInfo")) {
                var remote_auth_token = "";
                var userPublicInfo = JSON.parse($.cookie("userPublicInfo"));
                var loggedUserId = userPublicInfo.id;
               // console.log(loggedUserId);

            }

            //hide or show remove friend button if page is logged user page
            //remove buttons to modify wathclists if the page is not le logged user's page
            if (loggedUserId !== pageUserid){
               // console.log(true);

                this.$el.find('.btn-lg1').addClass('hidden');

                //button wacthlist
                /*
                this.$el.find('.btn-danger').addClass('hidden');
                this.$el.find('.btn-success').addClass('hidden');
                this.$el.find('.modify').addClass('hidden');
                this.$el.find('.remove').addClass('hidden');*/

            }
            else{

                this.$el.find('.btn-lg2').addClass('hidden');
                this.$el.find('.btnAddFriend').addClass('hidden');

            }


        }



    });

    return UserView;
});
/**
 * Created by user on 2015-12-08.
 */
