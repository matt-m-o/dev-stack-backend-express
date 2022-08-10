import { collectionHelper } from "../database/firestore/helper";
import { DocumentSnapshot, QueryDocumentSnapshot, Timestamp } from 'firebase-admin/firestore';
import { QueryToolFirebase, FindAllConditionFirebase } from "../database/firestore/queryTools";
import { FindAllCondition } from "../core/Repository";
import { IRepository } from "../core/Repository";
import { UserProgrammingLanguage, UserProgrammingLanguageProps } from "../entities/user_programming_language";


export class UsersProgrammingLanguagesRepository implements IRepository <UserProgrammingLanguage> {
    private collection = collectionHelper<UserProgrammingLanguageProps>('users_programming_languages');
    private queryTool = new QueryToolFirebase<UserProgrammingLanguageProps>(this.collection);

    async create(entity: UserProgrammingLanguage) {
        const idExists = await this.findOne({id: entity.id});

        const { id_user, id_programming_language } = entity.props;

        const exists = await this.findOne({
            id_user,
            id_programming_language
        });

        if (idExists && exists) throw new Error("duplicated-user-programming-language");

        const { created_at } = entity.props;

        const docRef = this.collection.doc(entity.id);

        await docRef.set({
            ...entity.props,
            created_at: created_at ? Timestamp.fromMillis(created_at) : Timestamp.now(),
        });

        return entity;
    }

    async update(entity: UserProgrammingLanguage) {
        const userProgrammingLanguageExists = await this.findOne({id: entity.id});

        if (!userProgrammingLanguageExists) throw new Error("user-programming-language-not-found");        

        const { created_at } = entity.props;

        const docRef = this.collection.doc(entity.id);
        const props = {
            ...entity.props,
            created_at:  created_at ? Timestamp.fromMillis(created_at) : created_at,
            updated_at:  Timestamp.now(),
        };

        await docRef.set(props);

        return entity;
    }

    async findOne(data: any): Promise<UserProgrammingLanguage | null> {
        let doc: DocumentSnapshot | QueryDocumentSnapshot | null = null;


        if (data?.id) {
            doc = await this.queryTool.findByID(data.id);
        }
        else {
            doc = await this.queryTool.findOne(data);
        }

        if (!doc) return null;        

        const userProgrammingLanguage = await this.convertToEntity(doc.data(), doc.id);
        
        return userProgrammingLanguage;
    }

    async findAll(fieldPath: string, opStr: string, value: any): Promise<UserProgrammingLanguage[]>;
    async findAll(conditions: FindAllCondition[] ): Promise<UserProgrammingLanguage[]>
    async findAll(arg1: FindAllCondition[] | string, opStr?: string, value?: any ): Promise<UserProgrammingLanguage[]> {
        
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

        const userProgrammingLanguage: UserProgrammingLanguage[] = [];

        for (const doc of docs) {
            const data = doc.data();
            const id = doc.id;

            if (data && id)
                userProgrammingLanguage.push(await this.convertToEntity(data, id));
        }

        return userProgrammingLanguage;
    }

    async delete(entity: UserProgrammingLanguage, checkExistence = true): Promise<boolean> {
        let exists: UserProgrammingLanguage | null = null;

        if (checkExistence)
            exists = await this.findOne(entity);

        if (exists || !checkExistence)
            await this.queryTool.delete(entity.id);
                                
        return exists != null;
    }
    
    async convertToEntity( data: any, id?: string ): Promise<UserProgrammingLanguage> {
        return await UserProgrammingLanguage.create(data, id);
    }

}