import { Request, Response } from 'express';
import { ProgrammingLanguagesServices } from '../services';


export class ProgrammingLanguagesController {
    private programmingLanguagesServices: ProgrammingLanguagesServices; // TODO: Replace by interface

    constructor( programmingLanguagesServices?: ProgrammingLanguagesServices ) {
        if (programmingLanguagesServices) {
            this.programmingLanguagesServices = programmingLanguagesServices;        
        } 
        else this.programmingLanguagesServices = new ProgrammingLanguagesServices();
    }

    createProgrammingLanguage = async (req: Request, res: Response) => {
        try {
            const { name, full_name } = req.body;

            // service
            const { createProgrammingLanguage } = this.programmingLanguagesServices;

            const result = await createProgrammingLanguage({
                name,
                full_name
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


    updateProgrammingLanguage = async (req: Request, res: Response) => {
        
        try {
            const { id } = req.params;
            const { name, full_name } = req.body;

            const { updateProgrammingLanguage } = this.programmingLanguagesServices;
            
            const result = await updateProgrammingLanguage({
                id,
                name,
                full_name
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


    getProgrammingLanguage = async(req: Request, res: Response) => {
    
        try {

            const { id } = req.params;            

            const { getProgrammingLanguage } = this.programmingLanguagesServices;

            const result = await getProgrammingLanguage({ id });

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

     getAllProgrammingLanguages = async (req: Request, res: Response) => {
        
        try {
            const { getAllProgrammingLanguages } = this.programmingLanguagesServices;
        
            const result = await getAllProgrammingLanguages();

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


    deleteProgrammingLanguage = async (req: Request, res: Response) => {
        try {
            const { id, name } = req.params;

            const { deleteProgrammingLanguage } = this.programmingLanguagesServices;

            await deleteProgrammingLanguage(id);

            return res.status(204).json({});
            
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                error: (error as Error).message
            });
        }                 
    }
}