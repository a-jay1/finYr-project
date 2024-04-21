// "use server";

import { MongoClient } from "mongodb";

const URI =
  "mongodb+srv://ajayalagesan:Ajay%405510@cluster0.ujy7xqk.mongodb.net/?retryWrites=true&w=majority";
const options = { useNewUrlParser: true, useUnifiedTopology: true };

if (!URI) throw new Error("No URI specified");

let clientPromise;
try {
  let client = new MongoClient(URI, options);
  clientPromise = client.connect();
} catch (e) {
  console.error("ERRRR", e);
}

export default clientPromise;
