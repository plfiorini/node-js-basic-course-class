const {inspect} = require("util");
const {getBooksOpts, getBookOpts, postBookOpts, putBookOpts, deleteBookOpts} = require("../../schemas/v1/books");
const {NotFoundError} = require("../../errors");

const bookRoutes = async (fastify) => {
    // Get all books
    fastify.route({
        method: "GET",
        url: "/",
        schema: getBooksOpts,
        preHandler: fastify.auth([fastify.allowReadOnly]),
        handler: async (request, reply) => {
            const client = await fastify.pg.connect();
            try {
                let limits = 10;
                let offset = 0;

                const author = request.query.author;
                const year = request.query.published_year;
                const sort = request.query.sort || "desc";

                let dbQuery = "SELECT * FROM books";
                let whereArgs = [];
                let queryArgs = [];
                let paramIndex = 0;
                let page = 0;

                // Avoid SQL injection
                if (author) {
                    whereArgs.push(`author = $${++paramIndex}`);
                    queryArgs.push(author);
                }
                if (year) {
                    whereArgs.push(`published_year = $${++paramIndex}`);
                    queryArgs.push(year);
                }
                if (whereArgs.length > 0) {
                    dbQuery += " WHERE " + whereArgs.join(" AND ");
                }

                dbQuery += ` ORDER BY published_year ${sort} NULLS FIRST LIMIT $${++paramIndex} OFFSET $${++paramIndex}`;

                if (request.query.limit != null) {
                    limits = parseInt(request.query.limit);
                }
                if (request.query.page) {
                    page = parseInt(request.query.page) - 1;
                    if (page < 0) page = 0;
                    offset = limits * page;
                }

                console.log(`🔍🔍🔍 Query: ${dbQuery}, Args: ${queryArgs}, Limits: ${limits}, Offset: ${offset}`);

                const {rows} = await client.query(dbQuery, [...queryArgs, limits, offset]);
                const result = {
                    books: rows,
                    page: page + 1,
                    limit: limits,
                };
                reply.send(result);
            } catch (err) {
                request.log.error(`Error listing all books: ${inspect(err)}`);
                throw err;
            } finally {
                client.release();
            }
        },
    });

    // Get by Id
    fastify.route({
        method: "GET",
        url: "/:id",
        schema: getBookOpts,
        preHandler: fastify.auth([fastify.allowReadOnly]),
        handler: async (request, reply) => {
            const client = await fastify.pg.connect();
            try {
                const {rows} = await client.query("SELECT * FROM books WHERE id = $1", [request.params.id]);
                if (rows?.length > 0) {
                    reply.send(rows[0]);
                } else {
                    throw new NotFoundError(`Book ${request.params.id} not found`);
                }
            } catch (err) {
                request.log.error(`Error getting book ${request.params.id}: ${inspect(err)}`);
                throw err;
            } finally {
                client.release();
            }
        },
    });

    // Create
    fastify.route({
        method: "POST",
        url: "/",
        schema: postBookOpts,
        preHandler: fastify.auth([fastify.allowReadWrite]),
        handler: async (request, reply) => {
            const client = await fastify.pg.connect();
            try {
                let {title, author, isbn, published_year} = request.body;
                if (!isbn) {
                    isbn = null;
                }
                if (!published_year) {
                    published_year = null;
                }
                const {rows} = await client.query("INSERT INTO books (title, author, isbn, published_year) VALUES ($1, $2, $3, $4) RETURNING *", [
                    title,
                    author,
                    isbn,
                    published_year,
                ]);
                reply.code(201).send(rows[0]);
            } catch (err) {
                request.log.error(`Error creating a book: ${inspect(err)}`);
                throw err;
            } finally {
                client.release();
            }
        },
    });

    // Modify
    fastify.route({
        method: "PUT",
        url: "/:id",
        schema: putBookOpts,
        preHandler: fastify.auth([fastify.allowReadWrite]),
        handler: async (request, reply) => {
            const client = await fastify.pg.connect();
            try {
                let {title, author, isbn, published_year} = request.body;
                const {id} = request.params;
                if (!isbn) {
                    isbn = null;
                }
                if (!published_year) {
                    published_year = null;
                }
                const {rows} = await client.query("UPDATE books SET title = $1, author = $2, isbn = $3, published_year = $4 WHERE id = $5 RETURNING *", [
                    title,
                    author,
                    isbn,
                    published_year,
                    id,
                ]);
                if (rows?.length > 0) {
                    reply.send(rows[0]);
                } else {
                    throw new NotFoundError(`Book ${request.params.id} not found`);
                }
            } catch (err) {
                request.log.error(`Error updating book ${request.params.id}: ${inspect(err)}`);
                throw err;
            } finally {
                client.release();
            }
        },
    });

    // Delete
    fastify.route({
        method: "DELETE",
        url: "/:id",
        schema: deleteBookOpts,
        preHandler: fastify.auth([fastify.allowReadWrite]),
        handler: async (request, reply) => {
            const client = await fastify.pg.connect();
            try {
                const {rows} = await client.query("DELETE FROM books WHERE id = $1 RETURNING *", [request.params.id]);
                if (rows?.length > 0) {
                    reply.send(rows[0]);
                } else {
                    throw new NotFoundError(`Book ${request.params.id} not found`);
                }
            } catch (err) {
                request.log.error(`Error deleting book ${request.params.id}: ${inspect(err)}`);
                throw err;
            } finally {
                client.release();
            }
        },
    });
};

module.exports = bookRoutes;
