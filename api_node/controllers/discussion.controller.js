const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
    users: [{email: String}],
    messages: [{
        content: String,
        author: String,
        date: Date,
    }],
});

module.exports = DiscussionSchema;
