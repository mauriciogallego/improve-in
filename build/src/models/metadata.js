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
exports.season = exports.episode = exports.Season = exports.Episode = void 0;
const typegoose_1 = require("typegoose");
class Episode extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Episode.prototype, "title", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], Episode.prototype, "episodeNumber", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], Episode.prototype, "runtime", void 0);
exports.Episode = Episode;
class Season extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Season.prototype, "title", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], Season.prototype, "seasonNumber", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], Season.prototype, "runtime", void 0);
__decorate([
    typegoose_1.arrayProp({ itemsRef: Episode }),
    __metadata("design:type", Array)
], Season.prototype, "episodes", void 0);
exports.Season = Season;
exports.episode = new Episode().getModelForClass(Episode);
exports.season = new Season().getModelForClass(Season);
