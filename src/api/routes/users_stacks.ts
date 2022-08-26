import { Router } from 'express';
import { UsersStacksController } from '../controllers'
import { stacksProgrammingLanguagesRoutes } from './stacks_programming_languages';


const {
    getAllStacks,
    getStack,
    createStack,
    deleteStack,
    updateStack,
} = new UsersStacksController();




const routes = Router({ mergeParams: true });

routes.use('/:id_stack/programming-languages', stacksProgrammingLanguagesRoutes);

routes.route('/')
    .get( getAllStacks )
    .post( createStack );

routes.route('/:id_stack')
    .get( getStack )
    .delete( deleteStack )
    .patch( updateStack );




export { routes as userStacksRoutes };