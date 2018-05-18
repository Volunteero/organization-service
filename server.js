const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const organizationRoutes = require('./routes/organization-router');

const app = express();

let env = process.env.NODE_ENV || 'development';

let config = require('./config/env')[env];


require('./config/database')(config);

// Enable cors
app.use(cors());

// Setup body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Setup routes
app.use('/organizations', organizationRoutes);

// Listen
app.listen(config.port, () => {
    console.log(`Listening to: http://localhost:${config.port}`)
});
