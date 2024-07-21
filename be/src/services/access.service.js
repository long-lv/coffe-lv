'use strict'

const accountModel = require("../models/account.model")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const KeyTokenService = require("./keyToken.service")
const { createTokenPair } = require("../auth/authUtils")
const RoleAccount = {
    ADMIN : "00110",
    EDITOR : "00113",
    SUB_ADMIN : "00115"
}
class AccessService {

    static signUp = async ({name,email,password,roles,status,verify}) =>{
        try{
            // step : check email exists?? 
            const hoderAccount = await accountModel.findOne({email}).lean()
            // shop đã tồn tại -> thông báo
            if(hoderAccount) {
                return {
                    code : "403",
                    message : "Account alredy registered!"
                }
            }

            const passwordHard = await bcrypt.hash(password,10);
            const newAccount = await accountModel.create({
                name,email,password,status,verify,roles : [RoleAccount.ADMIN]
            })
            
            // shop được tạo thành công
            if(newAccount){
                // create privateKey, publicKey
                const { privateKey,publicKey } = crypto.generateKeyPairSync('rsa',{
                    modulusLength : 4096
                })

                console.log({privateKey,publicKey}) 

                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId : newAccount._id,
                    publicKey
                })

                if(!publicKeyString){
                    return{
                        code : "500",
                        message : "public key string error"
                    }
                }

                // created token pair
                const tokens = await createTokenPair({userId : newAccount._id,email},publicKey,privateKey)
                console.log(`Creatd token success:: ` , tokens)
                return {
                    code : "201",
                    medataData : {
                        account : newAccount,
                        tokens
                    }
                }
            }
            return {
                code : "200",
                medataData : null
            }
        }catch(err){
            return {
                code : '400',
                message : err.message,
                status : 'error'
            }
        }
    }
}

module.exports = AccessService