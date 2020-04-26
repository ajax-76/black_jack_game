const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");
const game_service = require("../../../gamecore/interfaces/blackjackgme_interface");
//var connection = require('../../../connection/connection');
var MongoClient = require("mongodb").MongoClient;
describe("StartGameService", function() {
  describe("start", function() {
    it("should create a new game", async function() {
       var db = await MongoClient.connect('mongodb://localhost:27017/BLACKJACK_GAME_DB',{ useNewUrlParser: true, useUnifiedTopology: true})
       // console.log(db);
       const stubValue = {
        db: db,
        username: faker.name.findName()
      };
      const gameresponse = await game_service.start_new_game({
          db:stubValue.db,
          username:stubValue.username
      });
      expect(gameresponse.username).to.equal(stubValue.username);
     // var sessionid = gameresponse.sessionid;
      

    });
    
  });
});