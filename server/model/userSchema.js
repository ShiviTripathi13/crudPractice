const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name :{
        type : String,
        require : [true, 'Name is required']
    },
    email : {
        type : String,
        require : [true, 'Email is required'],
        unique : true
    },
    password : {
        type : String,
        require : [true, 'Password is required'],
        minlength : 8,
        
    }
})

const userdb = mongoose.model('userDataBase', userSchema);
module.exports = userdb;