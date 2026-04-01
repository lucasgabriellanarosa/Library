import { useSearchParams } from "react-router"
import { useBooks } from "../hooks/useBooks";
import { useEffect, useState } from "react";
import BookCard from "../components/books/BookCard";

// Types
import type { BookType } from "../@types/BookType";

function SearchPage() {

  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { searchBooks } = useBooks();

  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    if (query.trim().length >= 3) {
      searchBooks(query).then(data => {
        if (data && data) {
          console.log(data)
          setBooks(data);
        } else {
          setBooks([]);
        }
      });

    }
  }, [query])


  return (
    <div>
      <h1>Resultados para: {query}</h1>

      <ul className="grid grid-cols-3 gap-2">
        {
          books.map((book, index) => (
            
            <BookCard
              key={index}
              cover={book.editions?.docs[0]?.cover_i ? `https://covers.openlibrary.org/b/id/${book.editions.docs[0].cover_i}-M.jpg` : null}
              title={book.editions?.docs[0]?.title_suggest || book.title}
              author={book.author_name ? book.author_name.join(', ') : 'Desconhecido'}
              rating={book.ratings_average || 0}
            />


          ))
        }
      </ul>
    </div>
  )
}

export default SearchPage