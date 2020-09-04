"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const databaseConector_1 = require("../controller/databaseConector");
const index_1 = require("../router/index");
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.use(databaseConector_1.databaseConector);
app.use(index_1.router);
exports.start = () => {
    new Promise(resolve => app.listen(process.env.PORT, () => resolve(app)));
};
