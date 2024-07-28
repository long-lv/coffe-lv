'use strict'

const AccessService = require("../services/access.service");
const { Created, SuccsessResponse } = require("../core/success.response");
const { ConflictRequestError, BadRequestError } = require("../core/error.response");
const httpStatusCode = require("../utils/httpStatusCode")

const { StatusCodes, ReasonPhrases } = httpStatusCode

class AccessController {

    // login

    login = async ( req, res, next ) =>{
        new SuccsessResponse({
            metadata : await AccessService.login(req.body)
        }).send(res);
    }

    // signup
    singUp = async ( req,res,next ) => { 
        const result = await AccessService.signUp(req.body);
        console.log(result);
        if ( result.code === StatusCodes.CREATED ) {
            return new Created({
                message : "Regiserted OK!",
                metadata : result?.metadata
            }).send(res)
        } else if ( result.code === StatusCodes.CONFLICT ) {
            throw new ConflictRequestError("Error: Account already registered")
        } else {
            throw new BadRequestError(ReasonPhrases.BAD_REQUEST);
        }
    }

    // logout

    logOut = async (req, res, next) =>{
        new SuccsessResponse({
            message : "Logout succsess!",
            metadata : await AccessService.logOut(req.keyStore)
        }).send(res);
    }

}

module.exports = new AccessController();