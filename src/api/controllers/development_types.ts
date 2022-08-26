import { Request, Response } from 'express';
import { DevelopmentTypesServices } from '../services';

export class DevelopmentTypesController {
    private developmentTypesServices: DevelopmentTypesServices; // TODO: Replace by interface

    constructor( developmentTypesServices?: DevelopmentTypesServices ) {
        if (developmentTypesServices) {
            this.developmentTypesServices = developmentTypesServices;        
        } 
        else this.developmentTypesServices = new DevelopmentTypesServices();
    }

    createDevelopmentType = async (req: Request, res: Response) => {
        try {
            const { name } = req.body;

            // service
            const { createDevelopmentType } = this.developmentTypesServices;

            const result = await createDevelopmentType({
                name
            });

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


    updateDevelopmentType = async (req: Request, res: Response) => {
        
        try {
            const { id } = req.params;
            const { name } = req.body;

            const { updateDevelopmentType } = this.developmentTypesServices;
            
            const result = await updateDevelopmentType({
                id,
                name
            });
            

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


    getDevelopmentType = async(req: Request, res: Response) => {
    
        try {

            const { id } = req.params;            

            const { getDevelopmentType } = this.developmentTypesServices;

            const result = await getDevelopmentType({ id });

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

     getAllDevelopmentTypes = async (req: Request, res: Response) => {
        
        try {
            const { getAllDevelopmentTypes } = this.developmentTypesServices;
        
            const result = await getAllDevelopmentTypes();

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


    deleteDevelopmentType = async (req: Request, res: Response) => {
        try {
            const { id, name } = req.params;

            const { deleteDevelopmentType } = this.developmentTypesServices;

            await deleteDevelopmentType(id);

            return res.status(204).json({});
            
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                error: (error as Error).message
            });
        }                 
    }
}