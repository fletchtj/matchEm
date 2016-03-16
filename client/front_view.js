var __intervals = [];

function getNewGame () {
    var players = _.pluck(Players.find({active: true}).fetch(), "name");
    var games = _.pluck(Games.find().fetch(), "name");

    var player1Choices = players.slice();
    var player1Name = players.splice(_.random(player1Choices.length-1), 1)[0];
    var player2Name = players[_.random(players.length-1)];

    // clear out old values
    clearGame();

    // all start at the same time...stagger finish
    cycleChoices(games, "#gameName", 2 * 1000, function () {
        document.getElementById("dingEffect").play();
        $("#gameName").text(games[_.random(games.length-1)]).addClass("highlight");
        Meteor.setTimeout(function () {
            $("#gameName").removeClass("highlight");
        }, 600);
    });
    cycleChoices(player1Choices, "#player1", 5 * 1000, function () {
        document.getElementById("dingEffect").play();
        $("#player1").text(player1Name).parent().addClass("highlight");
        Meteor.setTimeout(function () {
            $("#player1").parent().removeClass("highlight");
        }, 600);
    });
    cycleChoices(players, "#player2", 8 *1000, function () {
        document.getElementById("dingEffect").play();
        $("#player2").text(player2Name).parent().addClass("highlight");
        Meteor.setTimeout(function () {
            $("#player2").parent().removeClass("highlight");
        }, 600);
    });
}

function clearGame () {
    // clear out the UI
    $("#gameName, #player1, #player2").text("");

    // stop any running intervals
    _.each(__intervals, function (_interval) {
        Meteor.clearInterval(_interval);
    });
    __intervals = [];
}

function cycleChoices(choices, el, dur, callback) {
    var _duration = dur || 1500
        , _started = new Date().getTime()
        , _cycleInterval;
    
    _cycleInterval = Meteor.setInterval(function () {
        if (new Date().getTime() >= _started + _duration) {
            Meteor.clearInterval(_cycleInterval);
            callback && callback.call();
        } else {
            $(el).text(choices[_.random(choices.length-1)]);    
        }
    }, 50);

    __intervals.push(_cycleInterval);
}

/*****************************************************************************/
/* frontView: Event Handlers and Helpers .js*/
/*****************************************************************************/
Template.frontView.events({
    'click .new-game': function (e) {
        getNewGame();
    },
    'click .reset-game': function (e) {
        clearGame();
    }
});

Template.frontView.helpers({});

/*****************************************************************************/
/* frontView: Lifecycle Hooks */
/*****************************************************************************/
Template.frontView.created = function () {
    this.subscribe("players", {active: true});
    this.subscribe("games", {active: true});
};

Template.frontView.rendered = function () {};

Template.frontView.destroyed = function () {
    clearGame();
};