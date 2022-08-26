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

    private repo: UsersRepository;

    constructor (repo?: UsersRepository) {
        if (repo) 
            this.repo = repo;
        else 
            this.repo = new UsersRepository();
    }    


    createUser = async ({ first_name, last_name, email }: UserCreateParams): Promise<User> => {        
        
        const exists = await this.repo.findOne({ email });

        if (exists != null) throw new Error("duplicated-user");

        const user = await User.create({
            first_name,
            last_name,
            email,
        });

        await this.repo.create(user);

        return user;        
    }


    updateUser = async({ id, first_name, last_name }: UserUpdateParams): Promise<User> => {
    
        const user = await this.repo.findOne({            
            id,
        });
        
        if (!user) throw new Error('not-found-user');


        if (first_name) user.attributes.first_name = first_name;

        if (last_name) user.attributes.last_name = last_name;
                        

        await this.repo.update(user);

        return user;        
    }


    getUser = async({ id }: UserGetParams): Promise<User | null> => {
    
        const user = await this.repo.findOne({            
            id
        });

        return user;        
    }

    getAllUsers = async (): Promise<User[] | null> => {
    
        const users = await this.repo.findAll();

        return users.map( user => {
            user.attributes.password = undefined;
            return user;
        });
    }


    deleteUser = async(id: string): Promise<boolean | null> => {
                
        const user = await this.repo.findOne({            
            id
        });

        if (!user) throw new Error('not-found-user');

        await this.repo.delete(user);

        return true;        
    }
}