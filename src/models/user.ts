import { Schema, Types } from "mongoose";
import { Typegoose, prop, Ref, pre } from "typegoose";
// import * as bcrypt from "bcrypt";
import _ from "lodash";
// @pre<User>('save', function () {
//   bcrypt.genSalt(10).then(salts => {
//     bcrypt.hash(this.password, salts).then(hash => {
//       this.password = hash;
//     }).catch(err => console.error(err))
//   }).catch(err => console.error(err))
// })

class User extends Typegoose {
  @prop()
  username: String;

  @prop()
  password: String;

  @prop()
  age?: Number;

  @prop()
  firstName?: String;

  @prop()
  mail: String;
}

export const user = new User().getModelForClass(User);

export async function searchDB(
  findObject: object
): Promise<User & { _id: Types.ObjectId }> {
  let searchUser: User & { _id: Types.ObjectId };
  searchUser = _.first(await user.find(findObject));
  return searchUser;
}
