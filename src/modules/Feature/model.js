const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;

//Change toggle to enable
//Update names
let FeatureSchema = new Schema({
    projectid: [{type: ObjectId, ref: 'Project'}],
    ownername: {type: String, required: true, max: 100},
    projectname: {type: String, required: true, max: 100},
    name: {type: String, required: true, max: 100},
    description: {type: String, required: true, max: 100},
    enabled: {type: Boolean, default: true},   
});


// Export the model
module.exports = mongoose.model('Feature', FeatureSchema);

