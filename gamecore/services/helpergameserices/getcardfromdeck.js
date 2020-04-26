var getcard = function(){
    var select_first_card_group = function(data){
        var  min = Math.ceil(0);
        var max = Math.floor(data.shuffled_cards.length-1);
        var shuffled_cards = data.shuffled_cards;
        var  i = 0;
        var hold_value=[];
        var card_group=[];
        //var index= -1;
        // console.log(1,shuffled_cards.length);
        while(i<4){
            var index=Math.floor(Math.random()  * (max - min + 1)) + min;
            while(hold_value.includes(index)){
                index=Math.floor(Math.random()  * (max - min + 1)) + min;
            }
            card_group.push(shuffled_cards[index]);
            hold_value.push(index);
            i=i+1;
        };
        // hold_value.forEach(i=>{
        //     shuffled_cards.splice(i,1);
        // });
        var updatedcards = shuffled_cards.filter(function (value, index, arr){
            return !hold_value.includes(index);
         });
        //console.log(2,shuffled_cards.length)
        return {
            dealer_cards:[card_group[0],card_group[1]],
            player_cards:[card_group[2],card_group[3]],
            updated_deck:updatedcards
        }
    };
    var get_one_card_deck = function(data){
        var deck_card = data.deck_card;
        var  min = Math.ceil(0);
        var max = Math.floor(deck_card.length-1);
        var card_index = Math.floor(Math.random()  * (max - min + 1)) + min;
        var select_card = deck_card[card_index];
        deck_card.splice(card_index,1);
        return {
            select_card:select_card,
            updated_deck:deck_card
        }
    };
    return {
        select_first_card_group:function(data){
            return select_first_card_group(data);
        },
        get_one_card_deck:function(data){
            return get_one_card_deck(data);
        }
    }
}();

module.exports = getcard;