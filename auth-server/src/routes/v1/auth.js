const {inspect} = require("util");
const {BadRequestError, NotFoundError} = require("../../errors");

const authRoutes = async (fastify) => {
    fastify.post("/signup", async (request, reply) => {
        const client = await fastify.pg.connect();
        try {
            let {role, username, password} = request.body;

            const hash = await fastify.bcrypt.hash(password);

            // Check if the user already exists
            {
                const {rows} = await client.query("SELECT count(*) FROM users WHERE username = $1", [username]);
                if (rows?.length > 0 && rows[0].count > 0) {
                    throw new BadRequestError("User already exists");
                }
            }

            // Create a new user
            {
                const {rows} = await client.query("INSERT INTO users (role, username, password) VALUES ($1, $2, $3) RETURNING username", [
                    role,
                    username,
                    hash,
                ]);
                reply.code(201).send(rows[0]);
            }
        } catch (err) {
            request.log.error(`Error with user signup: ${inspect(err)}`);
            throw err;
        } finally {
            client.release();
        }
    });

    fastify.post("/signin", async (request, reply) => {
        const client = await fastify.pg.connect();
        try {
            let {username, password} = request.body;

            // Check if the user exists and the password is correct
                const {rows} = await client.query("SELECT id, role, username, password FROM users WHERE username = $1", [username]);
                if (!rows?.length) {
                    throw new NotFoundError("User does not exist or invalid password");
                }

                const hashedPassword = rows[0].password;
                const passwordVerified = await fastify.bcrypt.compare(password, hashedPassword);
                if (!passwordVerified) {
                    throw new NotFoundError("User does not exist or invalid password");
                }

                // Create token
                const payload = {
                    sub: rows[0].id,
                    username: rows[0].username,
                    role: rows[0].role,
                    iss: "http://localhost:3000",
                    aud: 42,
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                };
                const token = fastify.jwt.sign({ payload });
                
                const resp = {
                    access_token: token,
                    token_type: "Bearer",
                    refresh_token: "refresh_token",
                    expires_in: 60 * 60,
                };
                reply.code(200).send(resp);
        } catch (err) {
            request.log.error(`Error with user signin: ${inspect(err)}`);
            throw err;
        } finally {
            client.release();
        }
    });
};

module.exports = authRoutes;
