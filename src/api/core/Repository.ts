export type FindAllCondition = {
    fieldPath: string;
    opStr: string;
    value: any;
}

export interface IRepository <T> {
    create( entity: T ): Promise <T>;
    update( entity: T ): Promise <T>;

    findOne( data: any ): Promise <T|null>;

    findAll( fieldPath: string, opStr: string, value: any ): Promise <T[]>;
    findAll( conditions: FindAllCondition[], opStr?: string, value?: any ): Promise <T[]>;

    delete( entity: T, checkExistence?: boolean ): Promise <boolean>;

    convertToEntity( data: any, id: string ): Promise <T>;
}