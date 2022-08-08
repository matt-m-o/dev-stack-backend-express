import { Entity } from '../core/Entity';

export type UserProgrammingLanguageProps = {    
    id_user: string;
    id_programming_language: string;
};

export class User extends Entity <UserProgrammingLanguageProps> {
    private constructor (props: UserProgrammingLanguageProps, id?: string) {
        super(props, id);
    }

    static async create (props: UserProgrammingLanguageProps, id?: string) {
        const user = new User(props, id);
        await user.hashPassword();
        return user;
    }

    private async hashPassword () {        
    }    
}