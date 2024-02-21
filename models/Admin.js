const mongoose = require('mongoose');

const Admin = mongoose.model('admin', {
    name: String,
    age: Number,
    role: String
})

module.exports = Admin