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
Object.defineProperty(exports, "__esModule", { value: true });
exports.typePerson = exports.TypePerson = void 0;
const typegoose_1 = require("typegoose");
const constants_1 = require("../utils/constants");
class TypePerson extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_1.prop({ unique: true }),
    __metadata("design:type", String)
], TypePerson.prototype, "name", void 0);
__decorate([
    typegoose_1.prop({ enum: constants_1.Genre }),
    __metadata("design:type", String)
], TypePerson.prototype, "genre", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], TypePerson.prototype, "age", void 0);
__decorate([
    typegoose_1.arrayProp({ items: String, enum: constants_1.Vocation }),
    __metadata("design:type", Array)
], TypePerson.prototype, "vocation", void 0);
exports.TypePerson = TypePerson;
exports.typePerson = new TypePerson().getModelForClass(TypePerson);
