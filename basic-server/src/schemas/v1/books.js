const bookSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer', description: 'The unique identifier of the book' },
        title: { type: 'string', description: 'The title of the book' },
        author: { type: 'string', description: 'The author of the book' },
        isbn: { type: 'string', default: null, description: 'The ISBN of the book' },
        published_year: { type: 'integer', default: null, description: 'The published year of the book' },
    },
    required: ['id', 'title', 'author', 'isbn', 'published_year'],
};

const bookSchemaPaginated = {
    type: 'object',
    properties: {
        books: { type: 'array', items: bookSchema, description: 'The list of books' },
        page: { type: 'integer', description: 'The current page' },
        limit: { type: 'integer', description: 'The number of books per page' },
    },
    required: ['books', 'page', 'limit'],
};

const securitySchema = [{ bearerAuth: [] }];

const getBooksOpts = {
    schema: {
        description: 'Get all books',
        query: {
            type: 'object',
            properties: {
                author: { type: 'string', description: 'The author of the book' },
                published_year: { type: 'integer', description: 'The published year of the book' },
                page: { type: 'integer', description: 'The page number' },
                limit: { type: 'integer', description: 'The number of books per page' },
                sort: { type: 'string', enum: ['asc', 'desc'], description: 'The sort order' },
            },
        },
        response: {
            200: {
                description: 'Books and pagination information',
                content: {
                    'application/json': {
                        schema: bookSchemaPaginated,
                    },
                },
            },
        },
        security: securitySchema,
    }
};

const getBookOpts = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer', description: 'The unique identifier of the book' },
            },
            required: ['id'],
        },
        response: {
            200: {
                description: 'Book information',
                content: {
                    'application/json': {
                        schema: bookSchema,
                    },
                },
            },
        },
        security: securitySchema,
    },
};

const postBookOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                title: { type: 'string', description: 'The title of the book' },
                author: { type: 'string', description: 'The author of the book' },
                isbn: { type: 'string', default: null, description: 'The ISBN of the book' },
                published_year: { type: 'integer', default: null, description: 'The published year of the book' },
            },
            required: ['title', 'author', 'isbn', 'published_year'],
        },
        response: {
            200: {
                description: 'Book information',
                content: {
                    'application/json': {
                        schema: bookSchema,
                    },
                },
            },
        },
        security: securitySchema,
    },
};

const putBookOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                title: { type: 'string', description: 'The title of the book' },
                author: { type: 'string', description: 'The author of the book' },
                isbn: { type: 'string', default: null, description: 'The ISBN of the book' },
                published_year: { type: 'integer', default: null, description: 'The published year of the book'},
            },
            required: ['title', 'author', 'isbn', 'published_year'],
        },
        response: {
            200: {
                description: 'Book information',
                content: {
                    'application/json': {
                        schema: bookSchema,
                    },
                },
            },
        },
        security: securitySchema,
    },
};

const deleteBookOpts = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer', description: 'The unique identifier of the book'},
            },
            required: ['id'],
        },
        response: {
            200: {
                description: 'Book information',
                content: {
                    'application/json': {
                        schema: bookSchema,
                    },
                },
            },
        },
        security: securitySchema,
    },
};

module.exports = { getBooksOpts, getBookOpts, postBookOpts, putBookOpts, deleteBookOpts };
