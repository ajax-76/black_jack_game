
const user_model = require('../models/user')();
var history = function(){
    var gethistory=async function(data){
        var dbo = data.db.db(process.env.MONGO_DATABASE);
        var user_tabel = user_model.get_table_name();
        let userdb=dbo.collection(user_tabel);
        var dbuserobject =await new Promise((resolve,reject)=>{
            userdb.find({username:data.username}).toArray().then(out=>{
                resolve(out);
            }).catch(err=>{
                reject(err);
            })
        });
        return dbuserobject;
    }
    return {
        gethistory:function(data){
            return gethistory(data);
        }
    }
}();

module.exports= history;