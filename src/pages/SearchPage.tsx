import { useSearchParams } from "react-router"
import { useBooks } from "../hooks/useBooks";
import { useEffect, useState } from "react";
import BookCard from "../components/books/BookCard";
import { HashLoader } from "react-spinners";

// Types
import type { BookType } from "../@types/BookType";

function SearchPage() {

  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { searchBooks, loading } = useBooks();

  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    if (query.trim().length >= 3) {
      searchBooks(query).then(data => {
        if (data && data) {
          console.log(data)
          setBooks(data);
        } else {
          setBooks([]);
        }
      });
    }
  }, [query])

  return (
    <main className="px-4 flex flex-col gap-4">

      {
        loading ?
          <div className="flex flex-col gap-6 items-center justify-center min-h-[60vh]">
            <HashLoader
              color="#D97706"
              loading={loading}
              size={50}
            />
            <p className="text-base font-semibold">Buscando livros...</p>
          </div>
          :
          <>
            <h1 className="font-light italic text-xs">Resultados para "{query}"...</h1>

            <ul className="grid grid-cols-2 gap-3">
              {
                books.map((book, index) => (
                  <BookCard
                    key={index}
                    cover={book.editions?.docs[0]?.cover_i ? `https://covers.openlibrary.org/b/id/${book.editions.docs[0].cover_i}-M.jpg` : null}
                    title={book.editions?.docs[0]?.title_suggest || book.editions?.docs[0]?.title || book.title || 'Título Desconecido'}
                    author={book.author_name ? book.author_name.join(', ') : 'Desconhecido'}
                    rating={book.ratings_average || 0}
                  />
                ))
              }
            </ul>
          </>
      }


    </main>
  )
}

export default SearchPage