import { gql } from '@apollo/client';

// Making a query
const getBooksQuery = gql`
	{
		books {
			name
			id
		}
	}
`
const getAuthorsQuery = gql`
	{
		authors {
			name
			id
		}
	}
`
const getBookQuery = gql`
	query($id: ID){
		book(id: $id) {
			id
			name
			genre
			author {
				id
				name
				age
				books {
					name
					id
				}
			}
    	}	
	}
`

// query variable after mutation -$ signifies that it is a query variable, ! means its required => this just describes what variables are being passed in and passes them into the inner function
// AddBook doesnt have to be named, but it seems converntion has it be the same function but capitalized
const addBookMutation = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			name
    }
  }
`

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery }
