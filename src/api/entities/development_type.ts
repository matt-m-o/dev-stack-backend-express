import { Entity } from '../core/Entity';


export type DevelopmentTypeProps = {
    name: string;
};

export class DevelopmentType extends Entity <DevelopmentTypeProps> {
    private constructor (props: DevelopmentTypeProps, id?: string) {
        super(props, id);
    }

    static create (props: DevelopmentTypeProps, id?: string) {
        const developmentType = new DevelopmentType(props, id);

        return developmentType;
    }
}