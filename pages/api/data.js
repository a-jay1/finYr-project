// pages/api/movies.js
import { MongoClient } from "mongodb";

const URI = "mongodb+srv://ajayalagesan:<password>@cluster0.ibdbll2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const options = {};

export default async function handler(req, res) {
  try {
    if (!URI) {
      throw new Error("No URI specified");
    }

    let client = new MongoClient(URI, options);
    await client.connect();

    const db = client.db("patient");
    const collection = db.collection("login");

    const movies = await collection.find().toArray();

    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Error fetching movies" });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
