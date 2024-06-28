import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Book from './Book';
import AddForm from './AddForm';

const Category = (props) => {
    const [books, setBooks] = useState([]);

    // There's probably some problems with this, please test.
    useEffect(() => {
      const fetchAllBooks = async () => {
        try {
          const res = await axios.get('http://localhost:8800/books/category/'+props.name);
          setBooks(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchAllBooks();
    }, []);
  
    const handleDelete = async (id) => {
      try {
        await axios.delete('http://localhost:8800/books/' + id);
        // REMOVE THIS before merging with main
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };

    return(
        <div className="category">
          <div className='titleBar'>
            <h1>{props.name}</h1>
            <div className='chevronContainer'>
              <button className='chevron'><i class="fa-solid fa-circle-chevron-left"></i></button>
              <button className='chevron'><i class="fa-solid fa-circle-chevron-right"></i></button>
            </div>
          </div>
          <div className="books">
              {books.map((book) => (
                <Book title={book.title} description={book.description} price={book.price} cover={book.cover} id={book.id} key={book.id} handleDelete={handleDelete}/>
              ))}
              <AddForm />
          </div>
        </div>
    );
};

export default Category;