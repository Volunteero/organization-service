const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    user_id: {type: String,  required: true},
    event_ids: [String],
    campaign_ids: [String],
    organization_name: {type: String, required: true, unique: true, minlength: 3},
    organization_description: {type: String, minlength: 3},
});

let Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;