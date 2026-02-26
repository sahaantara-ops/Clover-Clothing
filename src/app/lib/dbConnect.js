import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbname = process.env.DBNAME;


export const Collections = {
  PRODUCTS: "products",
};

let client;
let clientPromise;

if (!uri) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export const dbConnect = async (collectionName) => {
  const connectedClient = await clientPromise;
  return connectedClient.db(dbname).collection(collectionName);
};