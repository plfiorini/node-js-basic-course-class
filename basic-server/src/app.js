const fastify = require('fastify');
const fastifySwagger = require('@fastify/swagger');
const fastifySwaggerUi = require('@fastify/swagger-ui');

const bookRoutes = require('./routes/v1/books');

const build = ((options = {}, swaggerOptions = {}, swaggerUiOptions = {}) => {
    const app = fastify(options);
    app.register(fastifySwagger, swaggerOptions);
    app.register(fastifySwaggerUi, swaggerUiOptions);
    app.register(bookRoutes);
    return app
});

module.exports = build;
