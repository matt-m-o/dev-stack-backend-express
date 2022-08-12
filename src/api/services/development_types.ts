import { DevelopmentType } from "../entities/development_type";
import { DevelopmentTypesRepository } from "../repositories/development_types";

type DevelopmentTypeCreateParams = { name: string; }

type DevelopmentTypeUpdateParams = {
    id?: string;
    name?: string; 
}

type DevelopmentTypeGetParams = {
    id?: string;
    name?: string;
}

export class DevelopmentTypesServices {

    private developmentTypesRepository: DevelopmentTypesRepository; // TODO: Replace by interface " IDevelopmentTypesRepository "

    constructor (repo?: DevelopmentTypesRepository) {
        if (repo) 
            this.developmentTypesRepository = repo;
        else 
            this.developmentTypesRepository = new DevelopmentTypesRepository();
    }    


    createDevelopmentType = async ({ name }: DevelopmentTypeCreateParams): Promise<DevelopmentType> => {        
        
        const exists = await this.developmentTypesRepository.findOne({ name });

        if (exists != null) throw new Error("duplicated-development-type");

        console.log(name)

        const developmentType = await DevelopmentType.create({
            name
        });

        console.log(developmentType);

        await this.developmentTypesRepository.create(developmentType);

        return developmentType;        
    }


    updateDevelopmentType = async({ id, name }: DevelopmentTypeUpdateParams): Promise<DevelopmentType> => {
    
        const developmentType = await this.developmentTypesRepository.findOne({            
            id,
        });
        
        if (!developmentType) throw new Error('development-type-not-found');
        
        developmentType.attributes.name = name ? name : developmentType.attributes.name;

        await this.developmentTypesRepository.update(developmentType);

        return developmentType;        
    }


    getDevelopmentType = async({ id }: DevelopmentTypeGetParams): Promise<DevelopmentType | null> => {
    
        const developmentType = await this.developmentTypesRepository.findOne({            
            id
        });

        return developmentType;
        
    }

    getAllDevelopmentTypes = async (): Promise<DevelopmentType[] | null> => {
    
        const developmentTypes = await this.developmentTypesRepository.findAll();

        return developmentTypes;
        
    }


    deleteDevelopmentType = async(id: string): Promise<boolean | null> => {
    
        const developmentType = await this.developmentTypesRepository.findOne({            
            id
        });

        if (!developmentType) throw new Error('development-type-not-found');

        await this.developmentTypesRepository.delete(developmentType);

        return true;        
    }
}