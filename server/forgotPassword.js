const express = require('express');
const db = require('./DataBase/dbCon');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const router = express.Router();

router.put('/put',async (req,res)=>{
    try{
        let data = req.body;
        console.log(data);

        const dbCon = await db.handler();
        const collection = dbCon.collection(process.env.COLLECTION);

        let find = await collection.findOne({email:data.email});
        console.log(find);
        if(find!=null){
            var salt = bcrypt.genSaltSync(10);
            var password = bcrypt.hashSync(data.password, salt);
            let newPass ={
                $set:{
                    "password":password
                }
            }
            console.log(newPass);
            await collection.updateOne({email:data.email},newPass);
            return res.status(200).send('Password update successfully');
        }else{
            return res.status(404).send('User not found');
        }
    }catch(e){
        return res.status(500).send(e.message);
    }
})

module.exports = router;