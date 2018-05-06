module.exports = {
    development: {
        db: 'mongodb://localhost:27017/organizations-db',
        port: 1337
    },
    production: {
        db: "mongodb+srv://new-user_31:wildside@organizations-service-z2fzj.mongodb.net/organizations-db",
        port: process.env.PORT
    }
};