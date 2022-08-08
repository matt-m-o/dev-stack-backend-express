import { v4 } from 'uuid'

export abstract class Entity<T> {
    readonly id: string;
    public props: T;

    constructor (props: T, id?: string) {
        this.props = props;
        this.id = id ?? v4();
    }
}