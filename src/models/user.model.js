const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const shortid = require('shortid')


const UserSchema = new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    email: { unique: true, type: String, required: true },
    password: String,
    first_name: { type: String, required: true },
    last_name:{ type: String, required: true },
    username: { unique: true, type: String },
})

UserSchema.pre(
    'save',
    async function (next){
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    }
);

UserSchema.methods.isValidPassword = async function (password){
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare; 
}


const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel;