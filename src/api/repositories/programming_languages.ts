import { collectionHelper } from "../database/firestore/helper";
import { DocumentSnapshot, QueryDocumentSnapshot, Timestamp } from 'firebase-admin/firestore';
import { QueryToolFirebase, FindAllConditionFirebase } from "../database/firestore/queryTools";
import { FindAllCondition } from "../core/Repository";
import { IRepository } from "../core/Repository";
import { ProgrammingLanguage, ProgrammingLanguageProps } from "../entities/programming_language";


export class ProgrammingLanguagesRepository implements IRepository <ProgrammingLanguage> {
    private collection = collectionHelper<ProgrammingLanguageProps>('programming_languages');
    private queryTool = new QueryToolFirebase<ProgrammingLanguageProps>(this.collection);

    async create(entity: ProgrammingLanguage) {
        const idExists = await this.findOne({id: entity.id});
        const nameExists = await this.findOne({id: entity.props.name});

        if (idExists || nameExists) throw new Error("duplicated-programming-language");

        const { created_at } = entity.props;

        const docRef = this.collection.doc(entity.id);

        await docRef.set({
            ...entity.props,
            created_at: created_at ? Timestamp.fromMillis(created_at) : Timestamp.now(),
        });

        return entity;
    }

    async update(entity: ProgrammingLanguage) {
        const programmingLanguageExists = await this.findOne({id: entity.id});

        if (!programmingLanguageExists) throw new Error("programming-language-not-found");        

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
    async findAll(conditions: FindAllCondition[] ): Promise<ProgrammingLanguage[]>
    async findAll(arg1: FindAllCondition[] | string, opStr?: string, value?: any ): Promise<ProgrammingLanguage[]> {
        
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

        const programmingLanguages: ProgrammingLanguage[] = [];

        for (const doc of docs) {
            const data = doc.data();
            const id = doc.id;

            if (data && id)
               programmingLanguages.push(await this.convertToEntity(data, id));
        }

        return programmingLanguages;
    }
    
    async convertToEntity( data: any, id?: string ): Promise<ProgrammingLanguage> {
        return await ProgrammingLanguage.create(data, id);
    }

}

