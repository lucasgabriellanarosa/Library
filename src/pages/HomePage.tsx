// import { useEffect, useState } from "react"
// import { useBooks } from "../hooks/useBooks"

// import { useAuthStore } from "../stores/useAuthStore"

import { useNavigate } from "react-router"
import logoImg from "../assets/logo.png"
import { FaSearch } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

function HomePage() {

  const navigate = useNavigate()

  // const { searchBooks } = useBooks()

  // const [books, SetBooks] = useState([])

  // useEffect(() => {
  //   const fetchInitialBooks = async () => {
  //     const data = await searchBooks();
  //     SetBooks(data.items || []);
  //   }
  //   fetchInitialBooks();
  // }, [])

  // const {user} = useAuthStore()

  // Background variables for the columns and overlay
  const columnsBg = [
    'linear-gradient(to right, #2d1633 33.33%, #2d1633 33.33%)',
    'linear-gradient(to right, #1a224a 33.33%, #1a224a 33.33%)',
    'linear-gradient(to right, #161e38 33.33%, #161e38 33.33%)'
  ].join(', ');

  const overlayGradient = 'linear-gradient(to bottom, rgba(30, 27, 75, 0.2) 0%, rgba(30, 27, 75, 0.8) 50%, #1e1b4b 100%)';

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

          <form className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 w-full max-w-md text-gray-950 text-xs font-inter">
            <input type="text" placeholder="Procure por um livro" className="w-full outline-0 placeholder-gray-700" />
            <span>
              <FaSearch />
            </span>
          </form>

          <div className="w-full flex flex-col gap-2">
            <h2 className="tracking-wide font-semibold">Livros Populares</h2>

            <ul className="grid grid-cols-3 gap-2">

              <li className="flex flex-col gap-0.5 border rounded-md bg-yellow-100 text-black p-1">
                <img src="https://m.media-amazon.com/images/I/81ibfYk4qmL.jpg" alt="Harry Potter e a Pedra Filosofal" className="border" />
                <h3 className="font-semibold tracking-tighter leading-tight line-clamp-2">Harry Potter e a Pedra Filosofal</h3>
                <h4 className="text-xs font-light italic">J.K. Rowling</h4>
                <ul className="text-xs text-yellow-600 flex gap-1">
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                </ul>
              </li>

              <li className="flex flex-col gap-0.5 border rounded-md bg-yellow-100 text-black p-1">
                <img src="https://m.media-amazon.com/images/I/81ibfYk4qmL.jpg" alt="Harry Potter e a Pedra Filosofal" />
                <h3 className="font-semibold tracking-tighter leading-tight line-clamp-2">Harry Potter e a Pedra Filosofal</h3>
                <h4 className="text-xs font-light italic">J.K. Rowling</h4>
                <ul className="text-xs text-yellow-600 flex gap-1">
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                </ul>
              </li>

              <li className="flex flex-col gap-0.5 border rounded-md bg-yellow-100 text-black p-1">
                <img src="https://m.media-amazon.com/images/I/81ibfYk4qmL.jpg" alt="Harry Potter e a Pedra Filosofal" />
                <h3 className="font-semibold tracking-tighter leading-tight line-clamp-2">Harry Potter e a Pedra Filosofal</h3>
                <h4 className="text-xs font-light italic">J.K. Rowling</h4>
                <ul className="text-xs text-yellow-600 flex gap-1">
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                </ul>
              </li>

              <li className="flex flex-col gap-0.5 border rounded-md bg-yellow-100 text-black p-1">
                <img src="https://m.media-amazon.com/images/I/81ibfYk4qmL.jpg" alt="Harry Potter e a Pedra Filosofal" />
                <h3 className="font-semibold tracking-tighter leading-tight line-clamp-2">Harry Potter e a Pedra Filosofal</h3>
                <h4 className="text-xs font-light italic">J.K. Rowling</h4>
                <ul className="text-xs text-yellow-600 flex gap-1">
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                </ul>
              </li>

              <li className="flex flex-col gap-0.5 border rounded-md bg-yellow-100 text-black p-1">
                <img src="https://m.media-amazon.com/images/I/81ibfYk4qmL.jpg" alt="Harry Potter e a Pedra Filosofal" />
                <h3 className="font-semibold tracking-tighter leading-tight line-clamp-2">Harry Potter e a Pedra Filosofal</h3>
                <h4 className="text-xs font-light italic">J.K. Rowling</h4>
                <ul className="text-xs text-yellow-600 flex gap-1">
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                </ul>
              </li>

              <li className="flex flex-col gap-0.5 border rounded-md bg-yellow-100 text-black p-1">
                <img src="https://m.media-amazon.com/images/I/81ibfYk4qmL.jpg" alt="Harry Potter e a Pedra Filosofal" />
                <h3 className="font-semibold tracking-tighter leading-tight line-clamp-2">Harry Potter e a Pedra Filosofal</h3>
                <h4 className="text-xs font-light italic">J.K. Rowling</h4>
                <ul className="text-xs text-yellow-600 flex gap-1">
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                  <li><FaStar /></li>
                </ul>
              </li>


            </ul>

          </div>

        </main>

      </div>

    </div>
  )
}
export default HomePage