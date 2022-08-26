import { User } from "../entities/user";
import { UsersRepository } from "../repositories/users";

type SignUpRequest = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;    
}

export class SignUpService {
    
    constructor(
        private repo : UsersRepository
    ) {}

    async execute({first_name, last_name, email, password}: SignUpRequest) {
        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password
        });
        

        await this.repo.create(newUser);

        return newUser;
    }
}