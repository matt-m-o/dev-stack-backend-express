import { User } from "../entities/user";
import { UsersRepository } from "../repositories/users";


type UserCreateParams = {
    first_name: string;
    last_name: string;
    email: string;
    password?: string;
}

type UserUpdateParams = {
    id: string;
    first_name?: string;
    last_name?: string;    
}

type UserGetParams = {
    id: string;
    email?: string;    
}

export class UsersServices {

    private repository: UsersRepository;

    constructor (repo?: UsersRepository) {
        if (repo) 
            this.repository = repo;
        else 
            this.repository = new UsersRepository();
    }    


    createUser = async ({ first_name, last_name, email }: UserCreateParams): Promise<User> => {        
        
        const exists = await this.repository.findOne({ email });

        if (exists != null) throw new Error("duplicated-user");        

        const user = await User.create({
            first_name,
            last_name,
            email,
        });        

        await this.repository.create(user);

        return user;        
    }


    updateUser = async({ id, first_name, last_name }: UserUpdateParams): Promise<User> => {
    
        const user = await this.repository.findOne({            
            id,
        });
        
        if (!user) throw new Error('not-found-user');


        if (first_name) user.attributes.first_name = first_name;

        if (last_name) user.attributes.last_name = last_name;
                        

        await this.repository.update(user);

        return user;        
    }


    getUser = async({ id }: UserGetParams): Promise<User | null> => {
    
        const user = await this.repository.findOne({            
            id
        });

        return user;        
    }

    getAllUsers = async (): Promise<User[] | null> => {
    
        const users = await this.repository.findAll();

        return users;        
    }


    deleteUser = async(id: string): Promise<boolean | null> => {
    
        const user = await this.repository.findOne({            
            id
        });

        if (!user) throw new Error('not-found-user');

        await this.repository.delete(user);

        return true;        
    }
}