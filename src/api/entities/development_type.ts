import { Entity } from '../core/Entity';


export type DevelopmentTypeattributes = {
    name: string;
    created_at?: number;
    updated_at?: number;
};

export class DevelopmentType extends Entity <DevelopmentTypeattributes> {
    private constructor (attributes: DevelopmentTypeattributes, id?: string) {
        super(attributes, id);
    }

    static create (attributes: DevelopmentTypeattributes, id?: string) {
        const developmentType = new DevelopmentType(attributes, id);
        return developmentType;
    }
}