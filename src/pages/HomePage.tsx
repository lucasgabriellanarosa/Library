import { useNavigate } from "react-router"
import logoImg from "../assets/logo.png"
import { FaSearch } from "react-icons/fa";
import BookCard from "../components/books/BookCard";
import { useState } from "react";

function HomePage() {

  const books = [
    {
      cover: "https://m.media-amazon.com/images/I/81ibfYk4qmL.jpg",
      title: "Harry Potter e a Pedra Filosofal",
      author: "J.K. Rowling",
      rating: 3.8
    },
    {
      cover: "https://m.media-amazon.com/images/I/91b0C2YNSrL.jpg",
      title: "O Hobbit",
      author: "J.R.R. Tolkien",
      rating: 5.0
    },
    {
      cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjsVdApZL92qq46ekI3yptWW98d9_wXcOQKg&s",
      title: "O Senhor dos Anéis",
      author: "J.R.R. Tolkien",
      rating: 4.8
    },
    {
      cover: "https://m.media-amazon.com/images/I/61t0bwt1s3L._AC_UL320_.jpg",
      title: "1984",
      author: "George Orwell",
      rating: 4.2
    },
    {
      cover: "https://m.media-amazon.com/images/I/71Lwg0Bc3TL._AC_UL320_.jpg",
      title: "O Grande Gatsby",
      author: "F. Scott Fitzgerald",
      rating: 4.0
    },
    {
      cover: "https://m.media-amazon.com/images/I/41ls0DpJwOL._AC_SR240,220_.jpg",
      title: "O Alienista",
      author: "Machado de Assis",
      rating: 4.3
    },
    {
      cover: "https://m.media-amazon.com/images/I/51KSiJRhUnL._AC_SR480,440_.jpg",
      title: "Cartas de um Diabo a seu Aprendiz",
      author: "C.S. Lewis",
      rating: 4.6
    },
    {
      cover: "https://m.media-amazon.com/images/I/41QuEPYxcVL._AC_SR480,440_.jpg",
      title: "Crimes e Castigo",
      author: "Fiódor Dostoiévski",
      rating: 4.7
    },
    {
      cover: "https://m.media-amazon.com/images/I/51r2Y0dfwoL._SY445_SX342_ML2_.jpg",
      title: "A Hora da Estrela",
      author: "Clarice Lispector",
      rating: 4.4
    }
  ];

  const navigate = useNavigate()

  // Background variables for the columns and overlay
  const columnsBg = [
    'linear-gradient(to right, #2d1633 33.33%, #2d1633 33.33%)',
    'linear-gradient(to right, #1a224a 33.33%, #1a224a 33.33%)',
    'linear-gradient(to right, #161e38 33.33%, #161e38 33.33%)'
  ].join(', ');

  const overlayGradient = 'linear-gradient(to bottom, rgba(30, 27, 75, 0.2) 0%, rgba(30, 27, 75, 0.8) 50%, #1e1b4b 100%)';

  // Search Books function 
  const [query, setQuery] = useState('');

  const handleSearchBooks = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanQuery = query.trim();

    // Verifica se tem pelo menos 3 caracteres
    if (cleanQuery.length >= 3) {
      navigate(`/search?q=${encodeURIComponent(cleanQuery)}`);
    } else {
      // Você pode usar um alert ou um estado de erro no input
      alert('Por favor, digite pelo menos 3 caracteres para pesquisar.');
    }

  };

  return (
    <div className="font-inter min-h-dvh flex flex-col text-yellow-50 text-sm">

      <nav className="flex items-center justify-between px-4 bg-darkPurple fixed w-full z-20">
        <img src={logoImg} alt="Logo" className="w-12 h-12" />

        <div className="text-xs flex flex-row gap-2">
          <button onClick={() => navigate('/register')}>Cadastrar-se</button>
          <button onClick={() => navigate('/login')} className="border rounded-md px-2 py-1">Entrar</button>
        </div>
      </nav>

      <div
        className="flex-1 w-full relative flex flex-col items-center justify-center px-8"
        style={{
          backgroundImage: columnsBg,
          backgroundSize: '33.33% 100%, 33.33% 100%, 33.33% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left top, center top, right top'
        }}>

        <div
          className="absolute inset-0 z-0"
          style={{ backgroundImage: overlayGradient }}
        />

        <main className="z-10 w-full flex flex-col items-center justify-center font-playfair gap-20 mt-40 py-8">

          <div className="tracking-wide">

            <p className="uppercase text-yellow-600 font-extralight">Leia. Avalie. Compartilhe.</p>
            <h1 className="text-lg">Organize sua vida literária</h1>

          </div>

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

          <div className="w-full flex flex-col gap-2">
            <h2 className="tracking-wide font-semibold">Livros Populares</h2>

            <ul className="grid grid-cols-3 gap-2">

              {
                books.map((book, index) => (
                  <BookCard
                    cover={book.cover}
                    title={book.title}
                    author={book.author}
                    rating={book.rating}
                    key={index}
                  />
                ))
              }

            </ul>

          </div>

        </main>

      </div>

    </div>
  )
}
export default HomePage