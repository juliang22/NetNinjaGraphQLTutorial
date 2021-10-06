import { useQuery, useMutation } from '@apollo/client'; // Graphql is a query language and is not js, we need to import gql package to help parse the query
import React, { useState } from 'react';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries"

function AddBook() {
	const { loading, error, data } = useQuery(getAuthorsQuery);
	const [name, setName] = useState('');
	const [genre, setGenre] = useState('');
	const [authorId, setAuthorId] = useState('');
	const [addBookMut, { dataMutation }] = useMutation(addBookMutation); //The useMutation React hook is the primary API for executing mutations in an Apollo application. To run a mutation, you first call useMutation within a React component and pass it a GraphQL string that represents the mutation. When your component renders, useMutation returns a tuple that includes:
	//A mutate function that you can call at any time to execute the mutation
	//An object with fields that represent the current status of the mutation's execution

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const handleSubmit = (e) => {
		e.preventDefault();
		addBookMut({
			variables: {
				name,
				genre,
				authorId
			},
			refetchQueries: [{ query: getBooksQuery }] //reruns the query to update with the added mutation
		})
		console.log(dataMutation);
	};

	return (
		<form id="add-book" onSubmit={handleSubmit}>
			<div className="field">
				<label>Book name:</label>
				<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
			</div>
			<div className="field">
				<label>Genre:</label>
				<input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
			</div>
			<div className="field">
				<label>Author:</label>
				<select value={authorId} onChange={(e) => setAuthorId(e.target.value)} >
					<option>Select author</option>
					{data.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)}
				</select>
			</div>
			<button type="submit">Add Book</button>
		</form>
	)

}

export default AddBook;