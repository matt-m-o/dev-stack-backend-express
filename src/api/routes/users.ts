import { Router } from 'express';
import { UsersController } from '../controllers'


const {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
} = new UsersController();




const routes = Router();

routes.route('/')
    .get( getAllUsers )
    .post( createUser );

routes.route('/:id')
    .get( getUser )
    .delete( deleteUser )
    .patch( updateUser );




export { routes as usersRoutes };