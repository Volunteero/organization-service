const Organization = require('../models/Organization');
const authController = require('../controllers/auth-controller');


module.exports = {
    create: (req, res) => {

        let organization = req.body;

        Organization.create(organization).then((newOrganization) => {


            // When organization is created successfully
            let id = newOrganization._id;

            let username = req.user.username;

            return Promise.resolve({id, username});

        }).then((roleData) => {

            // ToDo: make validation here and error handling
            authController.createRole(roleData.id, roleData.username);

            res.status(201).json({'organization_id': roleData.id});

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
    },
    addEventToOrganization: (req, res) => {
        // Retrieve the id
        let id = req.params.organizationId;

        // Get the new data from the body
        let newValue = req.body;

        if (newValue.hasOwnProperty('event_id')) {
            Organization.findByIdAndUpdate(id, {$push: {event_ids: newValue.event_id}},

                function (err, model) {
                    if (err) {
                        res.send(500).json(err);
                    }
                });

            res.status(200).send('Organization updated');
        }
        else {
            res.status(400).send("You need to have event_id in the body")
        }
    },
    addCampaignToOrganization: (req, res) => {
        // Retrieve the id
        let id = req.params.organizationId;

        // Get the new data from the body
        let newValue = req.body;

        if (newValue.hasOwnProperty('campaign_id')) {
            Organization.findByIdAndUpdate(id, {$push: {campaign_ids: newValue.campaign_id}},

                function (err, model) {
                    if (err) {
                        res.send(500).json(err);
                    }
                });

            res.status(200).send('Organization updated');
        }
        else {
            res.status(400).send("You need to have campaign_id in the body")
        }
    }

};