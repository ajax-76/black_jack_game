var game_interface = function(){
    return {
        start_new_game:function(data){
            return require('../services/start_game_draws/start_game').createnewgame(data);
        },
        hit_player:function(data){
            return require('../services/player_card_draws/player_hitcard').hitcard_player(data);
        },
        check_validation_player_hit:function(data){
            return require('../services/player_card_draws/player_hitcard').check_validation(data);
        },
        stand_player:function(data){
            return require('../services/player_card_draws/player_standcard').standcard_player(data);
        },
        check_validation_player_stand:function(data){
            return require('../services/player_card_draws/player_standcard').check_validation(data);
        },
        hit_dealer:function(data){
            return require('../services/dealer_card_draws/dealer_hitcard').dealercard_player(data);
        },
        check_validation_dealer_hit:function(data){
            return require('../services/dealer_card_draws/dealer_hitcard').check_validation(data);
        },
        stand_dealer:function(data){
            return require('../services/dealer_card_draws/dealer_standcard').standcard_dealer(data);
        },
        check_validation_dealer_stand:function(data){
            return require('../services/dealer_card_draws/dealer_standcard').check_validation(data);
        },
        gethistory:function(data){
            return require('../services/history').gethistory(data);
        }
    }
}();

module.exports = game_interface;