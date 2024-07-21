'use strict'

const AccessService = require("../services/access.service")


class AccessController {

    singUp = async (req,res,next) =>{
        try{
            console.log(`[P]:: singup:: `,req.body)
            return res.status(201).json(await AccessService.signUp(req.body))
        }catch(err){
            next(err)
        }
    }

}

module.exports = new AccessController();