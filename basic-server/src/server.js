const build = require('./app');
const env = require('./config/env');

const app = build({
  logger: true,
}, {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      description: "Library management API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server"
      },
    ]
  }
}, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
},
{
  connectionString: env.POSTGRES_DB_CONNECTION,
}
);

app.listen({ port: 3000, host: 'localhost' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
