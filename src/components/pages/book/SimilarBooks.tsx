import { useEffect, useState } from "react";

// Data
import { useBooks } from "../../../hooks/useBooks";
import type { BookDataType } from "../../../@types/BookData";

// Components
import SimilarBooksSkeleton from "../../skeleton/BookPage/SimilarBooksSkeleton";
import BookCard from "../../books/BookCard";

// Animation
import { motion } from "framer-motion";
import { bookContainerVariants } from "../../../utils/animations/bookAnimations";

interface SimilarBooksProps {
    bookData: BookDataType;
    workId: string;
}

interface similarBooksType {
    key: string,
    cover_i: number,
    author_name: string,
    ratings_average: number,
    title: string
}

function SimilarBooks({ bookData, workId }: SimilarBooksProps) {

    const [similarBooks, setSimilarBooks] = useState<similarBooksType[]>([])
    const { getSimilarBooks, loading } = useBooks();

    useEffect(() => {
        if (!bookData) return;

        const loadSimilarBooks = async () => {
            getSimilarBooks(bookData).then(data => {
                if (data) {
                    const filtered = data
                        .filter((b: any) => !b.key.includes(workId || ''))
                        .slice(0, 16);
                    setSimilarBooks(filtered);
                }
            })
        };

        loadSimilarBooks();
    }, [bookData, workId]);

    if (loading) {
        return <SimilarBooksSkeleton />
    }

    return (
        <motion.ul className="flex overflow-x-auto gap-1 pt-3 pb-4 px-1 mb-3 sm:gap-2 2xl:grid 2xl:grid-flow-col 2xl:grid-rows-2"
            variants={bookContainerVariants}
            initial="hidden"
            animate="visible"
        >
            {similarBooks.map((book, index) => (
                <BookCard
                    author={book.author_name}
                    bookKey={book.key}
                    index={index}
                    title={book.title}
                    key={book.key}
                    rating={book.ratings_average}
                    cover={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null}
                    variant="carousel"
                />
            ))}
        </motion.ul>
    )
}

export default SimilarBooks