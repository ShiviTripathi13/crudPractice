const bcrypt = require('bcrypt');

const hashPassword  = async(password) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    catch(err){
        console.log(err);
        return err;
    }
};

const comparePassword = async(password, hashedPassword) => {
    try{
        const ismatch = await bcrypt.compare(password, hashedPassword);
        return ismatch;
    }
    catch(err){
        console.log(err);
        return err;
    }
};

module.exports = {hashPassword, comparePassword};