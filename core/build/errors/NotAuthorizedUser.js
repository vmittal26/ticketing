"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizedUser = void 0;
const BaseError_1 = require("./BaseError");
class NotAuthorizedUser extends BaseError_1.BaseError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 401;
    }
}
exports.NotAuthorizedUser = NotAuthorizedUser;
