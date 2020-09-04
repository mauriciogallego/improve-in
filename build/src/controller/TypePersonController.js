"use strict";
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
const typePerson_1 = require("../models/typePerson");
class TypePersonController {
}
exports.default = TypePersonController;
TypePersonController.addPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, genre, age, vocation } = req.body;
    try {
        let newType = new typePerson_1.typePerson({ name, genre, age, vocation });
        newType.save();
        res.json({ message: "saved" });
    }
    catch (err) {
        res.status(400).send();
    }
});
TypePersonController.getPeople = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newType = yield typePerson_1.typePerson.find({});
        res.json(newType);
    }
    catch (err) {
        res.status(400).send();
    }
});
