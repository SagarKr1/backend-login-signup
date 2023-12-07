const express = require('express');
const db = require('./DataBase/dbCon');
require('dotenv').config();
const router = express.Router();

router.put('/put', async (req, res) => {
    try {
        let data = req.body;
        console.log(data);

        const dbCon = await db.handler();
        const collection = dbCon.collection(process.env.COLLECTION);

        let find = await collection.findOne({ email: data.email });
        console.log(find);
        if (find != null) {
            let newData = {
                $set: {
                    "name": data.name,
                    "phone": data.phone,
                }
            }
            console.log(newData);
            await collection.updateOne({ email: data.email }, newData);
            return res.status(200).send('Data update successfully');
        } else {
            return res.status(404).send('User not found');
        }
    } catch (e) {
        return res.status(500).send(e.message);
    }
})

module.exports = router;