import { Entity } from '../core/Entity';


type ProgrammingLanguageProps = {    
    name: string;
    full_name?: string;
    created_at?: number;
    updated_at?: number;
};

export class ProgrammingLanguage extends Entity <ProgrammingLanguageProps> {
    private constructor (props: ProgrammingLanguageProps, id?: string) {
        super(props, id);
    }

    static create (props: ProgrammingLanguageProps, id?: string) {
        const programmingLanguage = new ProgrammingLanguage(props, id);

        if (!props.full_name) {
            programmingLanguage.props.full_name = props.name;
        }

        return programmingLanguage;
    }
}