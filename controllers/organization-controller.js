const Organization = require('../models/Organization');


module.exports = {
    create: (req, res) => {

        console.log(req.body);

        res.json(req.body);
        // Organization.create()
    },
};