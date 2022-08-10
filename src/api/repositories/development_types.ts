import { collectionHelper } from "../database/firestore/helper";
import { DocumentSnapshot, QueryDocumentSnapshot, Timestamp } from 'firebase-admin/firestore';
import { QueryToolFirebase, FindAllConditionFirebase } from "../database/firestore/queryTools";
import { FindAllCondition } from "../core/Repository";
import { IRepository } from "../core/Repository";
import { DevelopmentType, DevelopmentTypeProps } from "../entities/development_type";

export class DevelopmentTypesRepository implements IRepository <DevelopmentType> {
    private collection = collectionHelper<DevelopmentTypeProps>('development_types');
    private queryTool = new QueryToolFirebase<DevelopmentTypeProps>(this.collection);

    async create(entity: DevelopmentType) {
        const idExists = await this.findOne({id: entity.id});
        const nameExists = await this.findOne({name: entity.props.name});

        if (idExists || nameExists) throw new Error("duplicated-development-type");

        const { created_at } = entity.props;

        const docRef = this.collection.doc(entity.id);

        await docRef.set({
            ...entity.props,
            created_at: created_at ? Timestamp.fromMillis(created_at) : Timestamp.now(),
        });

        return entity;
    }

    async update(entity:DevelopmentType) {
        const developmentTypeExists = await this.findOne({id: entity.id});

        if (!developmentTypeExists) throw new Error("development-type-not-found");        

        const { created_at } = entity.props;

        const docRef = this.collection.doc(entity.id);
        const props = {
            ...entity.props,
            created_at:  created_at ? Timestamp.fromMillis(created_at) : created_at,
            updated_at:  Timestamp.now(),
        }
        await docRef.set(props);

        return entity;
    }

    async findOne(data: any): Promise<DevelopmentType | null> {
        let doc: DocumentSnapshot | QueryDocumentSnapshot | null = null;


        if (data?.id) {
            doc = await this.queryTool.findByID(data.id);
        }
        else {
            doc = await this.queryTool.findOne(data);
        }

        if (!doc) return null;        

        const developmentType = await this.convertToEntity(doc.data(), doc.id);
        
        return developmentType;
    }

    async findAll(fieldPath: string, opStr: string, value: any): Promise<DevelopmentType[]>;
    async findAll(conditions: FindAllCondition[] ): Promise<DevelopmentType[]>
    async findAll(arg1: FindAllCondition[] | string, opStr?: string, value?: any ): Promise<DevelopmentType[]> { // Promise<DevelopmentType[]>
        
        let conditions: FindAllCondition[] = [];
        let fieldPath: string = '';

        if (typeof arg1 !== 'string') conditions = arg1;
        else fieldPath = arg1;

        if (fieldPath && opStr && value) {
            conditions.push(
                { fieldPath, opStr, value } 
            );
        }

        const docs = await this.queryTool.findAll(conditions as FindAllConditionFirebase[]);

        const developmentTypes: DevelopmentType[] = [];

        for (const doc of docs) {
            const data = doc.data();
            const id = doc.id;

            if (data && id)
               developmentTypes.push(await this.convertToEntity(data, id));
        }

        return developmentTypes;
    }

    async delete(entity: DevelopmentType, checkExistence = true): Promise<boolean> {
        let exists: DevelopmentType | null = null;

        if (checkExistence)
            exists = await this.findOne(entity);

        if (exists || !checkExistence)
            await this.queryTool.delete(entity.id);
                                
        return exists != null;
    }
    
    async convertToEntity( data: any, id?: string ): Promise<DevelopmentType> {
        return await DevelopmentType.create(data, id);
    }

}