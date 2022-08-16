import { collectionHelper } from "../database/firestore/helper";
import { DocumentSnapshot, QueryDocumentSnapshot, Timestamp } from 'firebase-admin/firestore';
import { QueryToolFirebase, FindAllConditionFirebase } from "../database/firestore/queryTools";
import { FindAllCondition } from "../core/Repository";
import { IRepository } from "../core/Repository";
import { Stack, StackAttributes } from "../entities/stack";

export class StacksRepository implements IRepository <Stack> {
    private collection = collectionHelper<StackAttributes>('stacks');
    private queryTool = new QueryToolFirebase<StackAttributes>(this.collection);


    async create(entity: Stack) {        

        const { created_at } = entity.attributes;

        const docRef = this.collection.doc(entity.id);

        await docRef.set({
            ...entity.attributes,
            created_at: created_at ? Timestamp.fromMillis(created_at) : Timestamp.now(),
        });

        return entity;
    }

    async update(entity: Stack) {        

        const { created_at } = entity.attributes;

        const docRef = this.collection.doc(entity.id);
        const attributes = {
            ...entity.attributes,
            created_at:  created_at ? Timestamp.fromMillis(created_at) : Timestamp.now(),
            updated_at:  Timestamp.now(),
        }
        await docRef.set(attributes);

        return entity;
    }

    async findOne(data: any): Promise<Stack | null> {
        let doc: DocumentSnapshot | QueryDocumentSnapshot | null = null;
        

        if (data?.id) {
            doc = await this.queryTool.findByID(data.id);
        }
        else {
            doc = await this.queryTool.findOne(data);
        }

        if (!doc) return null;        

        const stack = await this.convertToEntity(doc.data(), doc.id);
        
        return stack;
    }

    async findAll(fieldPath: string, opStr: string, value: any): Promise<Stack[]>;
    async findAll(conditions?: FindAllCondition[] ): Promise<Stack[]>
    async findAll(arg1?: FindAllCondition[] | string, opStr?: string, value?: any ): Promise<Stack[]> {
        
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

        const stack: Stack[] = [];

        for (const doc of docs) {
            const data = doc.data();
            const id = doc.id;

            if (data && id)
               stack.push(await this.convertToEntity(data, id));
        }

        return stack;
    }

    async delete(entity: Stack): Promise<void> {        
        await this.queryTool.delete(entity.id);
    }
    
    async convertToEntity( data: any, id?: string ): Promise<Stack> {
        return await Stack.create(data, id);
    }

}