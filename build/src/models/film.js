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
exports.film = exports.Film = void 0;
const typegoose_1 = require("typegoose");
const typePerson_1 = require("./typePerson");
const constants_1 = require("../utils/constants");
const metadata_1 = require("./metadata");
class Film extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_1.prop({ unique: true, index: true }),
    __metadata("design:type", String)
], Film.prototype, "title", void 0);
__decorate([
    typegoose_1.prop({ ref: typePerson_1.TypePerson }),
    __metadata("design:type", Object)
], Film.prototype, "director", void 0);
__decorate([
    typegoose_1.arrayProp({ itemsRef: typePerson_1.TypePerson }),
    __metadata("design:type", Array)
], Film.prototype, "actors", void 0);
__decorate([
    typegoose_1.prop({ min: 1, max: 10 }),
    __metadata("design:type", Number)
], Film.prototype, "rating", void 0);
__decorate([
    typegoose_1.prop({ enum: constants_1.Type }),
    __metadata("design:type", String)
], Film.prototype, "type", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], Film.prototype, "year", void 0);
__decorate([
    typegoose_1.prop({ enum: constants_1.GenreFilms }),
    __metadata("design:type", String)
], Film.prototype, "genre", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], Film.prototype, "runtime", void 0);
__decorate([
    typegoose_1.arrayProp({ itemsRef: metadata_1.Season }),
    __metadata("design:type", Array)
], Film.prototype, "seasons", void 0);
exports.Film = Film;
exports.film = new Film().getModelForClass(Film);
