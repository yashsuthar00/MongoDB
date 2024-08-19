import { MongoClient } from "mongodb";

const uri = 'mongodb://localhost:27017';

async function main(){
    const client = new MongoClient(uri);
    
    
    try{
        await client.connect();
        console.log("conneted to mongodb");

        const database = client.db("node_db");
        const collection = database.collection("node_collection");

        //insert query
        const document = {
            _id:'330',
            name: "rahul",
            profession:"programmer"
        };

        const result = await collection.insertOne(document);
        console.log(`document insert successfully ${result}`);


        // Find a document
        const query = { name: "yash" };
        const foundDoc = await collection.findOne(query);
        console.log(foundDoc);

        // Update a document
        const updateQuery = { name: "yash" };
        const updateDoc = {
            $set: {
                age: 31,
                address: "456 Elm St"
            },
        };
        const updateResult = await collection.updateOne(updateQuery, updateDoc);
        console.log(`Matched ${updateResult.matchedCount} document(s) and modified ${updateResult.modifiedCount} document(s)`);

        // Delete a document
        const deleteQuery = { name: "John Doe" };
        const deleteResult = await collection.deleteOne(deleteQuery);
        console.log(`Deleted ${deleteResult.deletedCount} document(s)`);
        
    } catch(e){
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);