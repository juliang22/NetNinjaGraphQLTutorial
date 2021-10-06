const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
	name: String,
	genre: String,
	authorId: String //dont need to define id properly because mongoose will automatically create one
})

// model based on particular schema. Making a model (a collection in a database) of books and the collection will have objects in the shape of the schema. 
module.exports = new mongoose.model('Book', bookSchema)