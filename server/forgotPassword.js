const express = require('express');

const router = express.Router();

router.post('/',async (req,res)=>{
    try{

    }catch(e){
        return res.status(500).send(e.message);
    }
})

module.exports = router;