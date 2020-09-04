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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const film_1 = require("../models/film");
const metadata_1 = require("../models/metadata");
const constants_1 = require("../utils/constants");
const typePerson_1 = require("../models/typePerson");
const lodash_1 = __importDefault(require("lodash"));
class MovieController {
}
exports.default = MovieController;
MovieController.getFilms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = film_1.film.find({});
        res.json(result);
    }
    catch (err) {
        res.status(400).send();
    }
});
MovieController.getFilmsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, type } = req.params;
    let search = {};
    const { episode = { $exists: true }, season = { $exists: true }, } = req.query;
    type !== constants_1.Type[type] || "" ? (search["type"] = constants_1.Type[type]) : null;
    id !== undefined || "" ? (search["_id"] = id) : null;
    try {
        let result = yield film_1.film.find(search);
        if (search.type == constants_1.Type.movie)
            res.json(result);
        let object = [];
        for (let i = 0; i < result.length; i++) {
            const iterador = result[i];
            let item = iterador.toObject();
            item.actors = [];
            for (let j = 0; j < iterador.actors.length; j++) {
                const id = iterador.actors[j];
                item.actors.push(lodash_1.default.first(yield typePerson_1.typePerson.find({ _id: id })));
            }
            let arraySeasons = [];
            for (let j = 0; j < iterador.seasons.length; j++) {
                const id = iterador.seasons[j];
                let fullseason = lodash_1.default.first(yield metadata_1.season.find({ _id: id, seasonNumber: season }));
                if (fullseason == undefined) {
                    continue;
                }
                let arrayEpisodes = [];
                for (let k = 0; k < fullseason.episodes.length; k++) {
                    const idEpisode = fullseason.episodes[k];
                    let fullEpisode = lodash_1.default.first(yield metadata_1.episode.find({ _id: idEpisode, episodeNumber: episode }));
                    if (fullEpisode == undefined)
                        continue;
                    arrayEpisodes.push(fullEpisode);
                }
                fullseason.episodes = arrayEpisodes;
                arraySeasons.push(fullseason);
            }
            item.seasons = arraySeasons;
            object.push(item);
        }
        res.json(object);
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ message: err });
    }
});
MovieController.addFilm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { title, director, actors, rating, year, type, genre, runtime, seasons, } = req.body;
    try {
        let seasonsId, episodesId;
        if (seasons) {
            if (seasons.length !== 0 && type == constants_1.Type.tvShow) {
                seasonsId = seasons.map((i) => {
                    if (i.episodes.length !== 0) {
                        episodesId = i.episodes.map((j) => new metadata_1.episode(j));
                    }
                    else {
                        res.status(401).send();
                    }
                    i.episodes = episodesId.map((i) => i._id);
                    episodesId.map((i) => i.save());
                    return new metadata_1.season(i);
                });
                seasonsId.map((i) => i.save());
            }
        }
        let newMovie = new film_1.film({
            title,
            director,
            actors,
            rating,
            year,
            type,
            genre,
            runtime,
            seasons: seasonsId ? seasonsId.map((i) => i._id) : undefined,
        });
        newMovie.save();
        res.json({ message: "saved" });
    }
    catch (err) {
        console.log(err);
        res.status(400).send();
    }
});
