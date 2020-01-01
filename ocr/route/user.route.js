
var express = require('express');
var router = express.Router();

var User = require('../model/user.model');

router.post('/upload', (req, res)=>{
    let user = new User({        
        words: res.body.json(result.text)
    });
    
    User.addUser(user, (err, result)=>{
        if(err){
            return res.json({success: false, message: err});
        }
        return res.json({success: true, message: result});
    });
});




module.exports = router;