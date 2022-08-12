import { DevelopmentType } from "../entities/development_type";
import { DevelopmentTypesRepository } from "../repositories/development_types";

type DevelopmentTypeCreateParams = { name: string; }

type DevelopmentTypeUpdateParams = {
    id: string;
    name?: string; 
}

type DevelopmentTypeGetParams = {
    id: string;
    name?: string;
}

export class DevelopmentTypesServices {

    private repository: DevelopmentTypesRepository; // TODO: Replace by interface " IDevelopmentTypesRepository "

    constructor (repo?: DevelopmentTypesRepository) {
        if (repo) 
            this.repository = repo;
        else 
            this.repository = new DevelopmentTypesRepository();
    }    


    createDevelopmentType = async ({ name }: DevelopmentTypeCreateParams): Promise<DevelopmentType> => {        
        
        const exists = await this.repository.findOne({ name });

        if (exists != null) throw new Error("duplicated-development-type");        

        const developmentType = await DevelopmentType.create({
            name
        });        

        await this.repository.create(developmentType);

        return developmentType;        
    }


    updateDevelopmentType = async({ id, name }: DevelopmentTypeUpdateParams): Promise<DevelopmentType> => {
    
        const developmentType = await this.repository.findOne({            
            id,
        });
        
        if (!developmentType) throw new Error('not-found-development-type');
        
        
        if (name) developmentType.attributes.name = name;
        

        await this.repository.update(developmentType);

        return developmentType;        
    }


    getDevelopmentType = async({ id }: DevelopmentTypeGetParams): Promise<DevelopmentType | null> => {
    
        const developmentType = await this.repository.findOne({            
            id
        });

        return developmentType;        
    }

    getAllDevelopmentTypes = async (): Promise<DevelopmentType[] | null> => {
    
        const developmentTypes = await this.repository.findAll();

        return developmentTypes;        
    }


    deleteDevelopmentType = async(id: string): Promise<boolean | null> => {
    
        const developmentType = await this.repository.findOne({            
            id
        });

        if (!developmentType) throw new Error('not-found-development-type');

        await this.repository.delete(developmentType);

        return true;        
    }
}