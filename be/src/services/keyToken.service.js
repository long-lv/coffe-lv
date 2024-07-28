'use stric'
const keytokenModel = require('../models/keytoken.model');
const { Types } = require("mongoose");
class KeyTokenService {

    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken}) =>{
        try{
            const filter = { user: userId }, update = {
                publicKey, privateKey, refreshTokenUsed: [], refreshToken
            }, options = { upsert: true, new: true };
            const token = await keytokenModel.findOneAndUpdate(filter, update, options)
            return token ? token.publicKey : null;
        }catch(err){
            return err
        }
    }

    static findByUserIdKeyToken = async (userId) =>{
        try{
           return await keytokenModel.findOne({ user : new Types.ObjectId(userId) }).lean()
        } catch (err) {
            throw err;
        }
    }

    static removeTokenService = async (id) =>{
        return await keytokenModel.deleteOne({
            _id:  new Types.ObjectId(id)
        })
    }
}

module.exports = KeyTokenService