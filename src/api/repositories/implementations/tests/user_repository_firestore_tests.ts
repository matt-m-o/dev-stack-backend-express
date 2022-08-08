import { User } from "../../../entities/user";
import { UsersRepositoryFirestore } from "../users_repository_firestore";



describe('Users repository', () => {
    const sut = new UsersRepositoryFirestore();

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