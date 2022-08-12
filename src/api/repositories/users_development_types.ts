import { collectionHelper } from "../database/firestore/helper";
import { DocumentSnapshot, QueryDocumentSnapshot, Timestamp } from 'firebase-admin/firestore';
import { QueryToolFirebase, FindAllConditionFirebase } from "../database/firestore/queryTools";
import { FindAllCondition } from "../core/Repository";
import { IRepository } from "../core/Repository";
import { UserDevelopmentType, UserDevelopmentTypeAttributes } from "../entities/user_development_type";

export class UsersDevelopmentTypesRepository implements IRepository <UserDevelopmentType> {
    private collection = collectionHelper<UserDevelopmentTypeAttributes>('users_development_types');
    private queryTool = new QueryToolFirebase<UserDevelopmentTypeAttributes>(this.collection);


    async create(entity: UserDevelopmentType) {        

        const { created_at } = entity.attributes;

        const docRef = this.collection.doc(entity.id);

        await docRef.set({
            ...entity.attributes,
            created_at: created_at ? Timestamp.fromMillis(created_at) : Timestamp.now(),
        });

        return entity;
    }

    async update(entity: UserDevelopmentType) {        

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

    async findOne(data: any): Promise<UserDevelopmentType | null> {
        let doc: DocumentSnapshot | QueryDocumentSnapshot | null = null;


        if (data?.id) {
            doc = await this.queryTool.findByID(data.id);
        }
        else {
            doc = await this.queryTool.findOne(data);
        }

        if (!doc) return null;        

        const userDevelopmentType = await this.convertToEntity(doc.data(), doc.id);
        
        return userDevelopmentType;
    }

    async findAll(fieldPath: string, opStr: string, value: any): Promise<UserDevelopmentType[]>;
    async findAll(conditions?: FindAllCondition[] ): Promise<UserDevelopmentType[]>
    async findAll(arg1?: FindAllCondition[] | string, opStr?: string, value?: any ): Promise<UserDevelopmentType[]> {
        
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

        const userDevelopmentType: UserDevelopmentType[] = [];

        for (const doc of docs) {
            const data = doc.data();
            const id = doc.id;

            if (data && id)
               userDevelopmentType.push(await this.convertToEntity(data, id));
        }

        return userDevelopmentType;
    }

    async delete(entity: UserDevelopmentType): Promise<void> {        
        await this.queryTool.delete(entity.id);
    }
    
    async convertToEntity( data: any, id?: string ): Promise<UserDevelopmentType> {
        return await UserDevelopmentType.create(data, id);
    }

}