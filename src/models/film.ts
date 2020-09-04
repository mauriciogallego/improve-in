import { Schema } from "mongoose";
import { Typegoose, prop, Ref, arrayProp } from "typegoose";
import { TypePerson } from "./typePerson";
import { GenreFilms, Type } from "../utils/constants";
import { Season } from "./metadata";

export class Film extends Typegoose {
  @prop({ unique: true, index: true })
  public title: String;

  @prop({ ref: TypePerson })
  public director: Ref<TypePerson>;

  @arrayProp({ itemsRef: TypePerson })
  public actors?: Ref<TypePerson>[];

  @prop({ min: 1, max: 10 })
  public rating?: Number;

  @prop({enum: Type})
  public type?:Type ;

  @prop()
  public year?: Number;

  @prop({enum: GenreFilms})
  public genre?: GenreFilms;

  @prop()
  public runtime?: Number;

  @arrayProp({itemsRef: Season})
  public seasons?: Ref<Season>[];
}

export const film = new Film().getModelForClass(Film);
