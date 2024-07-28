'use strict';

const ApiKeyService = require("../services/apiKey.service");


const HEADER = {
    API_KEY : 'x-api-key',
    AUTHORIZATION : 'authorization'
}

const checkApiKey = async ( req,res,next ) =>{
    try{
        const key = req.headers[HEADER.API_KEY]?.toString(); 
        if(!key){
            return res.status(403).json({
                message : "Fobidden Error"
            })
        }
        // check object key
        const objKey = await ApiKeyService.findByIdApiKey(key);
        if(!objKey){
            return res.status(403).json({
                message : "Fobbiden Error"
            })
        }
        req.objKey = objKey;
        return next();
    }catch(error) {
        console.log(error);
    }
}

const checkPermission = ( permission ) => {
    return (req,res,next) => {
        if(!req.objKey.permissions) {
            return res.status(403).json({
                message : "Permission dinied"
            })
        }    
        
        console.log(req.objKey.permissions);
        const validPermission = req.objKey.permissions.includes(permission);
        if (!validPermission) {
            return res.status(403).json({
                message : "Permission dinied"
            }) 
        }
        return next();
    }
}

module.exports = {
    checkApiKey,
    checkPermission,
}