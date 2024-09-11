const getBookOpt = 
    {
        schema: {
         params: {
           id: { type: "string" }
          },
         response: {
           200: {
             type: "object",
             properties: {
              id: { type: "string" },
              name: { type: "string" },
              description: { type: "string" },
            },
           },
          },
        };
    }
module.exports = getBookOpt;