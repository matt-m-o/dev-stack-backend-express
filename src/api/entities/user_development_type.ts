import { Entity } from '../core/Entity';

export type UserDevelopmentTypeProps = {    
    id_user: string;
    id_development_type: string;
    created_at?: number;
    updated_at?: number;
};

export class UserDevelopmentType extends Entity <UserDevelopmentTypeProps> {
    private constructor (props: UserDevelopmentTypeProps, id?: string) {
        super(props, id);
    }

    static async create (props: UserDevelopmentTypeProps, id?: string) {
        const userDevelopmentType = new UserDevelopmentType(props, id);        
        return userDevelopmentType;
    }
}