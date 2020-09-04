import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { searchDB } from "../models/user";

class AuthController {
  static authJWT = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send();
    }

    //Get user from database
    try {
      var { _id } = await searchDB({ username, password });
    } catch (error) {
      res.status(401).send();
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign({ username, _id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    //Send the jwt in the response
    res.json({ token });
  };

  static retrieve = async (req: Request, res: Response) => {
    let { token } = req.body;

    let decoded: any = jwt.verify(token, process.env.SECRET);

    token = jwt.sign(
      { username: decoded.username, _id: decoded._id },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({
      token,
    });
  };
}
export default AuthController;
