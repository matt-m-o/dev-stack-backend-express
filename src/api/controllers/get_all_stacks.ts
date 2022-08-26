import { Request, Response } from 'express';
import { GetAllStacksService } from '../services';



export class GetAllStacksController {
    private service: GetAllStacksService; // TODO: Replace by interface

    constructor( service?: GetAllStacksService ) {
        if (service) {
            this.service = service;        
        } 
        else this.service = new GetAllStacksService();
    }    

    handle = async (req: Request, res: Response) => {
        
        try {
            // TODO: Pagination
            const result = await this.service.execute();

            return res.json({
                data: result
            });
            
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                error: (error as Error).message
            });
        }        
    }    
}