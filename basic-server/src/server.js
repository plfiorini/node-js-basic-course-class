const fastify = require('fastify')({ logger: true });

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

fastify.listen({ port: 3000, host: 'localhost' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
