import { Entity } from '../core/Entity';

export type StackAttributes = {    
    id_user: string;
    id_development_type: string;
    created_at?: number;
    updated_at?: number;
};

export class Stack extends Entity <StackAttributes> {
    private constructor (attributes: StackAttributes, id?: string) {
        super(attributes, id);
    }

    static async create (attributes: StackAttributes, id?: string) {
        const techStack = new Stack(attributes, id);        
        return techStack;
    }
}