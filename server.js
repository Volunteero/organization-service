const express = require('express');
const app = express();
const port = process.env.PORT || 5656;
const organizationRoutes = require('./routes/organization-router');


app.use('/organizations', organizationRoutes);


app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});
