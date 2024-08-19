import { MongoClient } from "mongodb";

const uri = 'mongodb://localhost:27017';

async function main(){
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
    console.log('connected to mongoDB');
    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
}

main().catch(console.error);