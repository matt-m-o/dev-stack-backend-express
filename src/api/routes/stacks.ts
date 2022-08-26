import { Router } from 'express';
import { GetAllStacksController } from '../controllers';



const routes = Router();


routes.route('/')
    .get( new GetAllStacksController().handle )




export { routes as stacksRoutes };