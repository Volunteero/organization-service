const secret = require('../config/auth').secret;
const Client = require('node-rest-client').Client;
const jwt = require('express-jwt');
const client = new Client();
const getToken = require('../utils/get-access-token-from-request');

module.exports = {

    createRole: (organisationId, username) => {

        let args = {
            data: {organisationId: organisationId, username: username}

        };
        client.post("https://volunteero-auth.herokuapp.com/internal/organizations/createRole?accessKey=root&secretAccessKey=password", args, (data, response) => {

            // console.log('DATA');
            // console.log(data.toString('utf8'));

            return data.toString('utf8');
        });
    },
    isAuthorizedToUpdate: (req, res, next) => {
        client.get("https://volunteero-auth.herokuapp.com/auth/access?accessToken=accessKey&resource=updateOrganization", (data, response) => {

            if (response) {
                next();
            } else {
                res.sendStatus(403);
            }

        });
    }, jwt: (req, res, next) => {
        let token = getToken(req);

        if (token !== null) {
            jwt({token, secret});
            console.log("called");
        }

        next();

    }


};
