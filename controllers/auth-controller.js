const secret = require('../config/auth').secret;
const Client = require('node-rest-client').Client;
const jwt = require('express-jwt');
const client = new Client();
const getToken = require('../utils/get-access-token-from-request');

module.exports = {

    createRole: (organisationId, username) => {

        console.log(organisationId);
        console.log(username);

        let args = {
            data: {organisationId: organisationId, username: username},
            headers: {"Content-Type": "application/json"}

        };
        client.post("https://volunteero-auth.herokuapp.com/internal/organisations/createRole?accessKey=root&secretAccessKey=password", args, (data, response) => {

            console.log('DATA');
            // console.log(data.toString('utf8'));
            console.log(data);
            // console.log('RESPONSE');

            // console.log(response);
            return data.toString('utf8');
        });
    },
    isAuthorizedToUpdate: (req, res, next) => {

        let token = getToken(req);

        client.get("https://volunteero-auth.herokuapp.com/auth/access?accessToken=" + token + "&resource=updateOrganization", (data, response) => {
            // TODO add some extra check here
            console.log(data);
            if (response) {
                next();
            } else {
                res.sendStatus(403);
            }

        });
    }, isAuthorizedToDelete: (req, res, next) => {

        let token = getToken(req);

        client.delete("https://volunteero-auth.herokuapp.com/auth/access?accessToken=" + token + "&resource=deleteOrganization", (data, response) => {

            if (response) {
                next();
            } else {
                res.sendStatus(403);
            }
        });

    }, jwt: jwt({
        getToken,
        secret
    })

};
