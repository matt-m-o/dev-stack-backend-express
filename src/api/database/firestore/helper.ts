import { WithFieldValue, QueryDocumentSnapshot, Timestamp } from 'firebase-admin/firestore';
import { firestoreDB } from '..'

// When calling '.data()' the '_fieldsProto' is going to be casted as <T>
const converter = <T>() => ({
    toFirestore: (data: WithFieldValue<T>) => data as Partial<T>,
    fromFirestore: (snap: QueryDocumentSnapshot) => {
        return snap.data() as T
    },
});


export const collectionHelper = <T>(collectionPath: string) => firestoreDB.collection(collectionPath).withConverter(converter<T>());