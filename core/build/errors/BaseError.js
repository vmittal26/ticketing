"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError extends Error {
    constructor(message) {
        super(message);
    }
    getSerializedErrors() {
        return [{ message: this.message }];
    }
}
exports.BaseError = BaseError;
