import { initializeApp, applicationDefault, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore} from 'firebase-admin/firestore';


const {
    FIREBASE_PROJECT_ID,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_TOKEN_URI,
    FIREBASE_DATABASE_URL
} = process.env;

const serviceAccount : Partial<ServiceAccount> = {
    projectId: FIREBASE_PROJECT_ID,
    privateKey: FIREBASE_PRIVATE_KEY ? FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
    clientEmail: FIREBASE_CLIENT_EMAIL,  
}

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: FIREBASE_DATABASE_URL,
});

export const firestoreDB = getFirestore();

firestoreDB.settings({ ignoreUndefinedProperties: true })