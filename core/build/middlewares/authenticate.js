"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const NotAuthorizedUser_1 = require("../errors/NotAuthorizedUser");
const authenticate = (req, res, next) => {
    if (req.currentUser == null) {
        throw new NotAuthorizedUser_1.NotAuthorizedUser('User not authorized to access');
    }
    next();
};
exports.authenticate = authenticate;
