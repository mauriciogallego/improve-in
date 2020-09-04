import { Request, Response } from "express";
import { film, Film } from "../models/film";
import {
  season as Season,
  episode as Episode,
  Season as SeasonI,
  Episode as EpisodeI,
  season,
} from "../models/metadata";
import { Genre, GenreFilms, Type, fullFilms } from "../utils/constants";
import { typePerson, TypePerson } from "../models/typePerson";
import _ from "lodash";
import { Ref } from "typegoose";

export default class MovieController {
  static getFilms = async (req: Request, res: Response) => {
    try {
      let result = film.find({});
      res.json(result);
    } catch (err) {
      res.status(400).send();
    }
  };

  static getFilmsById = async (req: Request, res: Response) => {
    const { id, type } = req.params;
    let search: Film | any = {};
    const {
      episode = { $exists: true },
      season = { $exists: true },
    }: any = req.query;

    type !== Type[type] || "" ? (search["type"] = Type[type]) : null;
    id !== undefined || "" ? (search["_id"] = id) : null;
    try {
      let result = await film.find(search);

      if (search.type == Type.movie) res.json(result);

      let object = [];
      for (let i = 0; i < result.length; i++) {
        const iterador = result[i];
        let item: any = iterador.toObject();
        item.actors = [];

        for (let j = 0; j < iterador.actors.length; j++) {
          const id = iterador.actors[j];

          item.actors.push(_.first(await typePerson.find({ _id: id })));
        }
        let arraySeasons = [];
        for (let j = 0; j < iterador.seasons.length; j++) {
          const id = iterador.seasons[j];

          let fullseason = _.first(
            await Season.find({ _id: id, seasonNumber: season })
          );
          if (fullseason == undefined) {
            continue;
          }

          let arrayEpisodes = [];

          for (let k = 0; k < fullseason.episodes.length; k++) {
            const idEpisode = fullseason.episodes[k];
            let fullEpisode = _.first(
              await Episode.find({ _id: idEpisode, episodeNumber: episode })
            );
            if (fullEpisode == undefined) continue;
            arrayEpisodes.push(fullEpisode);
          }

          fullseason.episodes = arrayEpisodes;
          arraySeasons.push(fullseason);
        }
        item.seasons = arraySeasons;
        object.push(item);
      }

      res.json(object);
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: err });
    }
  };

  static addFilm = async (req: Request, res: Response) => {
    let {
      title,
      director,
      actors,
      rating,
      year,
      type,
      genre,
      runtime,
      seasons,
    } = req.body;

    try {
      let seasonsId: any[], episodesId: any[];
      if (seasons) {
        if (seasons.length !== 0 && type == Type.tvShow) {
          seasonsId = seasons.map((i: any) => {
            if (i.episodes.length !== 0) {
              episodesId = i.episodes.map((j: any) => new Episode(j));
            } else {
              res.status(401).send();
            }
            i.episodes = episodesId.map((i) => i._id);
            episodesId.map((i) => i.save());
            return new Season(i);
          });
          seasonsId.map((i) => i.save());
        }
      }

      let newMovie = new film({
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
    } catch (err) {
      console.log(err);
      res.status(400).send();
    }
  };
}
