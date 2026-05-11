import { bookContainerVariants } from "../../../utils/animations/bookAnimations";
import BookCard from "../../books/BookCard"
import { motion } from "framer-motion";
import BookCardSkeleton from "../../skeleton/BookCardSkeleton";
import type { BookType } from "../../../@types/BookType";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { useBooks } from "../../../hooks/useBooks";

function SearchResults() {

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
        setSearchParams({ q: query, page: newPage.toString() });
    };

    if (loading) {
        return (
            <>
                <h1 className="italic">Searching for "{query}"...</h1>

                <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                    {Array.from({ length: 16 }).map((_, i) => (
                        <BookCardSkeleton key={i} />
                    ))}
                </ul>

            </>
        )
    }


    return (
        <>
            <h1 className="italic">Results for "{query}" (Page {currentPage})</h1 >

            <motion.ul
                className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
                variants={bookContainerVariants}
                initial="hidden"
                animate="visible"
            >
                {books.map((book, index) => (
                    <BookCard
                        cover={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null}
                        title={book.title || 'Unknown Title'}
                        author={book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
                        rating={book.ratings_average || 0}
                        bookKey={book.key}
                        key={book.key}
                        index={index}
                    />
                ))}
            </motion.ul>

            {
                books.length > 0 && (
                    <div className="flex flex-col items-center gap-2 py-8">
                        <div className="flex items-center justify-center gap-4 text-xs">
                            <button
                                disabled={currentPage <= 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                aria-label="Previous Books"
                                className="px-3 py-1 min-w-18.75 bg-darkPurple text-white rounded disabled:opacity-30 disabled:hover:cursor-not-allowed enabled:hover:cursor-pointer enabled:hover:bg-darkPurple/80"
                            >
                                Previous
                            </button>

                            <span>
                                Page <strong>{currentPage}</strong>/{totalPages}
                            </span>

                            <button
                                disabled={currentPage >= totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                                aria-label="Next Books"
                                className="px-3 py-1 min-w-18.75 bg-darkPurple text-white rounded disabled:opacity-30 disabled:hover:cursor-not-allowed enabled:hover:cursor-pointer enabled:hover:bg-darkPurple/80"
                            >
                                Next
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-400">{totalResults} books found</p>
                    </div>
                )
            }
        </>
    )
}

export default SearchResults