import { Request, Response } from 'express';
import { StacksServices } from '../services/stacks';



export class StacksController {
    private stacksServices: StacksServices; // TODO: Replace by interface

    constructor( stacksServices?: StacksServices ) {
        if (stacksServices) {
            this.stacksServices = stacksServices;        
        } 
        else this.stacksServices = new StacksServices();
    }

    createStack = async (req: Request, res: Response) => {
        try {
            const { id_user } = req.params;
            const { id_development_type } = req.body;

            // service
            const { createStack } = this.stacksServices;

            const result = await createStack({
                id_user,
                id_development_type,
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


    updateStack = async (req: Request, res: Response) => {
        
        try {
            const { id_stack, id_user } = req.params;
            const { id_development_type } = req.body;

            const { updateStack } = this.stacksServices;
            
            const result = await updateStack({
                id: id_stack,
                id_user,
                id_development_type
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


    getStack = async(req: Request, res: Response) => {
    
        try {

            const { id_stack, id_user } = req.params;            

            const { getStack } = this.stacksServices;

            const result = await getStack({ id: id_stack, id_user });

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

     getAllStacks = async (req: Request, res: Response) => {
        
        try {
            const { id_user } = req.params;

            const { getAllStacks } = this.stacksServices;
        
            const result = await getAllStacks({ id_user });

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


    deleteStack = async (req: Request, res: Response) => {
        try {
            const { id_stack } = req.params;

            const { deleteStack } = this.stacksServices;

            await deleteStack(id_stack);

            return res.status(204).json({});
            
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                error: (error as Error).message
            });
        }                 
    }
}