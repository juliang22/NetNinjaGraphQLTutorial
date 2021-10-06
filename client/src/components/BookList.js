import { useQuery } from '@apollo/client'; // Graphql is a query language and is not js, we need to import gql package to help parse the query
import { getBooksQuery } from "../queries/queries"
import BookDetails from './BookDetails';
import React, { useState } from 'react';
import AddBook from "./AddBook"

function BookList() {
	// useQuery binds the component to the query
	const { loading, error, data } = useQuery(getBooksQuery);
	const [selected, setSelected] = useState('');
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const displayBooks = () => {
		return data.books.map(book => <li key={book.id} onClick={(e) => setSelected(book.id)} > {book.name}</ li>)
	}

	// function handleChange(newValue) {
	// 	setSelected(newValue);
	//   }

	return (
		<div id="main">
			<ul>
				<h1 id="book-list">{displayBooks()}</h1>
			</ul>
			<BookDetails selected={selected} onChange={setSelected} />
			<AddBook />
		</div>
	);
}

export default BookList;