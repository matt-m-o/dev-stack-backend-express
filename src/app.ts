import express from 'express';
import './api/database';
// import {  } = from 'cors';
// import {  } = from 'helmet';
// import {  } = from 'compression');

// import {  } = from 'passport';

import { UsersRouter } from './api/routes';
// import './api/routes/auth'; 


const app = express();

app.use(express.json());

app.use('/users', UsersRouter);

export { app };
