const {inspect} = require("util");

const fastify = require("fastify");
const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");
const fastifyPostgres = require("@fastify/postgres");
const fastifyJwt = require("@fastify/jwt");
const fastifyAuth = require("@fastify/auth");

const bookRoutes = require("./routes/v1/books");
const healthCheckRoutes = require("./routes/v1/healthcheck");

const {ApiError, AuthenticationError, ForbiddenError} = require("./errors");

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
    app.register(fastifyJwt, jwtOptions);
    app.register(fastifyAuth);
    app.decorate("verifyBearerToken", async function (request, reply) {
        try {
            const token = request.headers.authorization.replace("Bearer ", "");
            const jwtPayload = await app.jwt.verify(token);
            console.log(inspect(jwtPayload));
        } catch (err) {
            console.error(err);
            reply.status(401).send({statusCode: 401, message: "Unauthorized", error: "Invalid Token"});
        }
    });
    app.decorate("allowAnonymous", function (req, reply, done) {
        if (req.headers.authorization) {
            return done(new AuthenticationError("not anonymous"));
        }
        return done();
    });
    app.decorate("allowReadOnly", function (req, reply, done) {
        if (req.headers.authorization) {
            const token = req.headers.authorization.replace("Bearer ", "");
            app.jwt.verify(token, (err, decoded) => {
                if (err) {
                    return done(new AuthenticationError(err.message));
                }
                if (!(decoded.payload.role === "normal" || decoded.payload.role === "admin")) {
                    return done(new ForbiddenError("Read only access denied"));
                }
            });
            return done();
        }
        return done(new AuthenticationError("not authorized"));
    });
    app.decorate("allowReadWrite", function (req, reply, done) {
        if (req.headers.authorization) {
            const token = req.headers.authorization.replace("Bearer ", "");
            app.jwt.verify(token, (err, decoded) => {
                if (err) {
                    return done(new AuthenticationError(err.message));
                }
                if (decoded.payload.role !== "admin") {
                    return done(new ForbiddenError("Read-write access denied"));
                }
            });
            return done();
        }
        return done(new AuthenticationError("not authorized"));
    });
    app.register(bookRoutes, {prefix: "/books"});
    app.register(healthCheckRoutes, {prefix: "/healthcheck"});

    return app;
};

module.exports = build;
