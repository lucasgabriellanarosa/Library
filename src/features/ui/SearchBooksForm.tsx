import { useNavigate } from "react-router"
import { FaSearch, FaCamera } from "react-icons/fa";
import { useState } from "react";
import { IsbnScanner } from "./IsbnScanner";
import { useBooks } from "../../hooks/useBooks";

function SearchBooksForm() {
    const navigate = useNavigate();
    const { getWorkByISBN } = useBooks();
    const [query, setQuery] = useState('');
    const [isScannerOpen, setIsScannerOpen] = useState(false);

    const handleSearchBooks = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const cleanQuery = query.trim();
        if (cleanQuery.length >= 3) {
            navigate(`/search?q=${encodeURIComponent(cleanQuery)}`);
            setQuery("");
        } else {
            alert('Please enter at least 3 characters.');
        }
    };

    const handleIsbnRead = async (isbn: string) => {
        setIsScannerOpen(false);

        try {
            const data = await getWorkByISBN(isbn);

            if (data && data.works && data.works.length > 0) {
                const workId = data.works[0].key.replace('/works/', '');
                navigate(`/book/${workId}/${isbn}`);
            } else {
                alert("Book not found for this ISBN.");
            }
        } catch (error) {
            alert("Error retrieving ISBN. Check your connection.");
        }
    };

    return (
        <>
            <form
                className="flex items-center gap-3 bg-white rounded-lg py-2 px-4 w-full text-gray-950 text-xs font-inter max-w-lg border-2 border-gray-200 focus-within:border-yellow-500 focus-within:ring-4 focus-within:ring-yellow-500/20 transition-all duration-200"
                onSubmit={handleSearchBooks}
            >
                <label htmlFor="book-search" className="sr-only">
                    Input to search for books by title
                </label>
                <input
                    type="text"
                    placeholder="Search for books..."
                    id="book-search"
                    aria-label="Input to search for books by title"
                    className="flex-1 placeholder-gray-700 outline-none border-b border-transparent focus:border-gray-700"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <button
                    type="button"
                    onClick={() => setIsScannerOpen(true)}
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                    aria-label="Scan ISBN code and search for that book"
                >
                    <FaCamera size={16} aria-hidden="true" />
                </button>

                <button
                    type="submit"
                    className="text-gray-800 hover:scale-110 transition-transform"
                    aria-label="Submit form and search book by title"
                >
                    <FaSearch size={14} aria-hidden="true" />
                </button>
            </form>

            {isScannerOpen && (
                <IsbnScanner
                    onScanSuccess={handleIsbnRead}
                    onClose={() => setIsScannerOpen(false)}
                />
            )}
        </>
    )
}

export default SearchBooksForm