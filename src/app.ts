import express from 'express';
import './api/database';
// import {  } = from 'cors';
// import {  } = from 'helmet';
// import {  } = from 'compression');

// import {  } = from 'passport';

import { 
    usersRoutes,
    developmentTypesRoutes,
    programmingLanguagesRoutes,
 } from './api/routes';



const app = express();

app.use(express.json());

app.use('/users', usersRoutes);
app.use('/development-types', developmentTypesRoutes);
app.use('/programming-languages', programmingLanguagesRoutes);

export { app };