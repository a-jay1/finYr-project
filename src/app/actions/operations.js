"use server";

import clientPromise from "./connect";
import { ObjectId } from 'mongodb';

// const bcrypt = require('bcrypt');

export const insertToDB = async (data) => {
  const client = await clientPromise;
  const db = client.db("db");
  await db
    .collection("items")
    .insertOne(data)
    .then((res) => console.log("Success", res))
    .catch((err) => console.log("ERROR INSERTING", err));
};
// Function to hash passwords
const hashPassword = async (password) => {

  const saltRounds = 10;
  return password ; //bcrypt.hash(password, saltRounds);
};

// Function to compare hashed passwords
const comparePasswords = async (password, hashedPassword) => {
  return password == hashedPassword ; // bcrypt.compare(password, hashedPassword);
};

// Function to insert a user record into the database
export const signUp = async (userData) => {
  const { username, email, password } = userData;

  // Hash the password before storing it in the database
  const hashedPassword = await hashPassword(password);

  const client = await clientPromise;
  const db = client.db("db");

  const newUser = {
    username,
    email,
    password: hashedPassword, // Store hashed password
  };

  try {
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return { success: false, message: "User with this email already exists" };
    }

    const result = await db.collection("users").insertOne(newUser);
    console.log("User signed up successfully:", result.insertedId);
    return { success: true, userId: result.insertedId };
  } catch (error) {
    console.error("Error signing up:", error);
    return { success: false, error };
  }
};

// Function to validate login credentials
export const login = async (email, password) => {
  const client = await clientPromise;
  const db = client.db("db");

  try {
    // Retrieve the user record based on the provided email
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Compare the hashed password stored in the database with the provided password
    const passwordMatch = await comparePasswords(password, user.password);
    if (!passwordMatch) {
      return { success: false, message: "Invalid password" };
    }

    // Login successful
    console.log("User logged in successfully:", user._id);
    return { success: true, userId: user._id };
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, error };
  }
};


