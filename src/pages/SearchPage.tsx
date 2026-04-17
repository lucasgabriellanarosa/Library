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
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const { searchBooks, loading } = useBooks();
  const [books, setBooks] = useState<BookType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (query.trim().length >= 3) {
      searchBooks(query, currentPage).then(data => {
        if (data) {
          setBooks(data.docs);           
          setTotalPages(data.totalPages); 
          setTotalResults(data.numFound); 
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }, [query, currentPage]);

  const handlePageChange = (newPage: number) => {
    // Atualiza a URL mantendo a query atual
    setSearchParams({ q: query, page: newPage.toString() });
  };

  console.log(books.length)

  return (
    <main className="px-4 pt-32 flex flex-col gap-4">
      {loading ? (
        <LoadingSpinner loading={loading} text={`Searching for "${query}"...`} />
      ) : (
        <>
          <h1 className="font-light italic text-xs">Results for "{query}" (Page {currentPage})</h1>

          <motion.ul
            className="grid grid-cols-2 gap-3"
            variants={bookContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {books.map((book, index) => (
              <BookCard
                key={index}
                cover={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null}
                title={book.title || 'Unknown Title'}
                author={book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
                rating={book.ratings_average || 0}
                bookKey={book.key}
              />
            ))}
          </motion.ul>

          {!loading && books.length > 0 && (
            <div className="flex flex-col items-center gap-2 py-8">
              <div className="flex items-center justify-center gap-4 text-xs">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => handlePageChange(currentPage-1)}
                  className="px-3 py-1 min-w-18.75 bg-darkPurple text-white rounded disabled:opacity-30"
                >
                  Previous
                </button>

                <span>
                  Page <strong>{currentPage}</strong>/{totalPages}
                </span>

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => handlePageChange(currentPage+1)}
                  className="px-3 py-1 min-w-18.75 bg-darkPurple text-white rounded disabled:opacity-30"
                >
                  Next
                </button>
              </div>
              <p className="text-[10px] text-gray-400">{totalResults} books found</p>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default SearchPage