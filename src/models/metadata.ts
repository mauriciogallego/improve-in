import { Schema } from "mongoose";
import { Typegoose, prop, arrayProp, Ref } from "typegoose";

export class Episode extends Typegoose {
  @prop()
  public title: String;

  @prop()
  public episodeNumber?: Number;

  @prop()
  public runtime?: Number;
}

export class Season extends Typegoose {
  @prop()
  public title: String;

  @prop()
  public seasonNumber?: Number;

  @prop()
  public runtime?: Number;

  @arrayProp({ itemsRef: Episode })
  public episodes: Ref<Episode>[];
}

export const episode = new Episode().getModelForClass(Episode);
export const season = new Season().getModelForClass(Season);
