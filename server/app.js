const express = require("express")
const app = express()
const PORT = 4000
const { graphqlHTTP } = require('express-graphql') //Convention for express-graphql, allows express to understand graphql and to create an express server that runs the graphql api => use it as middleware on a single route that interacts with graphql 
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const { MONGODB } = require('../config.js')

const cors = require('cors') // Allows cross-origin (from different servers) requests
app.use(cors())

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => console.log(`Connection is open on port ${PORT}`))


app.use('/graphql', graphqlHTTP({ // When that endpoint is hit, the express-graphql function handles teh graphql request
	graphiql: true,
	schema
})) // Have to pass in a schema so that the it can parse the query




app.listen(PORT, () => console.log(`Server to request on port ${PORT}`))