import { useNavigate } from "react-router"
import { FaSearch, FaCamera } from "react-icons/fa";
import { useState } from "react";
import { useScannerStore } from "../../stores/useScannerStore";

function SearchBooksForm() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const handleSearchBooks = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const cleanQuery = query
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
            
        if (cleanQuery.length >= 3) {
            navigate(`/search?q=${encodeURIComponent(cleanQuery)}`);
            setQuery("");
        } else {
            alert('Please enter at least 3 characters.');
        }
    };

    const openScanner = useScannerStore((state) => state.openScanner);

    return (
        <form
            className="flex items-center gap-3 bg-white rounded-lg py-2 px-4 w-full text-gray-950 text-xs font-inter max-w-lg border-2 border-gray-200 focus-within:outline-2 focus-within:outline-orange-500 focus-within:outline-offset-4"
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
                className="flex-1 placeholder-gray-700 border-b border-transparent focus:border-gray-700 focus:outline-none focus:ring-0"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <button
                type="button"
                onClick={openScanner}
                className="text-gray-500 hover:text-blue-600 hover:cursor-pointer"
                aria-label="Scan ISBN code and search for that book"
            >
                <FaCamera size={16} aria-hidden="true" />
            </button>

            <button
                type="submit"
                className="text-gray-800 hover:scale-110 hover:cursor-pointer transition-transform"
                aria-label="Submit form and search book by title"
            >
                <FaSearch size={14} aria-hidden="true" />
            </button>
        </form>
    )
}

export default SearchBooksForm