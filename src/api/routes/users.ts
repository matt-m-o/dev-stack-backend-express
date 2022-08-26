import { Router } from 'express';
import { UsersController } from '../controllers';

import { userStacksRoutes } from './users_stacks';
import { stacksProgrammingLanguagesRoutes } from './stacks_programming_languages';
import { validateRequest } from '../middlewares/requests_validation';
import { createUserSchema } from '../schemas/users';


const {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
} = new UsersController();




const routes = Router();

routes.use('/:id_user/stacks', userStacksRoutes);
routes.use('/:id_user/programming-languages', stacksProgrammingLanguagesRoutes); // Move to stacks

routes.route('/')
    .get( getAllUsers )
    .post( validateRequest(createUserSchema), createUser );

routes.route('/:id_user')
    .get( getUser )
    .delete( deleteUser )
    .patch( updateUser );




export { routes as usersRoutes };