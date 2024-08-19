const { MongoClient } = require("mongodb")
const uri = require("./atlas_uri")

console.log(uri);

const client = new MongoClient(uri);
const dbname = "bank";
const collectionNmae = "accounts";

const accountsCollection = client.db(dbname).collection(collectionNmae)

const connectDatabase = async () => {
    try {
        await client.connect();
        console.log(`connected to the ${dbname} database`);
    } catch (err) {
        console.error(`getting error while connecting to the database ${err}`);
    }
}


const sampleAccount = [{
    account_holder: "yash suthar",
    account_id : "4s5f56sd4f65",
    account_type : "checking",
    balance: 123456,
    last_updated : new Date(),
},
{
    account_holder: "rahul yadav",
    account_id : "4s5f56sd4f65",
    account_type : "checking",
    balance: 123456,
    last_updated : new Date(),
}]







const main = async () => {
    await connectDatabase()
    try {
        let result = await accountsCollection.insertMany(sampleAccount)
        console.log(`document Inserted succefully ${result.insertedCount}`)
        console.log(result)
    } catch (err) {
        console.error(`error inserting document ${err}`)
    } finally {
        await client.close()
    }
}

main();