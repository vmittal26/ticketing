"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionError = void 0;
const BaseError_1 = require("./BaseError");
class DatabaseConnectionError extends BaseError_1.BaseError {
    constructor() {
        super('Database error');
        this.statusCode = 500;
    }
    getSerializedErrors() {
        return [{ message: this.message }];
    }
}
exports.DatabaseConnectionError = DatabaseConnectionError;
