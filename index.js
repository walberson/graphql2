const express = require('express')
const app = express()
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema');
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));


app.get('/', (req, res) => res.send('GraphQL is running on /graphql'))
app.listen(3000, () => console.log('🚀Server running on port 3000'))