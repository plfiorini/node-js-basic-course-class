const fastify = require("fastify");

const healthCheck = async (fastify) => {
    fastify.get("/", async (request, reply) => {
        const client = await fastify.pg.connect();
        try {
            const { rows } = await client.query("SELECT now()");
            reply.send(rows[0]);
        } catch (err) {
            request.log.error(err);
        } finally {
            client.release();
        }
    });
};

module.exports = healthCheck;