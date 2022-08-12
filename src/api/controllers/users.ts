import { Request, Response } from 'express';
import { UsersServices } from '../services/users';



export class UsersController {
    private usersServices: UsersServices; // TODO: Replace by interface

    constructor( usersServices?: UsersServices ) {
        if (usersServices) {
            this.usersServices = usersServices;        
        } 
        else this.usersServices = new UsersServices();
    }

    createUser = async (req: Request, res: Response) => {
        try {
            const { first_name, last_name, email  } = req.body;

            // service
            const { createUser } = this.usersServices;

            const result = await createUser({
                first_name,
                last_name,
                email,
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


    updateUser = async (req: Request, res: Response) => {
        
        try {
            const { id } = req.params;
            const { first_name, last_name } = req.body;

            const { updateUser } = this.usersServices;
            
            const result = await updateUser({
                id,
                first_name, last_name
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


    getUser = async(req: Request, res: Response) => {
    
        try {

            const { id } = req.params;            

            const { getUser } = this.usersServices;

            const result = await getUser({ id });

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

     getAllUsers = async (req: Request, res: Response) => {
        
        try {
            const { getAllUsers } = this.usersServices;
        
            const result = await getAllUsers();

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


    deleteUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const { deleteUser } = this.usersServices;

            await deleteUser(id);

            return res.status(204).json({});
            
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                error: (error as Error).message
            });
        }                 
    }
}