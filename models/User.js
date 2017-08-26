const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        city: String,
        country: String
    },
    job: String,
    company: String,
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    university: String,
    skills: {
        type: Array,
    },

});

module.exports = mongoose.model("User", userSchema);
