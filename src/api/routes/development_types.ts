import { Router } from 'express';
import { DevelopmentTypesController } from '../controllers/'


const {
    getAllDevelopmentTypes,
    getDevelopmentType,
    createDevelopmentType,
    deleteDevelopmentType,
    updateDevelopmentType,
} = new DevelopmentTypesController();


const routes = Router();

routes.route('/')
    .get( getAllDevelopmentTypes )
    .post( createDevelopmentType );

routes.route('/:id')
    .get( getDevelopmentType )
    .delete( deleteDevelopmentType )
    .patch( updateDevelopmentType );




export { routes as developmentTypesRoutes };