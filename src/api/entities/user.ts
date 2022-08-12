import { Entity } from '../core/Entity';


// I will make this just as a survey for now.
// Make the auth if I have time
export type UserAttributes = {    
    first_name: string;
    last_name: string;
    email: string;
    password?: string; // Temporary solution
    created_at?: number;
    updated_at?: number;
};

export class User extends Entity <UserAttributes> {
    private constructor (attributes: UserAttributes, id?: string) {
        super(attributes, id);
    }

    static async create (attributes: UserAttributes, id?: string) {
        const user = new User(attributes, id);

        // No id, so the user is new
        if (!id) {            
            await user.hashPassword();
            user.attributes.created_at = Date.now();
        };
        
        return user;
    }

    private async hashPassword () {
        // TODO
    }
}