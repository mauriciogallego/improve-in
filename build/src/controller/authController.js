"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const user_1 = require("../models/user");
class AuthController {
}
AuthController.authJWT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) {
        res.status(400).send();
    }
    //Get user from database
    try {
        var { _id } = yield user_1.searchDB({ username, password });
    }
    catch (error) {
        res.status(401).send();
    }
    //Sing JWT, valid for 1 hour
    const token = jwt.sign({ username, _id }, process.env.SECRET, {
        expiresIn: "1h",
    });
    //Send the jwt in the response
    res.json({ token });
});
AuthController.retrieve = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { token } = req.body;
    let decoded = jwt.verify(token, process.env.SECRET);
    token = jwt.sign({ username: decoded.username, _id: decoded._id }, process.env.SECRET, {
        expiresIn: "1h",
    });
    res.json({
        token,
    });
});
exports.default = AuthController;
