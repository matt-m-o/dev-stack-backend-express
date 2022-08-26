import { Entity } from '../core/Entity';


export type ProgrammingLanguageAttributes = {    
    name: string;
    full_name?: string;
    created_at?: number;
    updated_at?: number;
};

export class ProgrammingLanguage extends Entity <ProgrammingLanguageAttributes> {
    private constructor (attributes: ProgrammingLanguageAttributes, id?: string) {
        super(attributes, id);
    }

    static create (attributes: ProgrammingLanguageAttributes, id?: string) {
        const programmingLanguage = new ProgrammingLanguage(attributes, id);

        if (!attributes.full_name) {
            programmingLanguage.attributes.full_name = attributes.name;
        }

        return programmingLanguage;
    }
}