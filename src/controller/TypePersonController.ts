import { Request, Response } from "express";
import { typePerson } from "../models/typePerson";

export default class TypePersonController {
  static addPerson = async (req: Request, res: Response) => {
    let { name, genre, age, vocation } = req.body
    try {
      let newType = new typePerson({ name, genre, age, vocation });
      newType.save();
      res.json({ message: "saved" });
    } catch (err) {
      res.status(400).send();
    }
  };

  static getPeople = async (req: Request, res: Response) => {
    try {
      let newType = await typePerson.find({});
      res.json(newType);
    } catch (err) {
      res.status(400).send();
    }
  };
}
