'use strict'

const accountModel = require("../models/account.model")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const KeyTokenService = require("./keyToken.service")
const AccountService = require("./account.service");
const { BadRequestError, ConflictRequestError } = require("../core/error.response")
const { getInfoData } = require("../utils/utils")
const { createTokenPair } = require("../auth/authUtils")
const RoleAccount = {
    ADMIN : "00110",
    EDITOR : "00113",
    SUB_ADMIN : "00115"
}
class AccessService {

    /* 
        1- check email in db
        2- match pw
        3- create AT vs RT and save
        4- generate tokens
        5- get data return login
    */
    static login = async ( {email, password, refreshToken = null}) =>{
        // 1- check email 
        const foundAccount = await  AccountService.findByEmailAccount({email});
        if(foundAccount) {
            // 2- checkpass
            const matchPw = await bcrypt.compare(password, foundAccount.password); 
            if(!matchPw) {
               throw new AuthFailureError("Authentication Error"); 
            }
            // 3- generate TK
            const publicKey = crypto.randomBytes(64).toString('hex');
            const privateKey = crypto.randomBytes(64).toString('hex');
            const { _id: userId } = foundAccount;
            const tokens = await createTokenPair({ userId , email }, publicKey, privateKey)
            await KeyTokenService.createKeyToken({
                refreshToken : tokens.refreshToken,
                publicKey, privateKey, userId
            })

            return {
                account : getInfoData({fields : ['_id', 'name', 'email'], object : foundAccount}),
                tokens
            }
        } else {
            throw new BadRequestError("Account not registered!");
        }
    }

    // SignUp
    static signUp = async ({name,email,password,roles,status,verify}) =>{
        try{
            // step : check email exists?? 
            const hoderAccount = await accountModel.findOne({email}).lean()
            // shop đã tồn tại -> thông báo
            if(hoderAccount) {
                throw new ConflictRequestError();
            }
            const passwordHard = await bcrypt.hash(password,10);
            const newAccount = await accountModel.create({
                name, 
                email,
                password : passwordHard,
                status,
                verify, 
                roles : roles || [RoleAccount.ADMIN]
            });
            
            // shop được tạo thành công
            if(newAccount){
                // create privateKey, publicKey
                // 1 : sử dụng thuật toán phức tạp
                // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa',{
                //     modulusLength : 4096,
                //     publicKeyEncoding: {
                //         type : 'pkcs1',
                //         format : 'pem'
                //     },
                //     privateKeyEncoding: {
                //         type : 'pkcs1',
                //         format : 'pem'
                //     }
                // })

                // 2 : thuật toán đơn giản hơn 

                const publicKey = crypto.randomBytes(64).toString('hex');
                const privateKey = crypto.randomBytes(64).toString('hex');

                const keyStore = await KeyTokenService.createKeyToken({
                    userId : newAccount._id,
                    publicKey,
                    privateKey
                })

                if(!keyStore){
                    throw new BadRequestError();
                }
                
                // created token pair
                const tokens = await createTokenPair({ userId : newAccount._id, email }, publicKey, privateKey)
                return {
                    code : 201,
                    metadata : {
                        account : getInfoData({fields : ['_id', 'name', 'email'], object : newAccount}),
                        tokens
                    }
                }
            }
            //  nếu tạo account k thành công, trả về 200 nhưng k có metadata
            return {
                code : 200,
                metadata : null
            }
        } catch(err) {
            return {
                code : err?.status || 500,
                message : err?.message,
                status : 'Error'
            }
        }
    }

    // logout

    static logOut = async (keyStore) =>{
        // keyStore = authorization (headers) -> accesstoken. decode accesstoken sẽ ra _id và email.
        const delKey = await KeyTokenService.removeTokenService(keyStore._id);
        return delKey;
    }
}

module.exports = AccessService