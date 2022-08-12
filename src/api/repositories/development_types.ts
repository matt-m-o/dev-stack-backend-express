import { collectionHelper } from "../database/firestore/helper";
import { DocumentSnapshot, QueryDocumentSnapshot, Timestamp } from 'firebase-admin/firestore';
import { QueryToolFirebase, FindAllConditionFirebase } from "../database/firestore/queryTools";
import { FindAllCondition } from "../core/Repository";
import { IRepository } from "../core/Repository";
import { DevelopmentType, DevelopmentTypeattributes } from "../entities/development_type";

export class DevelopmentTypesRepository implements IRepository <DevelopmentType> {
    private collection = collectionHelper<DevelopmentTypeattributes>('development_types');
    private queryTool = new QueryToolFirebase<DevelopmentTypeattributes>(this.collection);


    async create(entity: DevelopmentType) {

        const { created_at } = entity.attributes;

        const docRef = this.collection.doc(entity.id);

        await docRef.set({
            ...entity.attributes,
            created_at: created_at ? Timestamp.fromMillis(created_at) : Timestamp.now(),
        });

        return entity;
    }

    async update(entity:DevelopmentType) {
    
        const { created_at } = entity.attributes;

        const docRef = this.collection.doc(entity.id);
        const attributes = {
            ...entity.attributes,
            created_at:  created_at ? Timestamp.fromMillis(created_at) : created_at,
            updated_at:  Timestamp.now(),
        }
        await docRef.set(attributes);

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
    async findAll(conditions?: FindAllCondition[] ): Promise<DevelopmentType[]>
    async findAll(arg1?: FindAllCondition[] | string, opStr?: string, value?: any ): Promise<DevelopmentType[]> { // Promise<DevelopmentType[]>
        
        let conditions: FindAllCondition[] = [];
        let fieldPath: string = '';
                
        
        if(arg1) {
            if (arg1 && typeof arg1 !== 'string' )
                conditions = arg1;
                
            else fieldPath = arg1;
        }
        
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

    async delete(entity: DevelopmentType): Promise<void> {               
        await this.queryTool.delete(entity.id);
    }
    
    async convertToEntity( data: any, id?: string ): Promise<DevelopmentType> {
        return await DevelopmentType.create(data, id);
    }

}