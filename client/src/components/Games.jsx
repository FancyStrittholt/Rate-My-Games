export default function Games() {}

// import {useDispatch, useSelector} from 'react-redux';
// import {useCheckoutMutation, useGetBooksMutation} from '../api/libraryApi';
// import {updateBooks} from '../app/slice';
// import {useEffect, useState} from 'react';
// import {useNavigate} from 'react-router-dom';

// export default function Books() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const token = useSelector((it) => it.state.token);
//     const books = useSelector((it) => it.state.books);
//     const [search, setSearch] = useState('');
//     const [filteredBooks, setFilteredBooks] = useState(books);

//     const [getBooks, {error, isLoading}] = useGetBooksMutation();
//     const [checkout, {isSuccess, error: checkoutError}] = useCheckoutMutation();

//     useEffect(() => {
//         fetchBooks();
//     }, []);

//     useEffect(() => {
//         if (search) {
//             const filtered = books.filter(
//                 (it) =>
//                     it.title.toLowerCase().includes(search.toLowerCase()) ||
//                     it.author.toLowerCase().includes(search.toLowerCase())
//             );
//             if (filtered.length > 0) {
//                 setFilteredBooks(filtered);
//             } else {
//                 setFilteredBooks([]);
//             }
//         } else {
//             setFilteredBooks(books);
//         }
//     }, [search]);

//     useEffect(() => {
//         if (!search && books && books.length > 0) {
//             setFilteredBooks(books);
//         }
//     }, [books]);

//     async function handleCheckout(id) {
//         await checkout({id, token});
//         await fetchBooks();
//     }

//     function showDetails(event) {
//         navigate(`/books/${event.target.value}`);
//     }

//     async function fetchBooks() {
//         try {
//             const response = await getBooks();
//             dispatch(updateBooks(response.data.books));
//             setFilteredBooks(response.data.books);
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     function createBooks() {
//         const books = [];

//         for (const book of filteredBooks) {
//             if (book.available) {
//                 books.push(
//                     <div key={book.id} className='flip-card'>
//                         <div className='flip-card-inner'>
//                             <div className='flip-card-front'>
//                                 <img className='book-image' src={book.coverimage} alt={book.title} />
//                             </div>
//                             <div className='flip-card-back'>
//                                 <div className='card-details'>
//                                     <span className='material-icons'>import_contacts</span>
//                                     <h2 className='book-title'> {book.title} </h2>
//                                     <p className='back-author'>Author: {book.author} </p>

//                                     <div className='card-actions'>
//                                         {token && (
//                                             <button onClick={() => handleCheckout(book.id)} className='checkout'>
//                                                 Checkout
//                                             </button>
//                                         )}
//                                         <br />
//                                         <button
//                                             value={book.id}
//                                             onClick={(event) => showDetails(event)}
//                                             className='show-details'
//                                         >
//                                             Show Details
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 );
//             }
//         }

//         return books;
//     }

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }

//     return (
//         <>
//             <div className='books-container'>
//                 <div className='search-container'>
//                     <label>Search by Title or Author</label>
//                     <span className='material-icons'>search</span>
//                     <input type='text' onChange={(event) => setSearch(event.target.value)}></input>
//                 </div>

//                 <div className='books'>{createBooks()}</div>
//             </div>
//         </>
//     );
// }
