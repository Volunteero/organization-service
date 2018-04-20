const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    user_id: {type: String, required: true},
    event_ids: [String],
    campaign_ids: [String],
    organization_name: {type: String, required: true},
    organization_descriptions: {type: String, required: true},
});

let Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;