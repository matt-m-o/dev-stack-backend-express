import { Stack } from "../entities/stack";
import { DevelopmentTypesRepository } from "../repositories/development_types";
import { UsersRepository } from "../repositories/users";
import { StacksRepository } from "../repositories/stacks";
import { ProgrammingLanguagesRepository } from "../repositories/programming_languages";
import { StacksProgrammingLanguagesRepository } from "../repositories/stacks_programming_languages";



type StackCreateParams = {
    id_user: string;
    id_development_type: string;
}

type StackUpdateParams = {
    id: string;
    id_user?: string;
    id_development_type?: string;
}

type StackGetParams = {
    id?: string;
    id_user?: string;
    id_development_type?: string;
}

type StackGetAllParams = {    
    id_user?: string;    
}

export class StacksServices {

    private repo: StacksRepository;
    private usersRepo: UsersRepository;
    private developmentTypesRepo: DevelopmentTypesRepository;
    private programmingLanguagesRepo: ProgrammingLanguagesRepository;

    private stackProgrammingLanguagesRepo: StacksProgrammingLanguagesRepository;

    constructor (
        repo?: StacksRepository,
        usersRepo?: UsersRepository,
        developmentTypesRepo?: DevelopmentTypesRepository,
        programmingLanguagesRepo?: ProgrammingLanguagesRepository,

        stackProgrammingLanguagesRepo?: StacksProgrammingLanguagesRepository,
    ) {
        if (repo) this.repo = repo;
        else this.repo = new StacksRepository();

        if (usersRepo) this.usersRepo = usersRepo;
        else this.usersRepo = new UsersRepository();

        if (developmentTypesRepo) this.developmentTypesRepo = developmentTypesRepo;
        else this.developmentTypesRepo = new DevelopmentTypesRepository();

        if (programmingLanguagesRepo) this.programmingLanguagesRepo = programmingLanguagesRepo;
        else this.programmingLanguagesRepo = new ProgrammingLanguagesRepository();


        if (stackProgrammingLanguagesRepo) this.stackProgrammingLanguagesRepo = stackProgrammingLanguagesRepo;
        else this.stackProgrammingLanguagesRepo = new StacksProgrammingLanguagesRepository();
    }    


    createStack = async ({ id_user, id_development_type }: StackCreateParams): Promise<Stack> => {        
        
        const exists = await this.repo.findOne({ id_user, id_development_type });

        if (exists != null) throw new Error("duplicated-stack");


        const [userExists, developmentTypeExists] = await Promise.all([
            this.usersRepo.findOne({ id: id_user }),
            this.developmentTypesRepo.findOne({ id: id_development_type }),
        ]);
        
        if (!userExists) throw new Error("not-found-user");

        if (!developmentTypeExists) throw new Error("not-found-development-type");


        const stack = await Stack.create({
            id_user,
            id_development_type,
        });        

        await this.repo.create(stack);

        return stack;        
    }


    updateStack = async({ id, id_user, id_development_type }: StackUpdateParams): Promise<Stack> => {
    
        const stack = await this.repo.findOne({            
            id,
        });
        
        if (!stack) throw new Error('not-found-stack');


        const [userExists, developmentTypeExists] = await Promise.all([
            this.usersRepo.findOne({ id: id_user }),
            this.developmentTypesRepo.findOne({ id: id_development_type }),
        ]);
        
        if (!userExists) throw new Error("not-found-user");

        if (!developmentTypeExists) throw new Error("not-found-development-type");


        if (id_user) stack.attributes.id_user = id_user;

        if (id_development_type) stack.attributes.id_development_type = id_development_type;
                        

        await this.repo.update(stack);

        return stack;
    }


    getStack = async({ id, id_user }: StackGetParams): Promise<any | null> => {
    
        const stack = await this.repo.findOne({            
            id, id_user
        });
        
        if (!stack) throw new Error('not-found-stack');


        const [devType, stackProgrammingLanguages] = await Promise.all([
            this.developmentTypesRepo.findOne({
                id: stack?.attributes.id_development_type
            }),

            this.stackProgrammingLanguagesRepo.findAll(
                'id_stack', '==', id
            ),
        ]);
        


        const programmingLanguagesIDs = stackProgrammingLanguages.map( item  => 
            item.attributes.id_programming_language 
        );
        

        const programming_languages = await this.programmingLanguagesRepo.findAll(
            'id', 'in', programmingLanguagesIDs
        );
        
        
        const result = stack as any;
        
        result.attributes.development_type = devType;
        
        result.attributes.programming_languages = programming_languages;

        return result;
    }

    getAllStacks = async ({ id_user }: StackGetAllParams): Promise<any[] | null> => {
    
        let stacks: Stack[] = []; 

        if (id_user) stacks = await this.repo.findAll('id_user', '==', id_user);

        else stacks = await this.repo.findAll();
        
        const results = [];

        // Getting the objects from id reference (there are better ways to do this...)
        for (const item of stacks) {

            const [ devType, stackProgrammingLanguages ] = await Promise.all([
                this.developmentTypesRepo.findOne({
                    id: item.attributes.id_development_type
                }),

                this.stackProgrammingLanguagesRepo.findAll(
                    'id_stack', '==', item.id
                ),
            ]);
            
            const result = item as any;

            result.attributes.development_type = devType;

            result.attributes.programming_languages = stackProgrammingLanguages

            results.push(result);            
        }        

        return results;
    }


    deleteStack = async(id: string): Promise<boolean | null> => {
    
        const stack = await this.repo.findOne({            
            id
        });

        if (!stack) throw new Error('not-found-stack');

        await this.repo.delete(stack);

        return true;        
    }
}