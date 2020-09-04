"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConector = void 0;
const database_1 = require("../core/database");
function databaseConector(req, res, next) {
    let { connected } = database_1.getConnectionSate();
    if (!connected) {
        database_1.connect();
    }
    next();
}
exports.databaseConector = databaseConector;
