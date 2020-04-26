var express = require('express');
var router = express.Router();
var game_interface = require('../interfaces/blackjackgme_interface');

router.post('/start_new_game',(req,res)=>{
    var username = req.body.username;

    if(username==undefined || username =="")
    return res.status(400).json({data:null,message:'username required',error:true});

    try{
        game_interface.start_new_game({
            username:username,
            db:req.db
        }).then(out=>{
           
            return res.json({data:out,message:'data successfully synced with returned results',error:false});
        }).catch(err=>{
            console.log(err)
            return res.status(500).json({data:err,message:'some error occured',error:true});
        });
    }
    catch(err){
        console.log(err)
        return res.status(500).json({data:err,message:'some error occured',error:true});
    }

});

router.post('/player_hit',async (req,res)=>{
    var username = req.body.username;

    if(username==undefined || username =="")
    return res.status(400).json({data:null,message:'username required',error:true});

    var sessionid=req.body.sessionid
    if(sessionid ==undefined || sessionid =="")
    return res.status(400).json({data:null,message:'session id required',error:true});

    try {
       // const value = await schema.validateAsync(data);
        // everything pareq.dbsses  -- 
        
        //check validatio
        game_interface.check_validation_player_hit({
            db:req.db,
            username:username,
            sessionid:sessionid
        }).then(val=>{
            // check username 
            console.log(val)
            if(val.usernamecheck.status==false)
            return res.status(400).json({data:null,message:val.usernamecheck.message,error:true});
            else if(val.useriscompletesessioncheck.status==true)
            return res.status(400).json({data:null,message:val.useriscompletesessioncheck.message,error:true});
            else if(val.usersessioncheck.status==false)
            return res.status(400).json({data:null,message:val.usersessioncheck.message,error:true});
            else if(val.usercheckisinstand.status==true)
            return res.status(400).json({data:null,message:val.usercheckisinstand.message,error:true});
            else{
                game_interface.hit_player({
                    username:username,
                    sessionid:sessionid,
                    db:req.db
                }).then(out=>{
                 return res.json({data:out,message:'data successfully synced with returned results',error:false});
                }).catch(err=>{
                    console.log(err)
                    return res.status(500).json({data:err,message:'some error occured',error:true});
                });
            }
        }).catch(err=>{
            return res.status(500).json({data:err,message:'some error occured',error:true});
        });
    }
    catch (err) { 
        console.log(err);
        return res.status(400).json({data:err._original,error:err.details,message:'error occured'});
    }
    
});

router.post('/player_stand',(req,res)=>{
    var username = req.body.username;

    if(username==undefined || username =="")
    return res.status(400).json({data:null,message:'username required',error:true});

    var sessionid=req.body.sessionid
    if(sessionid ==undefined || sessionid =="")
    return res.status(400).json({data:null,message:'session id required',error:true});

    try {
        // const value = await schema.validateAsync(data);
         // everything pareq.dbsses  -- 
         
         //check validatio
         game_interface.check_validation_player_stand({
             db:req.db,
             username:username,
             sessionid:sessionid
         }).then(val=>{
             // check username 
             if(val.usernamecheck.status==false)
             return res.status(400).json({data:null,message:val.usernamecheck.message,error:true});
             else if(val.useriscompletesessioncheck.status==true)
             return res.status(400).json({data:null,message:val.useriscompletesessioncheck.message,error:true});
             else if(val.usersessioncheck.status==false)
             return res.status(400).json({data:null,message:val.usersessioncheck.message,error:true});
             else{
                 game_interface.stand_player({
                     username:username,
                     sessionid:sessionid,
                     db:req.db
                 }).then(out=>{
                  return res.json({data:out,message:'data successfully synced with returned results',error:false});
                 }).catch(err=>{
                     console.log(err)
                     return res.status(500).json({data:err,message:'some error occured',error:true});
                 });
             }
         }).catch(err=>{
             return res.status(500).json({data:err,message:'some error occured',error:true});
         });
     }
     catch (err) { 
         console.log(err);
         return res.status(500).json({data:err,message:'some error occured',error:true});
        }

});

router.post('/dealer_hit',async (req,res)=>{
    var username = req.body.username;

    if(username==undefined || username =="")
    return res.status(400).json({data:null,message:'username required',error:true});

    var sessionid=req.body.sessionid
    if(sessionid ==undefined || sessionid =="")
    return res.status(400).json({data:null,message:'session id required',error:true});

    try {
       // const value = await schema.validateAsync(data);
        // everything pareq.dbsses  -- 
        
        //check validatio
        game_interface.check_validation_dealer_hit({
            db:req.db,
            username:username,
            sessionid:sessionid
        }).then(val=>{
            // check username 
            if(val.usernamecheck.status==false)
            return res.status(400).json({data:null,message:val.usernamecheck.message,error:true});
            else if(val.useriscompletesessioncheck.status==true)
            return res.status(400).json({data:null,message:val.useriscompletesessioncheck.message,error:true});
            else if(val.usersessioncheck.status==false)
            return res.status(400).json({data:null,message:val.usersessioncheck.message,error:true});
            else if(val.usercheckisinstand.status==false)
            return res.status(400).json({data:null,message:val.usercheckisinstand.message,error:true});
            else{
                game_interface.hit_dealer({
                    username:username,
                    sessionid:sessionid,
                    db:req.db
                }).then(out=>{
                 return res.json({data:out,message:'data successfully synced with returned results',error:false});
                }).catch(err=>{
                    console.log(err)
                    return res.status(500).json({data:err,message:'some error occured',error:true});
                });
            }
        }).catch(err=>{
            return res.status(500).json({data:err,message:'some error occured',error:true});
        });
    }
    catch (err) { 
        console.log(err);
        return res.status(500).json({data:err._original,error:err.details,message:'error occured'});
    }
    
});

router.post('/dealer_stand',(req,res)=>{
    var username = req.body.username;

    if(username==undefined || username =="")
    return res.status(400).json({data:null,message:'username required',error:true});

    var sessionid=req.body.sessionid
    if(sessionid ==undefined || sessionid =="")
    return res.status(400).json({data:null,message:'session id required',error:true});

    try {
       // const value = await schema.validateAsync(data);
        // everything pareq.dbsses  -- 
        
        //check validatio
        game_interface.check_validation_dealer_stand({
            db:req.db,
            username:username,
            sessionid:sessionid
        }).then(val=>{
            // check username 
            if(val.usernamecheck.status==false)
            return res.status(400).json({data:null,message:val.usernamecheck.message,error:true});
            else if(val.useriscompletesessioncheck.status==true)
            return res.status(400).json({data:null,message:val.useriscompletesessioncheck.message,error:true});
            else if(val.usersessioncheck.status==false)
            return res.status(400).json({data:null,message:val.usersessioncheck.message,error:true});
            else if(val.usercheckisinstand.status==false)
            return res.status(400).json({data:null,message:val.usercheckisinstand.message,error:true});
            else{
                game_interface.stand_dealer({
                    username:username,
                    sessionid:sessionid,
                    db:req.db
                }).then(out=>{
                 return res.json({data:out,message:'data successfully synced with returned results',error:false});
                }).catch(err=>{
                    console.log(err)
                    return res.status(500).json({data:err,message:'some error occured',error:true});
                });
            }
        }).catch(err=>{
            return res.status(500).json({data:err,message:'some error occured',error:true});
        });
    }
    catch (err) { 
        console.log(err);
        return res.status(500).json({data:err._original,error:err.details,message:'error occured'});
    }
});

router.post('/get_user_history',(req,res)=>{
    var username = req.body.username;

    if(username==undefined || username =="")
    return res.status(400).json({data:null,message:'username required',error:true});

    try{
        game_interface.gethistory({
            db:req.db,
            username:username
        }).then(out=>{
            return res.json({data:out,message:'historical result',error:false});

        }).catch(err=>{
            console.log(err)
            return res.status(500).json({data:err,message:'some error occured',error:true});

        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({data:err._original,error:err.details,message:'error occured'});

    }
});


module.exports = router;