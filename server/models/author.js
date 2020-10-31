const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({
	name: String,
	age: Number
})

// model based on particular schema. Making a model (a collection in a database) of books and the collection will have objects in the shape of the schema. 
module.exports = new mongoose.model('Author', authorSchema)