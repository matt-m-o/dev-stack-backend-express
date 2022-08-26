import { WithFieldValue, QueryDocumentSnapshot, Timestamp } from 'firebase-admin/firestore';
import { firestoreDB } from '..'

// When calling '.data()' the '_fieldsProto' is going to be casted as <T>
const converter = <T>() => ({
    toFirestore: (data: WithFieldValue<T>) => {
        //console.log(data);
        return data as Partial<T>;
    },
    fromFirestore: (snap: QueryDocumentSnapshot) => {
        const data = snap.data();        

        if (data?.created_at) data.created_at = data.created_at.toDate().getTime();
        if (data?.updated_at) data.updated_at = data.updated_at.toDate().getTime();

        return data as T;
    },
});


export const collectionHelper = <T>(collectionPath: string) => firestoreDB.collection(collectionPath).withConverter(converter<T>());