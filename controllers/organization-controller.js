const Organization = require('../models/Organization');


module.exports = {
    create: (req, res) => {
        let organization = req.body;


        Organization.create(organization).then(() => {
            // When organization is created successfully
            res.sendStatus(201);

        }, (err) => {
            console.log(err);

            res.status(400).json(err.message);
        })
    },
};