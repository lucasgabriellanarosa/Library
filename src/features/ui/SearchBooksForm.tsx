import { useNavigate } from "react-router"
import { FaSearch } from "react-icons/fa";
import { useState } from "react";


function SearchBooksForm() {

    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const handleSearchBooks = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const cleanQuery = query.trim();
        setQuery("");

        if (cleanQuery.length >= 3) {
            navigate(`/search?q=${encodeURIComponent(cleanQuery)}`);
        } else {
            alert('Por favor, digite pelo menos 3 caracteres para pesquisar.');
        }

    };
    return (
        <form className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 w-full max-w-md text-gray-950 text-xs font-inter"
            onSubmit={(e) => handleSearchBooks(e)}
        >
            <input
                type="text"
                placeholder="Procure por um livro"
                className="w-full outline-0 placeholder-gray-700"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">
                <FaSearch />
            </button>
        </form>
    )
}

export default SearchBooksForm