const express = require('express');
const db = require('./DataBase/dbCon');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const router = express.Router();


router.post('/',async (req,res)=>{
    try{
        let data = req.body;
        console.log(data);

        const dbCon = await db.handler();
        const collection = dbCon.collection(process.env.COLLECTION);

        let find = await collection.findOne({email:data.email});
        console.log(find.password);
        if(find!=null){
            const pass = bcrypt.compareSync(data.password, find.password);
            if(pass==true){
                return res.status(200).send(find);
            }else{
                return res.status(404).send('email or password is wrong');
            }
        }else{
            return res.status(400).send("user not found");
        }
    }catch(e){
        return res.status(500).send(e.message);
    }
})

module.exports = router;