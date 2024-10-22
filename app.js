import express from "express";
import db from "./config.js"; // Import Firestore instance
import {
  collection,
  addDoc,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  query,
  where,
} from "firebase/firestore"; // Import Firestore functions
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to add a new user document
app.post("/users/create", async (req, res) => {
  try {
    const { name, email } = req.body;

    const q = query(collection(db, "user"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // If the user with this email already exists, return an error
      return res
        .status(400)
        .json({ message: "A user with this email already exists." });
    }

    const docRef = await addDoc(collection(db, "user"), {
      name,
      email,
      createdAt: Timestamp.now(),
    });

    res
      .status(201)
      .json({ message: "User created successfully", userId: docRef.id });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).json({ error: "Error adding document" });
  }
});

// Route to get all user documents
app.get("/users/get", async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "user"));
    const usersList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt
        ? doc.data().createdAt.toDate().toString()
        : null,
    }));

    res.status(200).json(usersList);
  } catch (error) {
    console.error("Error retrieving documents: ", error);
    res.status(500).json({ error: "Error retrieving documents" });
  }
});

// Route to get a single user by ID
app.get("/users/get/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const userDocRef = doc(db, "user", userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return res
        .status(404)
        .json({ error: `No user found with ID: ${userId}` });
    }

    res.status(200).json({ id: userDoc.id, ...userDoc.data() });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Error fetching user" });
  }
});

// Update user info by ID
app.put("/users/update/:id", async (req, res) => {
  const userId = req.params.id;
  const userUpdates = req.body;

  try {
    const userDocRef = doc(db, "user", userId);
    await updateDoc(userDocRef, userUpdates);

    res
      .status(200)
      .json({ message: `User with ID ${userId} updated successfully` });
  } catch (error) {
    console.error("Error updating document: ", error);
    res.status(500).json({ error: "Error updating document" });
  }
});

// Delete user by ID
app.delete("/users/delete/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const userDocRef = doc(db, "user", userId);
    await deleteDoc(userDocRef);

    res
      .status(200)
      .json({ message: `User with ID ${userId} deleted successfully` });
  } catch (error) {
    console.error("Error deleting document: ", error);
    res.status(500).json({ error: "Error deleting document" });
  }
});

// Start the server
app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
