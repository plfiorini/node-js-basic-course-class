require('dotenv').config();

const envalid = require('envalid');

module.exports = envalid.cleanEnv(process.env, {
    POSTGRES_DB_CONNECTION: envalid.str({}),
    JWT_SECRET: envalid.str({}),
});
