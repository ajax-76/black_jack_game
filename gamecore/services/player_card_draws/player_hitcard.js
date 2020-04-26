const user_model = require('../../models/user')();
const errormodel =require('../../models/errormodel');
var cardgenerator = require('../helpergameserices/getcardfromdeck');
var hitgameserice = function(){
    var hitcard_player = async function(data){
        var dbo = data.db.db(process.env.MONGO_DATABASE);
        //var card_index = data.card_index;
        var sessionid= data.sessionid;
        try{
                var user_tabel = user_model.get_table_name();
                let userdb=dbo.collection(user_tabel);
                var dbuserobject =await new Promise((resolve,reject)=>{
                    userdb.findOne({_id:sessionid,username:data.username}).then(out=>{
                        resolve(out);
                    }).catch(err=>{
                        reject(err);
                    })
                });


                // var temp_array = [];
                const deck_card = dbuserobject.current_deck;

                var data_card_generator = cardgenerator.get_one_card_deck({
                    deck_card:deck_card
                    //card_index:card_index
                });
                //console.log('card_generator',data_card_generator.updated_deck.length,new_card_shuffle.length)
                dbuserobject.current_deck=data_card_generator.updated_deck;
                var player_move = dbuserobject.moves.player;
                player_move.push(data_card_generator.select_card);

                user_model.create_edit_object({
                    _id:dbuserobject._id,
                    username:data.username,
                    iscomplete:false,
                    shuffled_deck:dbuserobject.shuffled_deck,
                    move_dealer:dbuserobject.moves.dealer,
                    move_player:player_move,
                    current_deck:data_card_generator.updated_deck,
                    winner:dbuserobject.winner,
                    playerstand:dbuserobject.playerstand,
                    dealerstand:dbuserobject.dealerstand
                });

                var user_object = user_model.get_object();
                
                let usergame_data = await new Promise(function(resolve,reject){
                    userdb.update({_id:user_object._id},{$set:user_object}).then(out=>{
                       
                        resolve({
                            current_deck:user_object.current_deck,
                            dealer_cards:user_object.moves.dealer,
                            player_cards:user_object.moves.player,
                            dealer_value:user_object.moves.total_value_dealer,
                            player_value:user_object.moves.total_value_player,
                            winner:user_object.winnner,
                            iscomplete:user_object.iscomplete,
                            sessionid:user_object._id,
                            username:user_object.username,
                            playerstand:user_object.playerstand,
                            dealerstand:user_object.dealerstand
                            //out:out
                        });
                    }).catch(err=>{
                        error= errormodel.createrrormodel({
                            context:"Game_context",
                            userid:data.username,
                            errorpath:"BlackJAck_hit_card",
                            name: err.name,
                            message: err.message,
                            ok: err.ok,
                            errmsg: err.errmsg,
                            code: err.code,
                            codeName: err.codeName
                        });
                        dbo.collection("errorlogs").insert(error).then(()=>{
                            resolve(500)
                        }).catch(err=>{
                            reject(err)
                        });
                    });
                });
                        
          return usergame_data;
        }
        catch(err){
           // console.log(323,err);
            error= errormodel.createrrormodel({
                context:"Game_context",
                userid:data.username,
                errorpath:"BlackJAck_hit_card",
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
    var check_username = function(userdb,username){
        return  new Promise((resolve,reject)=>{
            userdb.findOne({username:username}).then(out=>{
                if(out)
                resolve(true)
                else
                resolve(false)
            }).catch(err=>{
                reject(err);
            })
        })
    }
    var check_iscomplete_sessionid = function(userdb,username,sessionid){
        return  new Promise((resolve,reject)=>{
            userdb.findOne({username:username,_id:sessionid}).then(out=>{
                if(out){
                   resolve(out.iscomplete)
                }
                else
                resolve(false)

            }).catch(err=>{
                reject(err);
            })
        })
    }
    var check_sessionid = function(userdb,sessionid){
        return  new Promise((resolve,reject)=>{
            userdb.findOne({_id:sessionid}).then(out=>{
                console.log(sessionid);
                if(out){
                   resolve(true)
                }
                else
                resolve(false)

            }).catch(err=>{
                reject(err);
            })
        })
    }
    var check_player_isstand =function(userdb,username,sessionid){
        return new Promise((resolve,reject)=>{
            userdb.findOne({username:username,_id:sessionid}).then(out=>{
                if(out){
                   resolve(out.playerstand)
                }
                else
                resolve(false)

            }).catch(err=>{
                reject(err);
            })
        })
    }
    var check_validation =async function(data){
        var dbo = data.db.db(process.env.MONGO_DATABASE);
        var user_tabel = user_model.get_table_name();
        var username = data.username;
        let userdb=dbo.collection(user_tabel);
        var sessionid= data.sessionid;
        //var return_object={};
        try{
            var usernamecheck = await check_username(userdb,username);
            var usersessioncheck = await check_sessionid(userdb,sessionid);
            var useriscompletesessioncheck = await check_iscomplete_sessionid(userdb,username,sessionid);
            var usercheckisinstand = await check_player_isstand(userdb,username,sessionid);
            return {
                usernamecheck:{status:usernamecheck,message:usernamecheck==false?'user doesnt exit':'pass'},
                usersessioncheck:{status:usersessioncheck,message:usersessioncheck==false?'wrong session id':'pass'},
                useriscompletesessioncheck:{status:useriscompletesessioncheck,message:useriscompletesessioncheck==true?'session is already complete ':'pass'},
                usercheckisinstand:{status:usercheckisinstand,message:usercheckisinstand==true?'user cannot take a hit as it chose to stand ':'pass'}
            }
        }
        catch(err){
            throw err;
        }
        
    }
    return {
        hitcard_player:function(data){
            return hitcard_player(data);
        },
        check_validation:function(data){
            return check_validation(data);
        }
    }
}();

module.exports = hitgameserice;