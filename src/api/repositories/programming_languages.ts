import { collectionHelper } from "../database/firestore/helper";
import { DocumentSnapshot, QueryDocumentSnapshot, Timestamp } from 'firebase-admin/firestore';
import { QueryToolFirebase, FindAllConditionFirebase } from "../database/firestore/queryTools";
import { FindAllCondition } from "../core/Repository";
import { IRepository } from "../core/Repository";
import { ProgrammingLanguage, ProgrammingLanguageAttributes } from "../entities/programming_language";

export class ProgrammingLanguagesRepository implements IRepository <ProgrammingLanguage> {
    private collection = collectionHelper<ProgrammingLanguageAttributes>('programming_languages');
    private queryTool = new QueryToolFirebase<ProgrammingLanguageAttributes>(this.collection);


    async create(entity: ProgrammingLanguage) {        

        const { created_at } = entity.attributes;

        const docRef = this.collection.doc(entity.id);

        await docRef.set({
            ...entity.attributes,
            created_at: created_at ? Timestamp.fromMillis(created_at) : Timestamp.now(),            
        });

        return entity;
    }

    async update(entity: ProgrammingLanguage) {        

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

    async findOne(data: any): Promise<ProgrammingLanguage | null> {
        let doc: DocumentSnapshot | QueryDocumentSnapshot | null = null;


        if (data?.id) {
            doc = await this.queryTool.findByID(data.id);
        }
        else {
            doc = await this.queryTool.findOne(data);
        }

        if (!doc) return null;        

        const programmingLanguage = await this.convertToEntity(doc.data(), doc.id);
        
        return programmingLanguage;
    }

    async findAll(fieldPath: string, opStr: string, value: any): Promise<ProgrammingLanguage[]>;
    async findAll(conditions?: FindAllCondition[] ): Promise<ProgrammingLanguage[]>
    async findAll(arg1?: FindAllCondition[] | string, opStr?: string, value?: any ): Promise<ProgrammingLanguage[]> {
        
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

        const programmingLanguages: ProgrammingLanguage[] = [];

        for (const doc of docs) {
            const data = doc.data();
            const id = doc.id;

            if (data && id)
               programmingLanguages.push(await this.convertToEntity(data, id));
        }

        return programmingLanguages;
    }

    async delete(entity: ProgrammingLanguage): Promise<void> {        
        await this.queryTool.delete(entity.id);
    }
    
    async convertToEntity( data: any, id?: string ): Promise<ProgrammingLanguage> {
        return await ProgrammingLanguage.create(data, id);
    }

}