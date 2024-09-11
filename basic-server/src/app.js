const fastify = require('fastify');
const fastifySwagger = require('@fastify/swagger');
const fastifySwaggerUi = require('@fastify/swagger-ui');
const fastifyPostgres = require('@fastify/postgres');

const bookRoutes = require('./routes/v1/books');
const healthCheckRoutes = require('./routes/v1/healthcheck');

const build = ((options = {}, swaggerOptions = {}, swaggerUiOptions = {}, postgresOptions = {}) => {
    const app = fastify(options);
    app.register(fastifySwagger, swaggerOptions);
    app.register(fastifySwaggerUi, swaggerUiOptions);
    app.register(fastifyPostgres, postgresOptions);
    app.register(bookRoutes, { prefix: "/books" });
    app.register(healthCheckRoutes, { prefix: "/healthcheck" });
    return app
});

module.exports = build;
