import { firestoreDB } from '../../database';
import { User } from "../../entities/user";
import { UsersRepository } from "../users";


// TODO
// Fix issue: error only happens when running with Jest "Service account object must contain a string "project_id" property."
// Possible solution: package "ts-mock-firebase" ( must support "withConverter" )

describe('Users repository', () => {
    const sut = new UsersRepository();

    
    it('should be able to create a new user', async () => {     
                
        const response = await sut.create(
            await User.create({
                first_name: 'Second',
                last_name: 'User',
                email: 'second.user@email.com',
                password: 'P@55word'
            })
        );

        expect(response).toBeTruthy();        
    });
    

    
});