
const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');


const uri = "mongodb+srv://Abhi91:Mk7V4un2CKnKSMu0@atlascluster.0jb1kvd.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";


const client = new MongoClient(uri);


const app = express();


app.use(cors());


async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}


app.get('/', (req, res) => {
    res.send('Backend is running smoothly');
});


app.get('/sample', async (req, res) => {
    try {
        const database = client.db("ShopNote");
        const collection = database.collection("sample");
        const data = await collection.find({}).toArray();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



async function startServer() {
    await connectToDatabase();
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}


startServer().catch(console.error);
