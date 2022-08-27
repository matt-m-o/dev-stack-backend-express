import express from 'express';
import cors from 'cors';
import { requestsLogger } from './api/middlewares/requests_logger';

import './api/database';
// import {  } = from 'helmet';
// import {  } = from 'compression');

// import {  } = from 'passport';

import { 
    usersRoutes,
    developmentTypesRoutes,
    programmingLanguagesRoutes,
    stacksRoutes,
 } from './api/routes';



const app = express();

app.use(requestsLogger);
app.use(cors());

app.use(express.json());

app.use('/users', usersRoutes);
app.use('/development-types', developmentTypesRoutes);
app.use('/programming-languages', programmingLanguagesRoutes);
app.use('/stacks', stacksRoutes);

export { app };