require('dotenv').config();
const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');
const { ObjectId } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URL);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}


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

app.post('/sample', async (req, res) => {
    try {
        const newData = req.body;
        const database = client.db("ShopNote");
        const collection = database.collection("sample");

        const result = await collection.insertOne(newData);

        res.status(201).json({
            message: 'Data added successfully!',
            data: { ...newData, _id: result.insertedId },
        });
    } catch (error) {
        console.error("Error adding data to MongoDB:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/vocabulary', async (req, res) => {
    try {
        const database = client.db("ShopNote");
        const collection = database.collection("vocabularyCollection");
        const data = await collection.find({}).toArray();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching vocabulary:', error);
        res.status(500).json({ message: 'Error fetching vocabulary' });
    }
});


app.post('/vocabulary', async (req, res) => {
    const newVocabulary = req.body;

    try {
        const database = client.db("ShopNote");
        const collection = database.collection("vocabularyCollection");

        const result = await collection.insertOne(newVocabulary);

        res.status(201).json(result);
    } catch (error) {
        console.error('Error adding vocabulary:', error);
        res.status(500).json({ message: 'Error adding vocabulary' });
    }
});




app.delete('/vocabulary/:id', async (req, res) => {
    const vocabularyId = req.params.id;

    try {
        const database = client.db("ShopNote");
        const collection = database.collection("vocabularyCollection");

        const result = await collection.deleteOne({ _id: new ObjectId(vocabularyId) });

        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Vocabulary deleted successfully' });
        } else {
            res.status(404).json({ message: 'Vocabulary not found' });
        }
    } catch (error) {
        console.error('Error deleting vocabulary:', error);
        res.status(500).json({ message: 'Error deleting vocabulary' });
    }
});

app.post('/kanji', async (req, res) => {
    const newKanji = req.body;

    try {
        const database = client.db("ShopNote"); // Replace with your database name
        const collection = database.collection("kanji");

        const result = await collection.insertOne(newKanji);

        res.status(201).json(result);
    } catch (error) {
        console.error('Error adding kanji:', error);
        res.status(500).json({ message: 'Error adding kanji' });
    }
});

// GET route for fetching kanji data
app.get('/kanji', async (req, res) => {
    try {
        const database = client.db("ShopNote"); // Replace with your database name
        const collection = database.collection("kanji");
        const data = await collection.find({}).toArray(); // Fetch all documents
        res.status(200).json(data); // Send data back to the client
    } catch (error) {
        console.error('Error fetching kanji:', error);
        res.status(500).json({ message: 'Error fetching kanji' });
    }
});




async function startServer() {
    await connectToDatabase();
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

startServer().catch(console.error);
