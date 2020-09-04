import { Router } from "express";
import AuthController from "../controller/authController";
import { checkJwt } from "../middleware/authz";
import FilmController from "../controller/FilmController";
import TypePersonController from "../controller/TypePersonController";
import swaggerUi from "swagger-ui-express";
const swaggerDoc = require("../utils/swagger.json");

export const router: Router = Router();

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

router.post("/api/auth", AuthController.authJWT);
router.post("/api/auth/refresh", AuthController.retrieve);

router.get("/api/film", checkJwt, FilmController.getFilmsById);
router.get("/api/film/:type", checkJwt, FilmController.getFilmsById);
router.get("/api/film/:type/:id", checkJwt, FilmController.getFilmsById);

router.post("/api/film/add", checkJwt, FilmController.addFilm);
router.post("/api/person/add", checkJwt, TypePersonController.addPerson);
router.get("/api/person", checkJwt, TypePersonController.getPeople);
