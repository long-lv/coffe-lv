'use strict'
const JWT = require("jsonwebtoken")
const  asyncHandler = require("../helpers/asyncHandler")
const { AuthFailureError, NotFoundError } = require("../core/error.response")
const { findByUserIdKeyToken } = require("../services/keyToken.service")
const HEADER = {
    API_KEY : 'x-api-key',
    CLIENT_ID : 'x-client-id',
    AUTHORIZATION : 'authorization'
}

class AuthUtils {
    static createTokenPair = async (payload, publicKey, privateKey) =>{
        try{
            // accessToken
            const accessToken = await JWT.sign(payload, publicKey,{
                expiresIn : "2 days"
            })
    
            const refreshToken = await JWT.sign(payload, privateKey,{
                expiresIn : "7 days"
            })
    
            JWT.verify(accessToken,publicKey, (err,decode) =>{
                if(err){
                    console.log(`err verify :: ` , err)
                }else{
                    console.log(`decode verify::`,decode)
                }
            })
            
            return { accessToken, refreshToken }
        }catch(err){
            throw err;
        }
    }
    

// Xác thực (Authentication) với AuthUtils
// Phương thức authentication
// Kiểm tra userId và accessToken trong header yêu cầu.
// Xác thực accessToken bằng publicKey từ keyStore.
// Nếu hợp lệ, lưu keyStore vào req và chuyển tiếp đến middleware tiếp theo.
    static authentication = asyncHandler(async (req, res, next) => {
        /* 
            1 - check user id missing ? 
            2 - get accessToken 
            3 - verify token
            4 - check ,''user in db
            5 - check keyStore with userId
            6 - Ok all -> reurn next
        */
        const userId = req.headers[HEADER.CLIENT_ID]
        if (!userId) {
            throw new AuthFailureError('Invalid Request User Id');
        }
    
        // 2
        const keyStore = await findByUserIdKeyToken(userId);
        if (!keyStore) throw new NotFoundError('Not found key store');
    
        // 3 
        const accessToken = req.headers[HEADER.AUTHORIZATION];
        if (!accessToken){
            throw new AuthFailureError("Invalid Request Access Token");
        }
    
        try {
            const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
            if (userId != decodeUser.userId) {
                throw new AuthFailureError("Invalid User");
            }
            req.keyStore = keyStore;
            return next();
        } catch (err) {
            throw err;
        }
    }) 
}

module.exports = AuthUtils;