const build = require('./app');

const app = build({ logger: true })

app.get('/', async (request, reply) => {
  return { hello: 'world' };
});

app.listen({ port: 3000, host: 'localhost' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
