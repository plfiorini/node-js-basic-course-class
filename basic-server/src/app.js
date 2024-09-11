const fastify = require('fastify');

const build = ((options = {}) => {
    const app = fastify(options);
    return app
});

module.exports = build;
