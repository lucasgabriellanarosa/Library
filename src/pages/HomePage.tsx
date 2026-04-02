import BookCard from "../components/books/BookCard";
import Navbar from "../components/layout/Navbar";
import SearchBooksForm from "../features/ui/SearchBooksForm";
import type { BookType } from "../@types/BookType";

function HomePage() {

  const POPULAR_BOOKS_MOCK: BookType[] = [
    {
      key: "/works/OL17930368W",
      title: "Atomic Habits",
      author_name: ["James Clear"],
      cover_i: 12539702,
      ratings_average: 3.97,
      author_key: ["OL7422948A"]
    },
    {
      key: "/works/OL82563W",
      title: "Harry Potter and the Philosopher's Stone",
      author_name: ["J.K. Rowling"],
      cover_i: 15155833,
      ratings_average: 4.48,
      author_key: ["OL23919A"]
    },
    {
      key: "/works/OL1968368W",
      title: "The 48 Laws of Power",
      author_name: ["Robert Greene"],
      cover_i: 6424160,
      ratings_average: 4.15,
      author_key: ["OL21519A"]
    },
    {
      key: "/works/OL25515697W",
      title: "Twisted Games",
      author_name: ["Ana Huang"],
      cover_i: 12821465,
      ratings_average: 4.02,
      author_key: ["OL7515087A"]
    },
    {
      key: "/works/OL5781992W",
      title: "The Kite Runner",
      author_name: ["Khaled Hosseini"],
      cover_i: 14846827,
      ratings_average: 4.31,
      author_key: ["OL1393669A"]
    },
    {
      key: "/works/OL2010879W",
      title: "Rich Dad, Poor Dad",
      author_name: ["Robert T. Kiyosaki"],
      cover_i: 8315603,
      ratings_average: 4.11,
      author_key: ["OL26244A"]
    },
    {
      key: "/works/OL21745884W",
      title: "Project Hail Mary",
      author_name: ["Andy Weir"],
      cover_i: 11200092,
      ratings_average: 4.67,
      author_key: ["OL3458023A"]
    },
    {
      key: "/works/OL18020194W",
      title: "It Ends With Us",
      author_name: ["Colleen Hoover"],
      cover_i: 10473609,
      ratings_average: 4.38,
      author_key: ["OL6906233A"]
    },
    {
      key: "/works/OL893415W",
      title: "Dune",
      author_name: ["Frank Herbert"],
      cover_i: 11481354,
      ratings_average: 4.30,
      author_key: ["OL79034A"]
    }
  ];

  const popularBooks: BookType[] = POPULAR_BOOKS_MOCK;

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

      </div>

    </div>
  )
}
export default HomePage