let Client = require('node-rest-client').Client;

let client = new Client();


module.exports = {

    createRole: (organisationId, username) => {

        let args = {
            data: {organisationId: organisationId, username: username}

        };
        client.post("https://volunteero-auth.herokuapp.com/internal/organizations/createRole?accessKey=root&secretAccessKey=password", args, (data, response) => {

            console.log('DATA');
            console.log(data.toString('utf8'));

            return data.toString('utf8');
        });
    },
    isAuthorized: () => {

    }

};
