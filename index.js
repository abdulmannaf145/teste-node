const express = require('express');
const app = express();
const port = process.env.PORT ||3000;
require('dotenv').config();
const { MongoClient } = require('mongodb');


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oukh2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"`
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try{
        await client.connect();
        console.log('database connected');
        const database = client.db('Client');
        const dataCollection = database.collection('user');

        const docs ={
            name:'abdul mannaf',
            email:'abdulmannaf145@gmail.com'
        }

        const result = await dataCollection.insertOne(docs);
        console.log('data pushed',result)

    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/hello',(req,res)=>{
    res.send('hello from my heart ')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})