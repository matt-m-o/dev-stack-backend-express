import { Entity } from '../core/Entity';


// I will make this just as a survey for now.
// Make the auth if I have time
export type UserProps = {    
    first_name: string;
    last_name: string;
    email: string;
    password?: string; // Temporary solution
    created_at?: number;
    updated_at?: number;
};

export class User extends Entity <UserProps> {
    private constructor (props: UserProps, id?: string) {
        super(props, id);
    }

    static async create (props: UserProps, id?: string) {
        const user = new User(props, id);

        // No id, so the user is new
        if (!id) {            
            await user.hashPassword();
            user.props.created_at = Date.now();
        };
        
        return user;
    }

    private async hashPassword () {
        // TODO
    }
}