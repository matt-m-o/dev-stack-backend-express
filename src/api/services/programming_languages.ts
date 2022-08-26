import { ProgrammingLanguage } from "../entities/programming_language";
import { ProgrammingLanguagesRepository } from "../repositories/programming_languages";


type ProgrammingLanguageCreateParams = {
    name: string;
    full_name?: string;
}

type ProgrammingLanguageUpdateParams = {
    id: string;
    name?: string; 
    full_name?: string;
}

type ProgrammingLanguageGetParams = {
    id: string;
    name?: string;
    full_name?: string;
}

export class ProgrammingLanguagesServices {

    private repo: ProgrammingLanguagesRepository;

    constructor (repo?: ProgrammingLanguagesRepository) {
        if (repo) 
            this.repo = repo;
        else 
            this.repo = new ProgrammingLanguagesRepository();
    }    


    createProgrammingLanguage = async ({ name, full_name }: ProgrammingLanguageCreateParams): Promise<ProgrammingLanguage> => {        
        
        const exists = await this.repo.findOne({ name });

        if (exists != null) throw new Error("duplicated-programming-language");        

        const programmingLanguage = await ProgrammingLanguage.create({
            name,
            full_name,
        });        

        await this.repo.create(programmingLanguage);

        return programmingLanguage;        
    }


    updateProgrammingLanguage = async({ id, name, full_name }: ProgrammingLanguageUpdateParams): Promise<ProgrammingLanguage> => {
    
        const programmingLanguage = await this.repo.findOne({            
            id,
        });
        
        if (!programmingLanguage) throw new Error('not-found-programming-language');


        if (name) programmingLanguage.attributes.name = name;

        if (full_name) programmingLanguage.attributes.full_name = full_name;
                        

        await this.repo.update(programmingLanguage);

        return programmingLanguage;        
    }


    getProgrammingLanguage = async({ id }: ProgrammingLanguageGetParams): Promise<ProgrammingLanguage | null> => {
    
        const programmingLanguage = await this.repo.findOne({            
            id
        });

        return programmingLanguage;        
    }

    getAllProgrammingLanguages = async (): Promise<ProgrammingLanguage[] | null> => {
    
        const programmingLanguages = await this.repo.findAll();

        return programmingLanguages;        
    }


    deleteProgrammingLanguage = async(id: string): Promise<boolean | null> => {
    
        const programmingLanguage = await this.repo.findOne({            
            id
        });

        if (!programmingLanguage) throw new Error('not-found-programming-language');

        await this.repo.delete(programmingLanguage);

        return true;        
    }
}