import { Schema, Types } from "mongoose";
import { Typegoose, prop, Ref, arrayProp } from "typegoose";
import { Genre, Vocation } from "../utils/constants";

export class TypePerson extends Typegoose {
  @prop({ unique: true })
  public name: String;

  @prop({ enum: Genre })
  public genre: Genre;

  @prop()
  public age: Number;

  @arrayProp({items: String, enum: Vocation})
  public vocation: Vocation[];
}

export const typePerson = new TypePerson().getModelForClass(TypePerson);
