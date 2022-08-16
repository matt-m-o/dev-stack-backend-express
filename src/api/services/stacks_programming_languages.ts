import { StacksProgrammingLanguagesRepository } from "../repositories/stacks_programming_languages";
import { ProgrammingLanguagesRepository } from "../repositories/programming_languages";

import { StackProgrammingLanguage } from "../entities/stack_programming_language";
import { StacksRepository } from "../repositories/stacks";



type StackProgrammingLanguageCreateParams = {
    id_stack: string;
    id_programming_language: string;
}

type StackProgrammingLanguageUpdateParams = {    
    id_stack: string;
    id_programming_language: string;
    new_attributes: {
        id_stack?: string,
        id_programming_language?: string;
    }
}

type StackProgrammingLanguageGetParams = {
    id?: string;
    id_stack?: string;
    id_programming_language?: string;
}

type StackProgrammingLanguageGetAllParams = {    
    id_stack?: string;    
}

type StackProgrammingLanguageDeleteParams = {
    id_stack: string;
    id_programming_language: string;
}

export class StacksProgrammingLanguagesServices {

    private repo: StacksProgrammingLanguagesRepository;
    private stacksRepo: StacksRepository;
    private programmingLanguagesRepo: ProgrammingLanguagesRepository;

    constructor (
        repo?: StacksProgrammingLanguagesRepository,
        stacksRepo?: StacksRepository,
        programmingLanguagesRepo?: ProgrammingLanguagesRepository,
    ) {
        if (repo) this.repo = repo;
        else this.repo = new StacksProgrammingLanguagesRepository();

        if (stacksRepo) this.stacksRepo = stacksRepo;
        else this.stacksRepo = new StacksRepository();

        if (programmingLanguagesRepo) this.programmingLanguagesRepo = programmingLanguagesRepo;
        else this.programmingLanguagesRepo = new ProgrammingLanguagesRepository();
    }    


    createStackProgrammingLanguage = async ({ id_stack, id_programming_language }: StackProgrammingLanguageCreateParams): Promise<StackProgrammingLanguage> => {        
        
        const exists = await this.repo.findOne({ id_stack, id_programming_language });

        if (exists != null) throw new Error("duplicated-stack-programming-language");


        const [stackExists, programmingLanguageExists] = await Promise.all([
            this.stacksRepo.findOne({ id: id_stack }),
            this.programmingLanguagesRepo.findOne({ id: id_programming_language }),
        ]);
        
        if (!stackExists) throw new Error("not-found-stack");

        if (!programmingLanguageExists) throw new Error("not-found-programming-language");


        const stackProgrammingLanguage = await StackProgrammingLanguage.create({
            id_stack,
            id_programming_language,
        });        

        await this.repo.create(stackProgrammingLanguage);

        return stackProgrammingLanguage;        
    }


    updateStackProgrammingLanguage = async({ id_stack, id_programming_language, new_attributes }: StackProgrammingLanguageUpdateParams): Promise<StackProgrammingLanguage> => {
    
        const stackProgrammingLanguage = await this.repo.findOne({            
            id_stack, id_programming_language
        });
        
        if (!stackProgrammingLanguage) throw new Error('not-found-stack-programming-language');


        if (!new_attributes.id_stack) new_attributes.id_stack = id_stack;

        if (!new_attributes.id_programming_language) new_attributes.id_programming_language = id_programming_language;

        const newExists = await this.repo.findOne({            
            id_stack: new_attributes.id_stack,
            id_programming_language: new_attributes.id_programming_language,
        });

        if (newExists) throw new Error('duplicated-stack-programming-language');


        const [stackExists, programmingLanguageExists] = await Promise.all([
            this.stacksRepo.findOne({ id: id_stack }),
            this.programmingLanguagesRepo.findOne({ id: id_programming_language }),
        ]);
        
        if (!stackExists) throw new Error("not-found-stack");

        if (!programmingLanguageExists) throw new Error("not-found-programming-language");


        if (new_attributes.id_stack)
            stackProgrammingLanguage.attributes.id_stack = new_attributes.id_stack;

        if (new_attributes.id_programming_language)
            stackProgrammingLanguage.attributes.id_programming_language = new_attributes.id_programming_language;
                        

        await this.repo.update(stackProgrammingLanguage);

        return stackProgrammingLanguage;        
    }


    getStackProgrammingLanguage = async({ id_stack, id_programming_language }: StackProgrammingLanguageGetParams): Promise<any | null> => {
    
        const stackProgrammingLanguage = await this.repo.findOne({            
            id_stack, id_programming_language
        });
        
        if (!stackProgrammingLanguage) throw new Error('not-found-stack-programming-language');

        const programmingLanguage = await this.programmingLanguagesRepo.findOne({
            id: stackProgrammingLanguage?.attributes.id_programming_language
        });
    

        return programmingLanguage;
    }

    getAllStackProgrammingLanguages = async ({ id_stack }: StackProgrammingLanguageGetAllParams): Promise<any[] | null> => {
        
        let stackProgrammingLanguages: StackProgrammingLanguage[] = []; 

        if (id_stack) stackProgrammingLanguages = await this.repo.findAll('id_stack', '==', id_stack);

        else stackProgrammingLanguages = await this.repo.findAll();
            

        const ids = stackProgrammingLanguages.map( item  => item.attributes.id_programming_language );
        

        const programmingLanguages = await this.programmingLanguagesRepo.findAll(
            'id', 'in', ids
        );

        return programmingLanguages;
    }


    deleteStackProgrammingLanguage = async({ id_stack, id_programming_language }: StackProgrammingLanguageDeleteParams): Promise<boolean | null> => {
    
        const stackProgrammingLanguage = await this.repo.findOne({            
            id_stack, id_programming_language
        });

        if (!stackProgrammingLanguage) throw new Error('not-found-stack-programming-language');

        await this.repo.delete(stackProgrammingLanguage);

        return true;        
    }
}