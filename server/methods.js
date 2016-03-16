Meteor.methods({
    insertPlayers: function (players) {
        var added = 0, _player;
       
        if (_.isEmpty(players)) {
            throw new Meteor.Error(409, "Invalid data.");
        }

        _.each(players, function (player) {
            _player = {
                name: player,
                active: false,
                gameCount: 0,
                activated_at: null 
            };
            added += !!Players.insert(_player);
        });
        
        return added;
    },
    activatePlayer: function (playerId) {
        var _player = Players.findOne(playerId);
        var now = new Date().getTime();
        if (!_player) {
            throw new Meteor.Error(404, "Unknown player.");
        }
        return Players.update({_id: playerId}, {$set: {active: true, activated_at: now }});
    },
    deactivatePlayer: function (playerId) {
        var _player = Players.findOne(playerId);
        var now = new Date().getTime();
        if (!_player) {
            throw new Meteor.Error(404, "Unknown player.");
        }
        return Players.update({_id: playerId}, {$set: {active: false, activated_at: null }});
    },
    removePlayer: function (playerId) {
        var _player = Players.findOne(playerId);
        if (!_player) {
            throw new Meteor.Error(404, "Unknown player.");
        }
        return Players.remove({_id: playerId});
    },
    insertGames: function (games) {
        var added = 0, _game;
        
        if (_.isEmpty(games)) {
            throw new Meteor.Error(409, "Invalid data.");
        }
        
        _.each(games, function (game) {
            _game = {
                name: game,
                active: true,
                matches: []
            };
            added += !!Games.insert(_game);
        });
        
        return added
    },
    activateGame: function (gameId) {
        var _game = Games.findOne(gameId);
        var now = new Date().getTime();
        if (!_game) {
            throw new Meteor.Error(404, "Unknown game.");
        }
        return Games.update({_id: gameId}, {$set: {active: true, activated_at: now }});
    },
    deactivateGame: function (gameId) {
        var _game = Games.findOne(gameId);
        var now = new Date().getTime();
        if (!_game) {
            throw new Meteor.Error(404, "Unknown game.");
        }
        return Games.update({_id: gameId}, {$set: {active: false, activated_at: null }});
    },
    removeGame: function (gameId) {
        var _game = Games.findOne(gameId);
        if (!_game) {
            throw new Meteor.Error(404, "Unknown game.");
        }
        return Games.remove({_id: gameId});
    },
})