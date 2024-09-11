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

const getBooksOpts = {
    schema: {
        query: {
            type: 'object',
            properties: {
                author: { type: 'string' },
                published_year: { type: 'integer' },
                page: { type: 'integer' },
                limit: { type: 'integer' },
            },
        },
        response: {
            200: {
                type: 'array',
                items: bookSchema,
            },
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
