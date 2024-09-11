const bookSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        author: { type: 'string' },
        isbn: { type: 'string', default: null },
        published_year: { type: 'integer', default: null },
    },
    required: ['id', 'title', 'author', 'isbn', 'published_year'],
};

const bookSchemaPaginated = {
    type: 'object',
    properties: {
        books: { type: 'array', items: bookSchema },
        page: { type: 'integer' },
        limit: { type: 'integer' },
    },
    required: ['books', 'page', 'limit'],
};

const getBooksOpts = {
    schema: {
        query: {
            type: 'object',
            properties: {
                author: { type: 'string' },
                published_year: { type: 'integer' },
                page: { type: 'integer' },
                limit: { type: 'integer' },
                sort: { type: 'string', enum: ['asc', 'desc'] },
            },
        },
        response: {
            200: bookSchemaPaginated,
        },
    }
};

const getBookOpts = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
            },
            required: ['id'],
        },
        response: {
            200: bookSchema,
        },
    },
};

const postBookOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                author: { type: 'string' },
                isbn: { type: 'string', default: null },
                published_year: { type: 'integer', default: null },
            },
            required: ['title', 'author', 'isbn', 'published_year'],
        },
        response: {
            200: bookSchema,
        },
    },
};

const putBookOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                author: { type: 'string' },
                isbn: { type: 'string', default: null },
                published_year: { type: 'integer', default: null },
            },
            required: ['title', 'author', 'isbn', 'published_year'],
        },
        response: {
            200: bookSchema,
        },
    },
};

const deleteBookOpts = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
            },
            required: ['id'],
        },
        response: {
            200: bookSchema,
        },
    },
};

module.exports = { getBooksOpts, getBookOpts, postBookOpts, putBookOpts, deleteBookOpts };
