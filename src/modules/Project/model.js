const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;

let ProjectSchema = new Schema({
    ownerid: [{type: ObjectId, ref: 'User'}],
    ownername: {type: String, required: true, max: 100},
    name: {type: String, required: true, max: 100},
    url: {type: String, required: true, max: 100},
    description: {type: String, required: true, max: 100},
    status: {type: String, max: 100},
});


// Export the model
module.exports = mongoose.model('Project', ProjectSchema);

