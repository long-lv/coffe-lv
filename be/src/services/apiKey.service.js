'use strict';

const apiKeyModel = require("../models/apiKey.model");

class ApiKeyService {
    static findByIdApiKey = async ( key ) =>{
        const objKey = await apiKeyModel.findOne({ key, status: true}).lean();
        return objKey;
    }
}


module.exports = ApiKeyService;