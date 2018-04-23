const Organization = require('../models/Organization');


module.exports = {
    create: (req, res) => {
        let organization = req.body;


        Organization.create(organization).then(() => {
            // When organization is created successfully
            res.sendStatus(201);

        }, (err) => {
            res.status(400).json(err.message);
        })
    },
    getAll: (req, res) => {
        Organization.find({}).then((organizations) => {
            res.status(200).json(organizations);

        }, err => {
            res.status(500).json(err.message);

        })
    },
    getById: (req, res) => {
        // Retrieve the id
        let id = req.params.organizationId;

        Organization.findById(id).then((organization) => {
            res.status(200).json(organization);

        }).catch((err) => {
            res.sendStatus(404);
        })
    }

};