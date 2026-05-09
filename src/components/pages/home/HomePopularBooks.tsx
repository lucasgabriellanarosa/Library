import { useEffect, useState } from "react";
import type { BookType } from "../../../@types/BookType";

// Components & Hooks
import BookCard from "../../books/BookCard";
import BookCardSkeleton from "../../skeleton/BookCardSkeleton";
import { useBooks } from "../../../hooks/useBooks";

// Animation
import { motion } from "framer-motion";
import { bookContainerVariants } from "../../../utils/animations/bookAnimations";

function HomePopularBooks() {

    const { getPopularBooks, loading } = useBooks();
    const [popularBooks, setPopularBooks] = useState<BookType[]>([]);

    useEffect(() => {
        getPopularBooks().then(data => setPopularBooks(data));
    }, []);

    return (
        <>
            {
                loading ? (
                    <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-6 2xl:grid-cols-8 lg:gap-4">
                        {Array.from({ length: 16 }).map((_, i) => (
                            <BookCardSkeleton key={i} />
                        ))}
                    </ul>
                ) : (
                    <motion.ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-6 2xl:grid-cols-8 lg:gap-4"
                        variants={bookContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {
                            popularBooks.map((book, index) => (
                                <BookCard
                                    cover={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null}
                                    title={book.title}
                                    author={book.author_name?.[0] || 'Unknown Author'}
                                    rating={book.ratings_average}
                                    bookKey={book.key}
                                    key={book.key}
                                    index={index}
                                />

                            ))
                        }

                    </motion.ul>
                )
            }
        </>

    )
}

export default HomePopularBooks