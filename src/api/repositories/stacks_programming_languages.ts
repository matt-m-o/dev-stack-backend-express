import { collectionHelper } from "../database/firestore/helper";
import { DocumentSnapshot, QueryDocumentSnapshot, Timestamp } from 'firebase-admin/firestore';
import { QueryToolFirebase, FindAllConditionFirebase } from "../database/firestore/queryTools";
import { FindAllCondition } from "../core/Repository";
import { IRepository } from "../core/Repository";
import { StackProgrammingLanguage, StackProgrammingLanguageAttributes } from "../entities/stack_programming_language";

export class StacksProgrammingLanguagesRepository implements IRepository <StackProgrammingLanguage> {
    private collection = collectionHelper<StackProgrammingLanguageAttributes>('stacks_programming_languages');
    private queryTool = new QueryToolFirebase<StackProgrammingLanguageAttributes>(this.collection);


    async create(entity: StackProgrammingLanguage) {

        const { created_at } = entity.attributes;

        const docRef = this.collection.doc(entity.id);

        await docRef.set({
            ...entity.attributes,
            created_at: created_at ? Timestamp.fromMillis(created_at) : Timestamp.now(),
        });

        return entity;
    }

    async update(entity: StackProgrammingLanguage) {

        const { created_at } = entity.attributes;

        const docRef = this.collection.doc(entity.id);
        const attributes = {
            ...entity.attributes,
            created_at:  created_at ? Timestamp.fromMillis(created_at) : Timestamp.now(),
            updated_at:  Timestamp.now(),
        };
        await docRef.set(attributes);

        return entity;
    }

    async findOne(data: any): Promise<StackProgrammingLanguage | null> {
        let doc: DocumentSnapshot | QueryDocumentSnapshot | null = null;


        if (data?.id) {
            doc = await this.queryTool.findByID(data.id);
        }
        else {
            doc = await this.queryTool.findOne(data);
        }

        if (!doc) return null;        

        const stackProgrammingLanguage = await this.convertToEntity(doc.data(), doc.id);
        
        return stackProgrammingLanguage;
    }

    async findAll(fieldPath: string, opStr: string, value: any): Promise<StackProgrammingLanguage[]>;
    async findAll(conditions?: FindAllCondition[] ): Promise<StackProgrammingLanguage[]>
    async findAll(arg1?: FindAllCondition[] | string, opStr?: string, value?: any ): Promise<StackProgrammingLanguage[]> {
        
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

        const stackProgrammingLanguage: StackProgrammingLanguage[] = [];

        for (const doc of docs) {
            const data = doc.data();
            const id = doc.id;

            if (data && id)
                stackProgrammingLanguage.push(await this.convertToEntity(data, id));
        }

        return stackProgrammingLanguage;
    }

    async delete(entity: StackProgrammingLanguage): Promise<void> {
        await this.queryTool.delete(entity.id);
    }
    
    async convertToEntity( data: any, id?: string ): Promise<StackProgrammingLanguage> {
        return await StackProgrammingLanguage.create(data, id);
    }

}