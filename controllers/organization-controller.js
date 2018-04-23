const Organization = require('../models/Organization');


module.exports = {
    create: (req, res) => {
        let organization = req.body;


        Organization.create()
    },
};