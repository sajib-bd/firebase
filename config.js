import { initializeApp } from "firebase/app"; // Import the initializeApp function from Firebase
import { getFirestore } from "firebase/firestore"; // Import Firestore functions
import dotenv from "dotenv"; // Import dotenv here if not already configured

dotenv.config(); // Load environment variables from .env file

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export default db;
