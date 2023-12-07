const express = require('express');
const db = require('./DataBase/dbCon');
require('dotenv').config();

const router = express.Router();


router.delete('/delete',async (req,res)=>{
    try{
        let data = req.body;
        console.log(data);

        const dbCon = await db.handler();
        const collection = dbCon.collection(process.env.COLLECTION);

        let find = await collection.deleteOne({email:data.email});

        return res.status(200).send("user deleted successfully");
    }catch(e){
        return res.status(500).send(e.message);
    }
})

module.exports = router;