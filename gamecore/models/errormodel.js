const uuidv1 = require('uuid/v1');


var errormodel =function(){
    return {
        createrrormodel:function(data){
            return {
                _id:uuidv1(),
                userid:data.id,
                context:data.context,
                errorpath:data.errorpath,
                name: data.name,
                message: data.message,
                ok: data.ok,
                errmsg: data.errmsg,
                code: data.code,
                codeName: data.codeName,
                timestamp:new Date()
            }
        },
    }
}();

module.exports=errormodel;


