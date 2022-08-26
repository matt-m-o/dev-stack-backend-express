import { Stack } from "../entities/stack";
import { DevelopmentTypesRepository } from "../repositories/development_types";
import { StacksRepository } from "../repositories/stacks";
import { ProgrammingLanguagesRepository } from "../repositories/programming_languages";
import { StacksProgrammingLanguagesRepository } from "../repositories/stacks_programming_languages";
import { ProgrammingLanguage } from "../entities/programming_language";


/* type StackGetAllParams = {    
    id_user?: string;
} */

export class GetAllStacksService {

    private repo: StacksRepository;    
    private developmentTypesRepo: DevelopmentTypesRepository;
    private programmingLanguagesRepo: ProgrammingLanguagesRepository;

    private stackProgrammingLanguagesRepo: StacksProgrammingLanguagesRepository;

    constructor (
        repo?: StacksRepository,        
        developmentTypesRepo?: DevelopmentTypesRepository,
        programmingLanguagesRepo?: ProgrammingLanguagesRepository,

        stackProgrammingLanguagesRepo?: StacksProgrammingLanguagesRepository,
    ) {
        if (repo) this.repo = repo;
        else this.repo = new StacksRepository();

        if (developmentTypesRepo) this.developmentTypesRepo = developmentTypesRepo;
        else this.developmentTypesRepo = new DevelopmentTypesRepository();

        if (programmingLanguagesRepo) this.programmingLanguagesRepo = programmingLanguagesRepo;
        else this.programmingLanguagesRepo = new ProgrammingLanguagesRepository();


        if (stackProgrammingLanguagesRepo) this.stackProgrammingLanguagesRepo = stackProgrammingLanguagesRepo;
        else this.stackProgrammingLanguagesRepo = new StacksProgrammingLanguagesRepository();
    }    
    

    execute = async (): Promise<any[] | null> => {

        const stacks = await this.repo.findAll();
        
        const results = [];
        
        const [ allDevTypes, allProgrammingLanguages ] = await Promise.all([
            this.developmentTypesRepo.findAll(),
            this.programmingLanguagesRepo.findAll(),
        ]);

        // TODO: Optimizations
        // Getting the objects from id reference (there are better ways to do this...)
        for (const stack of stacks) {

            const devType = allDevTypes.find( devType => 
                devType.id === stack.attributes.id_development_type 
            );
            

            const stackProgrammingLanguages = await this.stackProgrammingLanguagesRepo.findAll(
                'id_stack', '==', stack.id
            );
            
            const result = stack as any;            

            const programmingLanguagesIDs = stackProgrammingLanguages.map( item  => 
                item.attributes.id_programming_language
            );            
                        
            const programmingLanguages = allProgrammingLanguages.filter( item =>
                programmingLanguagesIDs.indexOf(item.id) !== -1
            );                

            result.relationships = {
                development_type: devType,
                programming_languages: programmingLanguages
            }

            results.push(result);
        }        

        return results;
    }    
}