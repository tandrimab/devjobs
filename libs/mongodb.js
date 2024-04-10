// import mongoose from "mongoose";

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log("Connected to MongoDB");
//     } catch(error) {
//         console.log(error);
//     }
// };

// export default connectDB;

import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI;
const options = {}

if (!URI) throw new Error("Please add your mongodb URI");

let client = new MongoClient(URI, options);
let clientPromise;

if (process.env.NODE_ENV !== 'production') {
    if (!global._mongoClientPromise) {
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    clientPromise = client.connect();
}

export default clientPromise;