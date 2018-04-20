const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    user_id: String,
    event_ids: [String],
    campaign_ids: [String],
    organization_name: String,
    organization_descriptions: String
});

let Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;