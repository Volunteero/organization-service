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
    },
    update: (req, res) => {
        // Retrieve the id
        let id = req.params.organizationId;

        // Get the new data from the body
        let newValues = req.body;

        Organization.findById(id).then((organization) => {
            // let oldOrganization = Object.assign({}, organization);
            // :TODO make a check if nothing was updated
            organization.set(newValues);
            organization.save().then(() => {


                // if (JSON.stringify(oldOrganization) === JSON.stringify(organization)) {
                //     res.status(400).json("Nothing was updated. Check if the parameters are correct!");
                // }
                // else {
                console.log(organization);

                res.sendStatus(204);
                // }

            }).catch((err) => {
                res.status(400).json(err.message);
            })


        }).catch((err) => {
            res.sendStatus(404);
        })
    }

};