import { User, UserProps } from "../entities/user";
import { collectionHelper } from "../database/firestore/helper";
import { DocumentSnapshot, QueryDocumentSnapshot, Timestamp } from 'firebase-admin/firestore';
import { QueryToolFirebase, FindAllConditionFirebase } from "../database/firestore/queryTools";
import { FindAllCondition } from "../core/Repository";
import { IRepository } from "../core/Repository";

export class UsersRepository implements IRepository <User> {
    private collection = collectionHelper<UserProps>('users');
    private queryTool = new QueryToolFirebase<UserProps>(this.collection);

    async create(entity: User) {
        let idExists = await this.findOne({id: entity.id});
        let emailExists = await this.findOne({email: entity.props.email});

        if (idExists || emailExists) throw new Error("duplicated-user");        

        const { created_at } = entity.props;

        const docRef = this.collection.doc(entity.id);

        await docRef.set({
            ...entity.props,
            created_at: created_at ? Timestamp.fromMillis(created_at) : Timestamp.now(),
        });

        return entity;
    }

    async update(entity: User) {
        const userExists = await this.findOne({id: entity.id});

        if (!userExists) throw new Error("user-not-found");

        const { created_at, updated_at } = entity.props;

        const docRef = this.collection.doc(entity.id);
        const props = {
            ...entity.props,
            created_at:  created_at ? Timestamp.fromMillis(created_at) : created_at,
            updated_at:  Timestamp.now(),
        }
        await docRef.set(props);

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
    async findAll(conditions: FindAllCondition[] ): Promise<User[]>
    async findAll(arg1: FindAllCondition[] | string, opStr?: string, value?: any ): Promise<User[]> { // Promise<User[]>
        
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

        const users : User[] = [];

        for (const doc of docs) {
            const data = doc.data();
            const id = doc.id;

            if (data && id)
                users.push(await this.convertToEntity(data, id));
        }

        return users;
    }
    
    async convertToEntity( data: any, id?: string ): Promise<User> {    
        return await User.create(data, id);
    }

}

