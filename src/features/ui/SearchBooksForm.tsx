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
            <form className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 w-full text-gray-950 text-xs font-inter max-w-lg"
                onSubmit={handleSearchBooks}
            >
                <input
                    type="text"
                    placeholder="Search for books..."
                    className="flex-1 outline-0 placeholder-gray-700"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                
                <button 
                    type="button" 
                    onClick={() => setIsScannerOpen(true)}
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                    <FaCamera size={16} />
                </button>

                <button type="submit" className="text-gray-800 hover:scale-110 transition-transform">
                    <FaSearch size={14} />
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