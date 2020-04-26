const user_model = require('../../models/user')();
const errormodel =require('../../models/errormodel');
var cardgenerator = require('../helpergameserices/getcardfromdeck');
var connection = require('../../../connection/connection');
var startgameserice = function(){
    var createnewgame = async function(data){
        var dbo = data.db.db(connection.MONGO_DATABASE);
        try{
                var user_tabel = user_model.get_table_name();
                let userdb=dbo.collection(user_tabel);
                var shuffled_deck = user_model.generate_shuffled_card_deck();
                var temp_array = [];
                const new_card_shuffle = Object.assign(temp_array, shuffled_deck);
                var data_card_generator = cardgenerator.select_first_card_group({
                    shuffled_cards:shuffled_deck
                });
                
                user_model.create_object({
                    username:data.username,
                    iscomplete:false,
                    shuffled_deck:new_card_shuffle,
                    move_dealer:data_card_generator.dealer_cards,
                    move_player:data_card_generator.player_cards,
                    current_deck:data_card_generator.updated_deck,
                    winner:null,
                    playerstand:false,
                    dealerstand:false
                });
                var user_object = user_model.get_object();
                
                let usergame_data = await new Promise(function(resolve,reject){
                    userdb.insertOne(user_object).then(out=>{
                       // console.log('success');
                        resolve({
                            current_deck:user_object.current_deck,
                            dealer_cards:user_object.moves.dealer,
                            player_cards:user_object.moves.player,
                            dealer_value:user_object.moves.total_value_dealer,
                            player_value:user_object.moves.total_value_player,
                            winner:user_object.winnner,
                            iscomplete:user_object.iscomplete,
                            sessionid:out.ops[0]._id,
                            username:out.ops[0].username,
                            playerstand:user_object.playerstand,
                            dealerstand:user_object.dealerstand
                            //out:out
                        });
                    }).catch(err=>{
                        error= errormodel.createrrormodel({
                            context:"Game_context",
                            userid:data.username,
                            errorpath:"BlackJAck",
                            name: err.name,
                            message: err.message,
                            ok: err.ok,
                            errmsg: err.errmsg,
                            code: err.code,
                            codeName: err.codeName
                        });
                        dbo.collection("errorlogs").insert(error).then(()=>{
                           // resolve(500)
                        }).catch(err=>{
                            reject(err)
                        });
                        reject(err);
                    });
                });
                        
          return usergame_data;
        }
        catch(err){
           // console.log(323,err);
            error= errormodel.createrrormodel({
                context:"Game_context",
                userid:data.username,
                errorpath:"BlackJAck",
                name: err.name,
                message: err.message,
                ok: err.ok,
                errmsg: err.errmsg,
                code: err.code,
                codeName: err.codeName
            });
            dbo.collection("errorlogs").insert(error).then(()=>{
                //resolve(500)
            }).catch(err=>{
                throw err;
            });
            throw err;
        }
    };
    return {
        createnewgame:function(data){
            return createnewgame(data);
        }
    }
}();

module.exports = startgameserice;