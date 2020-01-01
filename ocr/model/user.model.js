
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var imageSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
      },
    words: {
        type: String,
        required: true
    }
});

var User = mongoose.model('User', imageSchema);

// save user to database
User.addUser= function(user, callback){

    bcrypt.genSalt(10, (err, salt)=>{
               
            user.save((err, result)=>{
                        if(err){
                            console.log(err);
                            callback('Failed to add', null);
                        } else{
                            callback(null, 'word added');
                        }
                    });
                
            });
        };
    



module.exports = User;


