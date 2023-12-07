const express = require('express');
const db = require('./DataBase/dbCon');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/post',async (req,res)=>{
    try{
        let data = req.body;
        console.log(data);

        const dbCon = await db.handler();
        const collection = dbCon.collection(process.env.COLLECTION);

        let find = await collection.findOne({email:data.email});
        console.log(find);

        if(find!=null){
            await db.close();
            return res.status(400).send("user already exists");
        }else{
            var salt = bcrypt.genSaltSync(10);
            var password = bcrypt.hashSync(data.password, salt);
            let user = {
                "email":data.email,
                "name":data.name,
                "phone":data.phone,
                "password":password
            }
            console.log(user);
            await collection.insertOne(user);
            await db.close();
            return res.status(200).send('User created successfully');
        }
    }catch(e){
        return res.status(500).send(e.message);
    }
})


module.exports = router;