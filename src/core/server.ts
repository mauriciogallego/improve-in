import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { databaseConector } from '../controller/databaseConector';
import { router } from '../router/index';
import morgan from 'morgan'

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'))
app.use(databaseConector);
app.use(router)

export const start = (): void => {
  new Promise(resolve => app.listen(process.env.PORT, () => resolve(app)))
}