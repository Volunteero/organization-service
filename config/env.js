module.exports = {
    development: {
        db: 'mongodb://localhost:27017/organizations-db',
        port: 1337
    },
    production: {
        db: process.env.MONGO_DB_CONN_STR,
        port: process.env.port
    }
};