import { useQuery } from '@apollo/client'; // Graphql is a query language and is not js, we need to import gql package to help parse the query
import React from 'react';
import { getBookQuery } from "../queries/queries"

function BookDetails({ selected, onChange }) {
	const { loading, error, data } = useQuery(getBookQuery, {
		skip: selected === '',
		variables: { id: selected }
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
	if (selected === '') return <p style={{ textAlign: "center" }}>Select a book to learn more!</p>;

	const handleSubmit = (e) => {
		e.preventDefault()
		onChange('')
	}

	const isSelected = () => {
		if (selected !== '') {
			const {
				book: { name, genre, author }
			} = data;
			const books = author.books.map(book => <li key={book.id}>{book.name}</li>)
			return (
				<div>
					<form onSubmit={handleSubmit}>
						<p>Name: {name}</p>
						<p>Genre: {genre}</p>
						<p>Author: {author.name}</p>
						<p>Other books by author: {books}</p>
						<button type="submit" >Close select screen</button>
					</form>
				</div>
			)
		}
	}

	return (
		<div id="book-details">
			<p>Selected Book Details</p>
			{isSelected()}
		</div>
	)
}

export default BookDetails;