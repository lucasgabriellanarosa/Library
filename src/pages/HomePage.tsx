import BookCard from "../components/books/BookCard";
import Navbar from "../components/layout/Navbar";
import SearchBooksForm from "../features/ui/SearchBooksForm";
import type { BookType } from "../@types/BookType";
import { motion } from "framer-motion";
import { bookContainerVariants } from "../utils/animations/bookAnimations";
import { useBooks } from "../hooks/useBooks";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function HomePage() {

  const { getPopularBooks, loading } = useBooks();
  const [popularBooks, setPopularBooks] = useState<BookType[]>([]);

  useEffect(() => {
    getPopularBooks().then(data => setPopularBooks(data));
  }, []);

  const columnsBg = [
    'linear-gradient(to right, #2d1633 33.33%, #2d1633 33.33%)',
    'linear-gradient(to right, #1a224a 33.33%, #1a224a 33.33%)',
    'linear-gradient(to right, #161e38 33.33%, #161e38 33.33%)'
  ].join(', ');

  const overlayGradient = 'linear-gradient(to bottom, rgba(30, 27, 75, 0.2) 0%, rgba(30, 27, 75, 0.8) 50%, #1e1b4b 100%)';

  return (
    <>

      <Navbar />

      <div
        className="flex-1 w-full relative flex flex-col items-center justify-center px-8 min-h-dvh md:px-16"
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

        <main className="z-10 w-full flex flex-col items-center justify-center font-playfair gap-20 mt-40 py-8 text-yellow-50 md:gap-28 lg:gap-36 xl:gap-44 2xl:gap-50">

          <div className="flex flex-col gap-6 w-full max-w-md justify-center items-center sm:gap-12 lg:max-w-lg xl:max-w-xl">

            <div className="tracking-wide">

              <p className="uppercase text-yellow-600 font-extralight sm:text-base">Read. Rate. Share.</p>
              <h1 className="text-lg sm:text-xl">Organize your literary life</h1>

            </div>

            <SearchBooksForm />
          </div>



          <div className="w-full flex flex-col gap-2 max-w-md sm:max-w-160 lg:max-w-240 2xl:max-w-300">
            <h2 className="tracking-wide font-semibold text-sm sm:text-base lg:text-lg">Popular Books</h2>

            {
              loading ? (
                <LoadingSpinner loading={loading}/>
              ) : (
                <motion.ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-6 2xl:grid-cols-8 lg:gap-4"
                  variants={bookContainerVariants}
                  initial="hidden"
                  animate="visible"
                >

                  {
                    popularBooks.map((book, index) => (
                      <BookCard
                        cover={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null}
                        title={book.title}
                        author={book.author_name?.[0] || 'Unknown Author'}
                        rating={book.ratings_average}
                        key={index}
                        bookKey={book.key}
                      />
                    ))
                  }

                </motion.ul>
              )
            }



          </div>

        </main>

      </div>

    </>
  )
}
export default HomePage