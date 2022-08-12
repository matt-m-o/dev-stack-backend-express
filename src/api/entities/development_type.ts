import { Entity } from '../core/Entity';


export type DevelopmentTypeAttributes = {
    name: string;
    created_at?: number;
    updated_at?: number;
};

export class DevelopmentType extends Entity <DevelopmentTypeAttributes> {
    private constructor (attributes: DevelopmentTypeAttributes, id?: string) {
        super(attributes, id);
    }

    static create (attributes: DevelopmentTypeAttributes, id?: string) {
        const developmentType = new DevelopmentType(attributes, id);
        return developmentType;
    }
}