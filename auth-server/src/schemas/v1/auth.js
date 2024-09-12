const userSchema = {
    type: "object",
    properties: {
        role: {type: "string", description: "Role of the user", enum: ["admin", "normal"], default: "normal"},
        username: {type: "string", minLength: 3, maxLength: 50, description: "Username of the user"},
        password: {type: "string", minLength: 6, maxLength: 100, description: "Password of the user"},
    },
    required: ["role", "username", "password"],
};

const payloadSchema = {
    type: "object",
    properties: {
        access_token: {type: "string", description: "Access token for the user"},
        token_type: {type: "string", description: "Type of token"},
        refresh_token: {type: "string", description: "Refresh token for the user"},
        expires_in: {type: "integer", description: "Time in seconds until the token expires"},
    },
    required: ["access_token", "token_type", "refresh_token", "expires_in"],
};

const signupOpts = {
    schema: {
        body: userSchema,
        response: {
            200: {
                description: "User information",
                content: {
                    "application/json": {
                        schema: userSchema,
                    },
                },
            },
            400: {
                description: "User already exists",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                statusCode: {type: "integer", description: "Status code"},
                                message: {type: "string", description: "Error message"},
                                error: {type: "string", description: "Error type"},
                            },
                            required: ["statusCode", "message", "error"],
                        },
                    },
                },
            },
        },
    },
};

const signinOpts = {
    schema: {
        body: {
            type: "object",
            properties: {
                username: {type: "string", minLength: 3, maxLength: 50, description: "Username of the user"},
                password: {type: "string", minLength: 6, maxLength: 100, description: "Password of the user"},
            },
            required: ["username", "password"],
        },
        response: {
            200: {
                description: "Token information",
                content: {
                    "application/json": {
                        schema: payloadSchema,
                    },
                },
            },
        },
    },
};

module.exports = {signupOpts, signinOpts};
