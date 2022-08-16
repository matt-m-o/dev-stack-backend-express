import { Entity } from '../core/Entity';

export type StackProgrammingLanguageAttributes = {    
    id_stack: string;
    id_programming_language: string;
    created_at?: number;
    updated_at?: number;
};

export class StackProgrammingLanguage extends Entity <StackProgrammingLanguageAttributes> {
    private constructor (attributes: StackProgrammingLanguageAttributes, id?: string) {
        super(attributes, id);
    }

    static async create (attributes: StackProgrammingLanguageAttributes, id?: string) {
        const stackProgrammingLanguage = new StackProgrammingLanguage(attributes, id);
        return stackProgrammingLanguage;
    }
}