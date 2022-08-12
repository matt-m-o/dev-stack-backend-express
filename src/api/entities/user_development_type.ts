import { Entity } from '../core/Entity';

export type UserDevelopmentTypeAttributes = {    
    id_user: string;
    id_development_type: string;
    created_at?: number;
    updated_at?: number;
};

export class UserDevelopmentType extends Entity <UserDevelopmentTypeAttributes> {
    private constructor (attributes: UserDevelopmentTypeAttributes, id?: string) {
        super(attributes, id);
    }

    static async create (attributes: UserDevelopmentTypeAttributes, id?: string) {
        const userDevelopmentType = new UserDevelopmentType(attributes, id);        
        return userDevelopmentType;
    }
}