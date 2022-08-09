import { collectionHelper } from "../database/firestore/helper";
import { DocumentSnapshot, QueryDocumentSnapshot, Timestamp } from 'firebase-admin/firestore';
import { QueryToolFirebase, FindAllConditionFirebase } from "../database/firestore/queryTools";
import { FindAllCondition } from "../core/Repository";
import { IRepository } from "../core/Repository";
import { UserDevelopmentType, UserDevelopmentTypeProps } from "../entities/user_development_type";


export class UsersDevelopmentTypesRepository implements IRepository <UserDevelopmentType> {
    private collection = collectionHelper<UserDevelopmentTypeProps>('users_development_types');
    private queryTool = new QueryToolFirebase<UserDevelopmentTypeProps>(this.collection);

    async create(entity: UserDevelopmentType) {
        const idExists = await this.findOne({id: entity.id});

        const { id_user, id_development_type } = entity.props;

        const exists = await this.findOne({
            id_user,
            id_development_type
        });

        if (idExists && exists) throw new Error("duplicated-users-users-development-type");

        const { created_at } = entity.props;

        const docRef = this.collection.doc(entity.id);

        await docRef.set({
            ...entity.props,
            created_at: created_at ? Timestamp.fromMillis(created_at) : Timestamp.now(),
        });

        return entity;
    }

    async update(entity: UserDevelopmentType) {
        const userDevelopmentTypeExists = await this.findOne({id: entity.id});

        if (!userDevelopmentTypeExists) throw new Error("users-development-type-not-found");        

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
    async findAll(conditions: FindAllCondition[] ): Promise<UserDevelopmentType[]>
    async findAll(arg1: FindAllCondition[] | string, opStr?: string, value?: any ): Promise<UserDevelopmentType[]> {
        
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

        const userDevelopmentType: UserDevelopmentType[] = [];

        for (const doc of docs) {
            const data = doc.data();
            const id = doc.id;

            if (data && id)
               userDevelopmentType.push(await this.convertToEntity(data, id));
        }

        return userDevelopmentType;
    }
    
    async convertToEntity( data: any, id?: string ): Promise<UserDevelopmentType> {
        return await UserDevelopmentType.create(data, id);
    }

}