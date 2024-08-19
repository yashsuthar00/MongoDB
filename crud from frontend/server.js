import express from 'express';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

const uri = 'mongodb://localhost:27017'; // Replace with your connection string
const client = new MongoClient(uri);

let database;

// Connect to the database and then start the server
client.connect()
    .then(() => {
        database = client.db('auth-example'); // Replace with your database name
        console.log("Connected to MongoDB");

        app.post('/add', async (req, res) => {
            try {
                const collection = database.collection('users'); // Replace with your collection name
                const result = await collection.insertOne(req.body);
                res.status(201).send(`New document created with _id: ${result.insertedId}`);
            } catch (err) {
                res.status(500).send('Error inserting document');
            }
        });

        app.get('/items', async (req, res) => {
            try {
                const collection = database.collection('users'); // Replace with your collection name
                const items = await collection.find({}).toArray();
                res.status(200).json(items);
            } catch (err) {
                res.status(500).send('Error fetching documents');
            }
        });

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
});