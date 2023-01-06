import express from 'express';
import { Request, Response } from 'express';
import sequelize from '../dataSources/sequelize';
import cors from 'cors';
import UserController from '../controllers/http/UserController';
import DrugController from '../controllers/http/DrugController';
import VaccinationController from '../controllers/http/VaccinationController';

const app = express();

app.use(cors())
app.use(express.json({
  limit:"50mb"
}));
app.use(
  express.urlencoded({
    limit:"50mb",
    extended: true,
  })
);

app.get('/', (req: Request, res: Response) => {
  res.send('Application works!');
});

app.use('/api/v1/user', UserController);

app.use('/api/v1/drugs', DrugController);

app.use('/api/v1/vaccination', VaccinationController);

app.listen(3000, () => {
  console.log('Application started on port 3000!');
});

sequelize.sync().then( () => {
  console.log('Base de datos sincronizada');
}).catch ((error) => {
  console.log('Error',error);
});
