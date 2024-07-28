'use strict';

const accountModel = require("../models/account.model");

class AccountService {
    // select => quyết định trường nào sẽ được trả về
    // 1 hoặc true: Bao gồm trường trong kết quả truy vấn.
    // 0 hoặc false: Loại trừ trường khỏi kết quả truy vấn.
    static findByEmailAccount = async ({ email, select = {
        email: 1, password: 1, name: 1, status: 1, roles: 1
    }}) =>{
        return await accountModel.findOne({ email }).select(select).lean();
    }
}

module.exports = AccountService;