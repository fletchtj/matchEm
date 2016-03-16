Meteor.startup(function () {
    if (!Meteor.users.find().count()) {
        Accounts.createUser({username: "mastercontrol", password: "mcHammer2015"});
    }
});