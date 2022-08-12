import { Entity } from '../core/Entity';

export type UserProgrammingLanguageAttributes = {    
    id_user: string;
    id_programming_language: string;
    created_at?: number;
    updated_at?: number;
};

export class UserProgrammingLanguage extends Entity <UserProgrammingLanguageAttributes> {
    private constructor (attributes: UserProgrammingLanguageAttributes, id?: string) {
        super(attributes, id);
    }

    static async create (attributes: UserProgrammingLanguageAttributes, id?: string) {
        const userProgrammingLanguage = new UserProgrammingLanguage(attributes, id);
        return userProgrammingLanguage;
    }
}