import { v4 } from 'uuid'

export abstract class Entity<T> {
    readonly id: string;
    public attributes: T;    

    constructor (attributes: T, id?: string) {
        this.attributes = attributes;
        this.id = id ?? v4();        
    }
}