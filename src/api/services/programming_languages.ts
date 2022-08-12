import { ProgrammingLanguage } from "../entities/programming_language";
import { ProgrammingLanguagesRepository } from "../repositories/programming_languages";


type ProgrammingLanguageCreateParams = {
    name: string;
    full_name?: string;
}

type ProgrammingLanguageUpdateParams = {
    id: string;
    name?: string; 
    full_name?: string
}

type ProgrammingLanguageGetParams = {
    id: string;
    name?: string;
    full_name?: string
}

export class ProgrammingLanguagesServices {

    private repository: ProgrammingLanguagesRepository;

    constructor (repo?: ProgrammingLanguagesRepository) {
        if (repo) 
            this.repository = repo;
        else 
            this.repository = new ProgrammingLanguagesRepository();
    }    


    createProgrammingLanguage = async ({ name, full_name }: ProgrammingLanguageCreateParams): Promise<ProgrammingLanguage> => {        
        
        const exists = await this.repository.findOne({ name });

        if (exists != null) throw new Error("duplicated-programming-language");        

        const programmingLanguage = await ProgrammingLanguage.create({
            name,
            full_name,
        });        

        await this.repository.create(programmingLanguage);

        return programmingLanguage;        
    }


    updateProgrammingLanguage = async({ id, name, full_name }: ProgrammingLanguageUpdateParams): Promise<ProgrammingLanguage> => {
    
        const programmingLanguage = await this.repository.findOne({            
            id,
        });
        
        if (!programmingLanguage) throw new Error('not-found-programming-language');


        if (name) programmingLanguage.attributes.name = name;

        if (full_name) programmingLanguage.attributes.full_name = full_name;
                        

        await this.repository.update(programmingLanguage);

        return programmingLanguage;        
    }


    getProgrammingLanguage = async({ id }: ProgrammingLanguageGetParams): Promise<ProgrammingLanguage | null> => {
    
        const programmingLanguage = await this.repository.findOne({            
            id
        });

        return programmingLanguage;        
    }

    getAllProgrammingLanguages = async (): Promise<ProgrammingLanguage[] | null> => {
    
        const programmingLanguages = await this.repository.findAll();

        return programmingLanguages;        
    }


    deleteProgrammingLanguage = async(id: string): Promise<boolean | null> => {
    
        const programmingLanguage = await this.repository.findOne({            
            id
        });

        if (!programmingLanguage) throw new Error('not-found-programming-language');

        await this.repository.delete(programmingLanguage);

        return true;        
    }
}