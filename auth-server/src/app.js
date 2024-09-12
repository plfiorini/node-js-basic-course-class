const fastify = require("fastify");
const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");
const fastifyPostgres = require("@fastify/postgres");
const fastifyBcrypt = require("fastify-bcrypt");
const fastifyJwt = require("@fastify/jwt");

const authRoutes = require("./routes/v1/auth");
const healthCheckRoutes = require("./routes/v1/healthcheck");

const {ApiError} = require("./errors");

const build = (options = {}, swaggerOptions = {}, swaggerUiOptions = {}, postgresOptions = {}, jwtOptions = {}) => {
    const app = fastify(options);

    app.setErrorHandler((error, request, reply) => {
        request.log.error(error.toString());
        if (error instanceof ApiError) {
            reply.status(error.statusCode).send({statusCode: error.statusCode, message: error.message, error: error.name});
        } else {
            reply.status(500).send({statusCode: 500, message: error.toString(), error: "Internal Server Error"});
        }
    });

    app.register(fastifySwagger, swaggerOptions);
    app.register(fastifySwaggerUi, swaggerUiOptions);
    app.register(fastifyPostgres, postgresOptions);
    app.register(fastifyBcrypt, {
        saltWorkFactor: 12,
    });
    app.register(fastifyJwt, jwtOptions);
    app.register(authRoutes, {prefix: "/auth"});
    app.register(healthCheckRoutes, {prefix: "/healthcheck"});

    return app;
};

module.exports = build;
