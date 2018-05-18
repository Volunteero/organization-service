module.exports = {
    development: {
        db: 'mongodb://localhost:27017/organizations-db',
        port: 1337
    },
    production: {
        db: process.env.DB_ATLAS, // var configured on heroku
        port: process.env.PORT
    }
};