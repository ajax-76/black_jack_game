// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
const uuidv1 = require('uuid').v1;


var user =function(){
    var user_data ={};
    var generate_shuffled_card_deck = function(){
        var cards = [
            {suit:'spades',name:"A",value:11},
            {suit:'spades',name:"2",value:2},
            {suit:'spades',name:"3",value:3},
            {suit:'spades',name:"4",value:4},
            {suit:'spades',name:"5",value:5},
            {suit:'spades',name:"6",value:6},
            {suit:'spades',name:"7",value:7},
            {suit:'spades',name:"8",value:8},
            {suit:'spades',name:"9",value:9},
            {suit:'spades',name:"10",value:10},
            {suit:'spades',name:"J",value:10},
            {suit:'spades',name:"Q",value:10},
            {suit:'spades',name:"K",value:10},
            {suit:'diamonds',name:"A",value:11},
            {suit:'diamonds',name:"2",value:2},
            {suit:'diamonds',name:"3",value:3},
            {suit:'diamonds',name:"4",value:4},
            {suit:'diamonds',name:"5",value:5},
            {suit:'diamonds',name:"6",value:6},
            {suit:'diamonds',name:"7",value:7},
            {suit:'diamonds',name:"8",value:8},
            {suit:'diamonds',name:"9",value:9},
            {suit:'diamonds',name:"10",value:10},
            {suit:'diamonds',name:"J",value:10},
            {suit:'diamonds',name:"Q",value:10},
            {suit:'diamonds',name:"K",value:10},
            {suit:'clubs',name:"A",value:11},
            {suit:'clubs',name:"2",value:2},
            {suit:'clubs',name:"3",value:3},
            {suit:'clubs',name:"4",value:4},
            {suit:'clubs',name:"5",value:5},
            {suit:'clubs',name:"6",value:6},
            {suit:'clubs',name:"7",value:7},
            {suit:'clubs',name:"8",value:8},
            {suit:'clubs',name:"9",value:9},
            {suit:'clubs',name:"10",value:10},
            {suit:'clubs',name:"J",value:10},
            {suit:'clubs',name:"Q",value:10},
            {suit:'clubs',name:"K",value:10},
            {suit:'hearts',name:"A",value:11},
            {suit:'hearts',name:"2",value:2},
            {suit:'hearts',name:"3",value:3},
            {suit:'hearts',name:"4",value:4},
            {suit:'hearts',name:"5",value:5},
            {suit:'hearts',name:"6",value:6},
            {suit:'hearts',name:"7",value:7},
            {suit:'hearts',name:"8",value:8},
            {suit:'hearts',name:"9",value:9},
            {suit:'hearts',name:"10",value:10},
            {suit:'hearts',name:"J",value:10},
            {suit:'hearts',name:"Q",value:10},
            {suit:'hearts',name:"K",value:10}
        ];
        var allcards = cards.concat(cards).concat(cards);
       //  var shuffled_deck  -- Fisher–Yates_shuffle#The_modern_algorithm
        for(var i=0; i<=allcards.length-1; i++){
            var j = Math.floor(Math.random()*(i+1));
            var temp = allcards[i];
            allcards[i]=allcards[j];
            allcards[j]=temp;
        }
        return allcards;
    };
    var get_object = function(){
       // console.log(user_data)
        if(user_data.moves.total_value_dealer==21){
            user_data.winnner='DEALER';
            user_data.iscomplete=true;
        }
        else if(user_data.moves.total_value_player==21){
            user_data.winnner='PLAYER';
            user_data.iscomplete=true;
        }
        else if(user_data.moves.total_value_dealer==21 && user_data.moves.total_value_player==21){
            user_data.winnner='TIE';
            user_data.iscomplete=true;
        }
        else if(user_data.moves.total_value_player>21){
            user_data.winnner='DEALER';
            user_data.iscomplete=true;
        }
        else if(user_data.moves.total_value_dealer>21){
            user_data.winnner='PLAYER';
            user_data.iscomplete=true;
        }
        else if(user_data.dealerstand==true){
            if(user_data.moves.total_value_player>user_data.moves.total_value_dealer){
                user_data.winnner='PLAYER';
                user_data.iscomplete=true;
            }
            else if(user_data.moves.total_value_player<user_data.moves.total_value_dealer){
                user_data.winnner='DEALER';
                user_data.iscomplete=true;
            }
            else if(user_data.moves.total_value_player==ser_data.moves.total_value_dealer){
                user_data.winnner='TIE';
                user_data.iscomplete=true;
            }
        }
        //user_data.trial=true;
        return user_data;
    }
    var create_edit_object = function(data){
        try {
            user_data = {
               _id:data._id,
               username:  data.username,
               timestamp:new Date(),
               iscomplete:data.iscomplete,
               shuffled_deck:data.shuffled_deck.map(m=>{
                   return {
                       name:m.name,
                       suit:m.suit,
                       value:m.value,
                       //alternate_value:m.name=='ACE'?m.ace_value:m.value
                   }
               }),
               current_deck:data.current_deck,
               moves:{
                       dealer:data.move_dealer.map(m=>{
                           return {name:m.name,value:m.value,suit:m.suit}
                       }),
                       player:data.move_player.map(m=>{
                           return {name:m.name,value:m.value,suit:m.suit}
                       }),
                       total_value_dealer:data.move_dealer.reduce((acc,obj)=>{
                           if(acc+obj.value>21 && obj.name=='A')
                           obj.value=1
                           return acc +obj.value
                         },0),
                       total_value_player:data.move_player.reduce((acc,obj)=>{
                           if(acc+obj.value>21 && obj.name=='A')
                           obj.value=1
                           return acc +obj.value
                         },0)
                   },
               winnner:data.winner,
               playerstand:data.playerstand,
               dealerstand:data.dealerstand        
           }
          // return user_data;
       }
       catch(err){
           //console.log(323,err);
           throw err;
       }
    };
    var create_object = function(data){
        try {
             user_data = {
                _id:uuidv1(),
                username:  data.username,
                timestamp:new Date(),
                iscomplete:data.iscomplete,
                shuffled_deck:data.shuffled_deck.map(m=>{
                    return {
                        name:m.name,
                        suit:m.suit,
                        value:m.value,
                        //alternate_value:m.name=='ACE'?m.ace_value:m.value
                    }
                }),
                current_deck:data.current_deck,
                moves:{
                        dealer:data.move_dealer.map(m=>{
                            return {name:m.name,value:m.value,suit:m.suit}
                        }),
                        player:data.move_player.map(m=>{
                            return {name:m.name,value:m.value,suit:m.suit}
                        }),
                        total_value_dealer:data.move_dealer.reduce((acc,obj)=>{
                            if(acc+obj.value>21 && obj.name=='A')
                            obj.value=1
                            return acc +obj.value
                          },0),
                        total_value_player:data.move_player.reduce((acc,obj)=>{
                            if(acc+obj.value>21 && obj.name=='A')
                            obj.value=1
                            return acc +obj.value
                          },0)
                    },
                winnner:data.winner,
                playerstand:data.playerstand,
                dealerstand:data.dealerstand      
            }
           // return user_data;
        }
        catch(err){
            //console.log(323,err);
            throw err;
        }
    }
    return {
        create_object:function(data){
            return create_object(data);
        },
        create_edit_object:function(data){
            return create_edit_object(data);
        },
        get_object:function(){
            return get_object();
        },
        generate_shuffled_card_deck:function(){
            return generate_shuffled_card_deck();
        },
        get_table_name(){
            return "USERS"
        }
    }
};

module.exports = user;