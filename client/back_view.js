/*****************************************************************************/
/* backView: Event Handlers and Helpers .js*/
/*****************************************************************************/
Template.backView.events({
    'click .add-player': function (e) {
      $("#addPlayerModal").modal("show");
    },
    'click .add-game': function (e) {
      $("#addGameModal").modal("show");
    },
    'click .activate-player': function (e) {
      Meteor.call("activatePlayer", this._id, function (err, result) {
        if (err) { console.log(err); }
      });
    },
    'click .deactivate-player': function (e) {
      Meteor.call("deactivatePlayer", this._id, function (err, result) {
        if (err) { console.log(err); }
      });
    },
    'click .remove-player': function (e) {
      Meteor.call("removePlayer", this._id, function (err, result) {
        if (err) { console.log(err); }
      })
    },
    'submit #newPlayer': function (e) {
      e.preventDefault();
      var playersCSV = s($("textarea[name=players]").val()).trim().value()
        , _players;
      
      if (!playersCSV) {
        return false;
      }
      
      _players = playersCSV.split(",").map(function (player) {
        return s(player).trim().value();
      });

      Meteor.call("insertPlayers", _players, function (err, result) {
        if (!err) {
          $("#addPlayerModal").modal("hide");
        } else {
          console.log(err);
        }
      });
    },
    'click .activate-game': function (e) {
      Meteor.call("activateGame", this._id, function (err, result) {
        if (err) { console.log(err); }
      });
    },
    'click .deactivate-game': function (e) {
      Meteor.call("deactivateGame", this._id, function (err, result) {
        if (err) { console.log(err); }
      });
    },
    'click .remove-game': function (e) {
      Meteor.call("removeGame", this._id, function (err, result) {
        if (err) { console.log(err); }
      })
    },
    'submit #newGame': function (e) {
      e.preventDefault();
      var gamesCSV = s($("textarea[name=games]").val()).trim().value()
        , _games;

      if (!gamesCSV) {
        return false;
      }

      _games = gamesCSV.split(",").map(function (game) {
        return s(game).trim().value();
      });

      Meteor.call("insertGames", _games, function (err, result) {
        if (!err) {
          $("#addGameModal").modal("hide");
        } else {
          console.log(err);
        }
      });
    }
});

Template.backView.helpers({
  players: function () {
    return Players.find({}, {sort: {name: 1, activated_at: -1}});
  },
  games: function () {
    return Games.find({}, {sort: {name: 1}});
  }
});

/*****************************************************************************/
/* backView: Lifecycle Hooks */
/*****************************************************************************/
Template.backView.created = function () {
  this.subscribe("players", {});
  this.subscribe("games");
};

Template.backView.rendered = function () {
  $("#addGameModal").on("shown.bs.modal", function (e) {
    $("textarea").focus();
  });
  $("#addPlayerModal").on("shown.bs.modal", function (e) {
    $("textarea").focus();
  });
};

Template.backView.destroyed = function () {};