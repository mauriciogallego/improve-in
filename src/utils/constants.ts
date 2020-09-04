import { Ref } from "typegoose";
import { TypePerson } from "../models/typePerson";
import { Episode } from "../models/metadata";
import { Types } from "mongoose";

export enum Genre {
  male = "male",
  female = "female",
}

export enum GenreFilms {
  action = "action",
  animation = "animation",
  cartoon = "cartoon",
  drama = "drama",
  fantasy = "fantasy",
  horror = "horror",
  musical = "musical",
  war = "war",
  thriller = "thriller",
  scary = "scary",
  comedy = "comedy",
}

export enum Type {
  movie = "movie",
  tvShow = "tvShow",
}

export enum Vocation {
  director = "director",
  actor = "actor",
}

export type fullFilms = {
  title: string;
  director: Ref<TypePerson>;
  actors?: Ref<TypePerson>[];
  rating: number;
  type: Type;
  year: number;
  genre: GenreFilms;
  runtime: number;
  seasons: fullSeason[];
};

export type fullSeason = {
  title: string;
  seasonNumber: number;
  runtime: number;
  episodes: Ref<Episode>[];
};
