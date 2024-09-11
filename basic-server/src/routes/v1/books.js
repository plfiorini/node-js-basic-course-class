const bookRoutes = async (fastify) => {
    fastify.get('/', (request, reply) => {
        reply.send({ hello: "world" });
    });
};

module.exports = bookRoutes;
