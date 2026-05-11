import { useEffect, useState } from "react";
import { Link } from "react-router";

import { useBooks } from "../../../hooks/useBooks";
import type { BookDataType } from "../../../@types/BookData";

interface SimilarBooksProps {
    bookData: BookDataType;
    workId: string;
}

interface similarBooksType {
  key: string,
  cover_i: number,
  author_name: string,
  title: string
}

function SimilarBooks({bookData, workId}: SimilarBooksProps) {

  const [similarBooks, setSimilarBooks] = useState<similarBooksType[]>([])
  const { getSimilarBooks } = useBooks();

    useEffect(() => {
        if (!bookData) return;

        const loadSimilarBooks = async () => {
            getSimilarBooks(bookData).then(data => {
                if (data) {
                    const filtered = data
                        .filter((b: any) => !b.key.includes(workId || ''))
                        .slice(0, 15);
                    setSimilarBooks(filtered);
                }
            })
        };

        loadSimilarBooks();
    }, [bookData, workId]);

    return (
        <ul className="flex overflow-x-auto gap-2 pb-3 mb-3 sm:gap-4 2xl:pb-4 2xl:mb-4">
            {similarBooks.map((book) => (
                <li key={book.key} className="shrink-0 w-24 xl:w-30">
                    <Link
                        to={`/book/${book.key.replace('/works/', '')}`}
                        className="block group w-full"
                    >
                        <div className="relative shadow-md group-hover:shadow-xl transition-shadow">
                            <img
                                src={book.cover_i
                                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                                    : 'https://placehold.co/400x600?text=No+Cover'}
                                alt={book.title}
                                className="w-full h-36 object-cover rounded-sm xl:h-45"
                            />
                        </div>
                        <p className="mt-2 mb-1 text-[10px] font-bold line-clamp-2 min-h-[2.4em] leading-tight text-gray-800 group-hover:text-blue-600 xl:text-[11px] xl:mt-3">
                            {book.title}
                        </p>
                        <p className="text-[9px] text-gray-500 truncate xl:text-[10px]">
                            {book.author_name?.[0]}
                        </p>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default SimilarBooks