import { Entity } from '../core/Entity';

export type UserProps = {    
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    development_type?: string;
    created_at?: number; 
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