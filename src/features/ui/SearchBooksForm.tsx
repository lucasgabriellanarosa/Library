import { useNavigate } from "react-router"
import { FaSearch, FaCamera } from "react-icons/fa"; // Adicionei a FaCamera
import { useState } from "react";
import { IsbnScanner } from "./IsbnScanner"; // Importe o componente criado acima
import { useBooks } from "../../hooks/useBooks";

function SearchBooksForm() {
    const navigate = useNavigate();
    const { getWorkByISBN } = useBooks(); // Pega a função de busca
    const [query, setQuery] = useState('');
    const [isScannerOpen, setIsScannerOpen] = useState(false); // Controla a câmera

    // Função de busca normal (texto)
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

    // FUNÇÃO MÁGICA: Quando o scanner lê o código
    const handleIsbnRead = async (isbn: string) => {
        setIsScannerOpen(false); // Fecha a câmera
        
        try {
            const data = await getWorkByISBN(isbn);
            
            // A Open Library retorna o Work ID dentro de data.works[0].key
            // Ex: "/works/OL45883W" -> queremos só "OL45883W"
            if (data && data.works && data.works.length > 0) {
                const workId = data.works[0].key.replace('/works/', '');
                // Redireciona para /workId/isbn
                navigate(`/book/${workId}/${isbn}`);
            } else {
                alert("Livro não encontrado para este ISBN.");
            }
        } catch (error) {
            alert("Erro ao buscar ISBN. Verifique sua conexão.");
        }
    };

    return (
        <>
            <form className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 w-full max-w-md text-gray-950 text-xs font-inter"
                onSubmit={handleSearchBooks}
            >
                <input
                    type="text"
                    placeholder="Search for books..."
                    className="flex-1 outline-0 placeholder-gray-700"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                
                {/* Botão da Câmera */}
                <button 
                    type="button" 
                    onClick={() => setIsScannerOpen(true)}
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                    <FaCamera size={16} />
                </button>

                {/* Botão de Busca */}
                <button type="submit" className="text-gray-800 hover:scale-110 transition-transform">
                    <FaSearch size={14} />
                </button>
            </form>

            {/* Renderiza o Scanner apenas se estiver aberto */}
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