"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const BaseError_1 = require("./BaseError");
class RequestValidationError extends BaseError_1.BaseError {
    constructor(message, errors) {
        super(message);
        this.errors = errors;
        this.statusCode = 400;
    }
    getSerializedErrors() {
        return this.errors.map(error => {
            return { message: error.msg, field: error.path };
        });
    }
}
exports.RequestValidationError = RequestValidationError;
