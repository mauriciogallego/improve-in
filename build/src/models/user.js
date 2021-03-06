"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDB = exports.user = void 0;
const typegoose_1 = require("typegoose");
// import * as bcrypt from "bcrypt";
const lodash_1 = __importDefault(require("lodash"));
// @pre<User>('save', function () {
//   bcrypt.genSalt(10).then(salts => {
//     bcrypt.hash(this.password, salts).then(hash => {
//       this.password = hash;
//     }).catch(err => console.error(err))
//   }).catch(err => console.error(err))
// })
class User extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "mail", void 0);
exports.user = new User().getModelForClass(User);
function searchDB(findObject) {
    return __awaiter(this, void 0, void 0, function* () {
        let searchUser;
        searchUser = lodash_1.default.first(yield exports.user.find(findObject));
        return searchUser;
    });
}
exports.searchDB = searchDB;
