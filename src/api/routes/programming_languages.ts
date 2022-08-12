import { Router } from 'express';
import { ProgrammingLanguagesController } from '../controllers'


const {
    getAllProgrammingLanguages,
    getProgrammingLanguage,
    createProgrammingLanguage,
    deleteProgrammingLanguage,
    updateProgrammingLanguage,
} = new ProgrammingLanguagesController();




const routes = Router();

routes.route('/')
    .get( getAllProgrammingLanguages )
    .post( createProgrammingLanguage );

routes.route('/:id')
    .get( getProgrammingLanguage )
    .delete( deleteProgrammingLanguage )
    .patch( updateProgrammingLanguage );




export { routes as programmingLanguagesRoutes };