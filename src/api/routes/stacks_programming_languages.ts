import { Router } from 'express';
import { StacksProgrammingLanguagesController } from '../controllers'


const {
    getAllStackProgrammingLanguages,
    getStackProgrammingLanguage,
    createStackProgrammingLanguage,
    deleteStackProgrammingLanguage,
    updateStackProgrammingLanguage,
} = new StacksProgrammingLanguagesController();




const routes = Router({ mergeParams: true });

routes.route('/')
    .get( getAllStackProgrammingLanguages )
    .post( createStackProgrammingLanguage );

routes.route('/:id_programming_language')
    .get( getStackProgrammingLanguage )
    .delete( deleteStackProgrammingLanguage )
    .patch( updateStackProgrammingLanguage );




export { routes as stacksProgrammingLanguagesRoutes };