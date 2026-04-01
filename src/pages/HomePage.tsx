import { useEffect, useState } from "react";
import BookCard from "../components/books/BookCard";
import Navbar from "../components/layout/Navbar";
import SearchBooksForm from "../features/ui/SearchBooksForm";
import { useBooks } from "../hooks/useBooks";
import type { BookType } from "../@types/BookType";

function HomePage() {

  // const books = [
  //   {
  //     cover: "https://m.media-amazon.com/images/I/81ibfYk4qmL.jpg",
  //     title: "Harry Potter e a Pedra Filosofal",
  //     author: "J.K. Rowling",
  //     rating: 3.8
  //   },
  //   {
  //     cover: "https://m.media-amazon.com/images/I/91b0C2YNSrL.jpg",
  //     title: "O Hobbit",
  //     author: "J.R.R. Tolkien",
  //     rating: 5.0
  //   },
  //   {
  //     cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjsVdApZL92qq46ekI3yptWW98d9_wXcOQKg&s",
  //     title: "O Senhor dos Anéis",
  //     author: "J.R.R. Tolkien",
  //     rating: 4.8
  //   },
  //   {
  //     cover: "https://m.media-amazon.com/images/I/61t0bwt1s3L._AC_UL320_.jpg",
  //     title: "1984",
  //     author: "George Orwell",
  //     rating: 4.2
  //   },
  //   {
  //     cover: "https://m.media-amazon.com/images/I/71Lwg0Bc3TL._AC_UL320_.jpg",
  //     title: "O Grande Gatsby",
  //     author: "F. Scott Fitzgerald",
  //     rating: 4.0
  //   },
  //   {
  //     cover: "https://m.media-amazon.com/images/I/41ls0DpJwOL._AC_SR240,220_.jpg",
  //     title: "O Alienista",
  //     author: "Machado de Assis",
  //     rating: 4.3
  //   },
  //   {
  //     cover: "https://m.media-amazon.com/images/I/51KSiJRhUnL._AC_SR480,440_.jpg",
  //     title: "Cartas de um Diabo a seu Aprendiz",
  //     author: "C.S. Lewis",
  //     rating: 4.6
  //   },
  //   {
  //     cover: "https://m.media-amazon.com/images/I/41QuEPYxcVL._AC_SR480,440_.jpg",
  //     title: "Crimes e Castigo",
  //     author: "Fiódor Dostoiévski",
  //     rating: 4.7
  //   },
  //   {
  //     cover: "https://m.media-amazon.com/images/I/51r2Y0dfwoL._SY445_SX342_ML2_.jpg",
  //     title: "A Hora da Estrela",
  //     author: "Clarice Lispector",
  //     rating: 4.4
  //   }
  // ];

  // Background variables for the columns and overlay

  const [popularBooks, setPopularBooks] = useState<BookType[]>([]);
  const { searchPopularBooks, loading } = useBooks();

  useEffect(() => {
    const fetchPopularBooks = async () => {
      const books = await searchPopularBooks();
      setPopularBooks(books);
      console.log(books)
    };

    fetchPopularBooks();
  }, []);



  const columnsBg = [
    'linear-gradient(to right, #2d1633 33.33%, #2d1633 33.33%)',
    'linear-gradient(to right, #1a224a 33.33%, #1a224a 33.33%)',
    'linear-gradient(to right, #161e38 33.33%, #161e38 33.33%)'
  ].join(', ');

  const overlayGradient = 'linear-gradient(to bottom, rgba(30, 27, 75, 0.2) 0%, rgba(30, 27, 75, 0.8) 50%, #1e1b4b 100%)';

  return (
    <div>

      <Navbar />

      <div
        className="flex-1 w-full relative flex flex-col items-center justify-center px-8 min-h-dvh"
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

        {
          !loading &&
          <main className="z-10 w-full flex flex-col items-center justify-center font-playfair gap-20 mt-40 py-8 text-yellow-50 text-sm">

            <div className="tracking-wide">

              <p className="uppercase text-yellow-600 font-extralight">Read. Rate. Share.</p>
              <h1 className="text-lg">Organize your literary life</h1>

            </div>

            <SearchBooksForm />

            <div className="w-full flex flex-col gap-2">
              <h2 className="tracking-wide font-semibold">Popular Books</h2>

              <ul className="grid grid-cols-3 gap-2">

                {
                  popularBooks.map((book, index) => (
                    <BookCard
                      cover={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null}
                      title={book.title}
                      author={book.author_name?.[0] || 'Unknown Author'}
                      rating={book.ratings_average}
                      key={index}
                    />
                  ))
                }

              </ul>

            </div>

          </main>

        }


      </div>

    </div>
  )
}
export default HomePage