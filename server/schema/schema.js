const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull } = graphql
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author') //How we interact with the author collection

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve: (parent, args) => Author.findById(parent.authorId)
		}
	})
})


const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		age: { type: GraphQLInt },
		name: { type: GraphQLString },
		books: {
			type: new GraphQLList(BookType),
			resolve: (parent, args) => Book.find({ authorId: parent.id }) // use find not findById because we are looking in books for an authorid that matches the parent authorid, Book.findbyid(parent.id) would look in books for an entry where a book's id matches the author id (parent.id)
		}
	})
})

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: () => ({ // Can either have an immediate IIFE (immediately invoked function expression) or just pass in an object
		book: {
			type: BookType,
			args: {
				id: { type: GraphQLID }
			},
			// resolve is to get data fro db/other source
			resolve: (parent, args) => Book.findById(args.id)
		},
		books: {
			type: new GraphQLList(BookType),
			resolve: (parent, args) => Book.find() //find without any params returns all of them
		},
		author: {
			type: AuthorType,
			args: {
				id: { type: GraphQLID }
			},
			resolve: (parent, args) => Author.findById(args.id)
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve: (parent, args) => Author.find()
		},
	})
})

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: GraphQLString },
				age: { type: GraphQLInt }
			},
			resolve: (parent, args) => {
				let author = new Author({  //this is our Author model imported from author.js, different than AuthorType, thats for graphql interacting with the models
					name: new GraphQLNonNull(args.name),
					age: new GraphQLNonNull(args.age)
				})
				return author.save() // created new instance of data type and automatically have access to properties on the data type like save, knows how to save because we are already connected to the right database and the model defined how the data should be stored with it's schema, .save returns what was saved an d we return that to send it back

			}
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				authorId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve: (parent, args) => {
				let book = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId
				})
				return book.save()
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})
