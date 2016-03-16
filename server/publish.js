Meteor.publish("players", function (options) {
    var _selector = options && _.pick(options, "active") || {};
    return Players.find(_selector);
});

Meteor.publish("games", function (options) {
    var _selector = options && _.pick(options, "active") || {};
    return Games.find(_selector);
});