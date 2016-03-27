/**
 * Created by jeffersonwu on 3/27/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create mongoose schema
var userSchema = new Schema({
    name: String,
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: Boolean,
    location: String,
    meta: {
        age: Number,
        website: String
    },
    created_at: Date,
    updated_at: Date
});

//create custom methods inside userSchema

userSchema.methods.dudify = function() {
    this.name = this.name + '-dude';
    return this.name;
};
//create mongoose model
var User = mongoose.model('User', userSchema);

//expose this to other scripts
module.exports = User;

