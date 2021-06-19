const swaggerOptions = {
    swaggerDefinition : {
        info:{
            title: 'FIRE 102 - API',
            description: 'The server side api of mobile apllication',
            contact: {
                name: 'Daniel Modilevsky'
            },
        },
        servers: [
            "https://localhost:8080"
        ]
    },
    apis: ['api/*/*.route.js'],
    definitions: {
        marker: {
            type: "object",
            properties: {
                displayName: {
                    type: "string"
                },
            }
        }
    }
}

module.exports = swaggerOptions