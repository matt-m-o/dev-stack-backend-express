import { Request, Response } from 'express';
import { StacksProgrammingLanguagesServices } from '../services/stacks_programming_languages';




export class StacksProgrammingLanguagesController {
    private stacksProgrammingLanguagesServices: StacksProgrammingLanguagesServices; // TODO: Replace by interface

    constructor( stacksProgrammingLanguagesServices?: StacksProgrammingLanguagesServices ) {
        if (stacksProgrammingLanguagesServices) {
            this.stacksProgrammingLanguagesServices = stacksProgrammingLanguagesServices;        
        } 
        else this.stacksProgrammingLanguagesServices = new StacksProgrammingLanguagesServices();
    }

    createStackProgrammingLanguage = async (req: Request, res: Response) => {
        try {
            const { id_stack } = req.params;
            const { id_programming_language } = req.body;

            // service
            const { createStackProgrammingLanguage } = this.stacksProgrammingLanguagesServices;

            const result = await createStackProgrammingLanguage({
                id_stack,
                id_programming_language,
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


    updateStackProgrammingLanguage = async (req: Request, res: Response) => {
        
        try {
            const { id_programming_language, id_stack } = req.params;
            const { id_programming_language: new_id_programming_language } = req.body;

            const { updateStackProgrammingLanguage } = this.stacksProgrammingLanguagesServices;

            const result = await updateStackProgrammingLanguage({                
                id_stack,
                id_programming_language,
                new_attributes: {
                    id_programming_language: new_id_programming_language
                }
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


    getStackProgrammingLanguage = async(req: Request, res: Response) => {
    
        try {

            const { id_programming_language, id_stack } = req.params;            

            const { getStackProgrammingLanguage } = this.stacksProgrammingLanguagesServices;

            const result = await getStackProgrammingLanguage({
                id_programming_language,
                id_stack
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

     getAllStackProgrammingLanguages = async (req: Request, res: Response) => {
        
        try {
            const { id_stack } = req.params;

            const { getAllStackProgrammingLanguages } = this.stacksProgrammingLanguagesServices;
        
            const result = await getAllStackProgrammingLanguages({ id_stack });

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


    deleteStackProgrammingLanguage = async (req: Request, res: Response) => {
        try {
            const { id_stack, id_programming_language } = req.params;

            const { deleteStackProgrammingLanguage } = this.stacksProgrammingLanguagesServices;

            await deleteStackProgrammingLanguage({
                id_stack,
                id_programming_language
            });

            return res.status(204).json({});
            
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                error: (error as Error).message
            });
        }
    }
}