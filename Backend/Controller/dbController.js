const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Abhi91:isitreallythathardseriously124@atlascluster.0jb1kvd.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"; // Replace with your MongoDB Atlas connection string

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas!");

    } finally {
        await client.close();
    }
}

run().catch(console.dir);
