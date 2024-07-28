'use strict'

const httpStatusCode = require("../utils/httpStatusCode")

const { StatusCodes, ReasonPhrases } = httpStatusCode
class SuccsessResponse {
    constructor({ message, statusCode = StatusCodes.OK, reasonStatusCode = ReasonPhrases.OK, metadata = {}}) {
        this.message = !message ? reasonStatusCode : message;
        this.status = statusCode;
        this.metadata = metadata;
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this);
    }
}


class Ok extends SuccsessResponse {
    constructor({ message, metadata }){
        super({ message, metadata });
    }
}

class Created extends SuccsessResponse {
    constructor({ message, statusCode = StatusCodes.CREATED, reasonStatusCode = ReasonPhrases.CREATED, metadata }) {
        super({ message, statusCode, reasonStatusCode, metadata });
    }
}


module.exports = {
    SuccsessResponse,
    Ok,
    Created
}