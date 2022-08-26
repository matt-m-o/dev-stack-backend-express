import express from 'express';
import http from 'http';
import cors from 'cors';

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

app.use(cors());

app.use(express.json());

app.use('/users', usersRoutes);
app.use('/development-types', developmentTypesRoutes);
app.use('/programming-languages', programmingLanguagesRoutes);
app.use('/stacks', stacksRoutes);

export { app };