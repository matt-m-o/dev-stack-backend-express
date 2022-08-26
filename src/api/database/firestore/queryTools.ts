import { CollectionReference, DocumentSnapshot, FieldPath, Query, QueryDocumentSnapshot, Timestamp, WhereFilterOp } from 'firebase-admin/firestore';


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
            let target;

            if (!query) target = this.collection;
            else target = query;

            query = target.where(
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

    async findAll (findAllConditions?: FindAllConditionFirebase[]) {        
        let docs: QueryDocumentSnapshot<T>[] = [];

        let query: Query<T> | null = null;


        if (findAllConditions) {
            for ( const { fieldPath, opStr, value } of findAllConditions ) {                                
                let _fieldPath: any = null;                

                if (fieldPath === 'id') {
                    _fieldPath = FieldPath.documentId()
                }

                let target;

                if (!query) target = this.collection;
                else target = query;

                if (_fieldPath)
                    query = target.where( _fieldPath, opStr, value );
                else
                    query = target.where( fieldPath, opStr, value );
            }
        }
          
                    
        if (query !== null) {
            const querySnapshot = await query.get()

            if (querySnapshot.docs.length > 0)
                docs = querySnapshot.docs;
        }
        else {
            docs = (await this.collection.get()).docs;
        }

        return docs;
    }

    async delete (id: string) {        
        return await this.collection.doc(id).delete();
    }
}