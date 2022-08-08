import { CollectionReference, DocumentSnapshot, Query, QueryDocumentSnapshot, Timestamp, WhereFilterOp } from 'firebase-admin/firestore';


export type FindAllConditionFirebase = {
    fieldPath: string;
    opStr: WhereFilterOp;
    value: any;
}


export class QueryToolFirebase <T> {
    readonly collection;

    constructor(collection: CollectionReference<T>) {
        this.collection = collection;
    }

    async findByID (id: string) {
        const doc = await this.collection.doc(id).get();

        if (!doc.data()) return null

        return doc;
    }

    async findOne (data: T) {
        const entries = Object.entries(data as unknown as {key: string, value: any});

        let doc: DocumentSnapshot | QueryDocumentSnapshot<T> | null = null;

        let query: Query<T> | null = null;

        for (const [key, value] of entries) {
            query = this.collection.where(
                key, '==', value
            );
        }            
                    
        if (query !== null) {
            const querySnapshot = await query.get()

            if (querySnapshot.docs.length > 0)
                doc = querySnapshot.docs[0];
        }        

        return doc;
    }

    async findAll (findAllConditions: FindAllConditionFirebase[]) {        
        let docs: QueryDocumentSnapshot<T>[] = [];

        let query: Query<T> | null = null;


        for ( const {fieldPath, opStr, value} of findAllConditions ) {
            query = this.collection.where(
                fieldPath, opStr, value
            );
        }      
                    
        if (query !== null) {
            const querySnapshot = await query.get()

            if (querySnapshot.docs.length > 0)
                docs = querySnapshot.docs;
        }        

        return docs;
    }
}