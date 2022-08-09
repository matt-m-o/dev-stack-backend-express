import { Entity } from '../core/Entity';

export type UserProgrammingLanguageProps = {    
    id_user: string;
    id_programming_language: string;
    created_at?: number;
    updated_at?: number;
};

export class UserProgrammingLanguage extends Entity <UserProgrammingLanguageProps> {
    private constructor (props: UserProgrammingLanguageProps, id?: string) {
        super(props, id);
    }

    static async create (props: UserProgrammingLanguageProps, id?: string) {
        const userProgrammingLanguage = new UserProgrammingLanguage(props, id);
        return userProgrammingLanguage;
    }
}