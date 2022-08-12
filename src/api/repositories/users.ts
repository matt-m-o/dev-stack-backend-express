import { User, UserAttributes } from "../entities/user";
import { collectionHelper } from "../database/firestore/helper";
import { DocumentSnapshot, QueryDocumentSnapshot, Timestamp } from 'firebase-admin/firestore';
import { QueryToolFirebase, FindAllConditionFirebase } from "../database/firestore/queryTools";
import { FindAllCondition } from "../core/Repository";
import { IRepository } from "../core/Repository";

export class UsersRepository implements IRepository <User> {
    private collection = collectionHelper<UserAttributes>('users');
    private queryTool = new QueryToolFirebase<UserAttributes>(this.collection);
        

    async create(entity: User) {

        const { created_at } = entity.attributes;

        const docRef = this.collection.doc(entity.id);

        await docRef.set({
            ...entity.attributes,
            created_at: created_at ? Timestamp.fromMillis(created_at) : Timestamp.now(),
        });

        return entity;
    }

    async update(entity: User) {        

        const { created_at } = entity.attributes;

        const docRef = this.collection.doc(entity.id);
        const attributes = {
            ...entity.attributes,
            created_at:  created_at ? Timestamp.fromMillis(created_at) : Timestamp.now(),
            updated_at:  Timestamp.now(),
        }
        await docRef.update(attributes);

        return entity;
    }

    async findOne(data: any): Promise<User | null> {
        let doc: DocumentSnapshot | QueryDocumentSnapshot | null = null;


        if (data?.id) {
            doc = await this.queryTool.findByID(data.id);
        }
        else {
            doc = await this.queryTool.findOne(data);
        }

        if (!doc) return null;        

        const user = await this.convertToEntity(doc.data(), doc.id);
        
        return user;
    }

    async findAll(fieldPath: string, opStr: string, value: any): Promise<User[]>;
    async findAll(conditions?: FindAllCondition[] ): Promise<User[]>
    async findAll(arg1?: FindAllCondition[] | string, opStr?: string, value?: any ): Promise<User[]> { // Promise<User[]>
        
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

        const users : User[] = [];

        for (const doc of docs) {
            const data = doc.data();
            const id = doc.id;

            if (data && id)
                users.push(await this.convertToEntity(data, id));
        }

        return users;
    }

    async delete(entity: User): Promise<void> {        
        await this.queryTool.delete(entity.id);
    }
    
    async convertToEntity( data: any, id?: string ): Promise<User> {    
        return await User.create(data, id);
    }

}