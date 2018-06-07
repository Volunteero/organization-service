const Organization = require('../models/Organization');
const authController = require('../controllers/auth-controller');


module.exports = {
    create: (req, res) => {

        let organization = req.body;

        Organization.create(organization).then((newOrganization) => {


            // When organization is created successfully
            let id = newOrganization._id;

            let username = req.user; //.username
            console.log(username);

            return Promise.resolve({id, username});

        }).then((roleData) => {

            authController.createRole(roleData.id, roleData.username);

            res.status(201).send("Organization created and role is set");

        }).catch((err) => {

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
    },
    delete: (req, res) => {
        let id = req.params.organizationId;

        Organization.deleteOne({_id: id}).then((err) => {

            if (err.n === 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(204);
            }

        }).catch((err) => {
            res.sendStatus(500);
        })
    }

};