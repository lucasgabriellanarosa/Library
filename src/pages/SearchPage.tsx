import { useSearchParams } from "react-router"
import { useBooks } from "../hooks/useBooks";
import { useEffect, useState } from "react";
import BookCard from "../components/books/BookCard";
import { motion } from "framer-motion";
import { bookContainerVariants } from "../utils/animations/bookAnimations";

// Types
import type { BookType } from "../@types/BookType";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function SearchPage() {

  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { searchBooks, loading } = useBooks();

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
    <main className="px-4 pt-32 flex flex-col gap-4">

      {
        loading ?
          <LoadingSpinner loading={loading} text={`Searching for "${query}"...`} />
          :
          <>
            <h1 className="font-light italic text-xs">Results for "{query}"...</h1>

            <motion.ul className="grid grid-cols-2 gap-3"
              variants={bookContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {
                books.map((book, index) => (
                  <BookCard
                    key={index}
                    cover={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null}
                    title={book.title || 'Unknown Title'}
                    author={book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
                    rating={book.ratings_average || 0}
                    bookKey={book.key}
                  />
                ))
              }
            </motion.ul>
          </>
      }


    </main>
  )
}

export default SearchPage