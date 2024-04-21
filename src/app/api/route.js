import { MongoClient } from "mongodb";

const URI =
  "mongodb+srv://ajayalagesan:<password>@cluster0.ibdbll2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const options = {};

if (!URI) throw new Error("No URI specified");

let client = new MongoClient(URI, options);
let clientPromise;

if (process.env.NODE_ENV !== "production") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
