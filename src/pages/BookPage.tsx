import { useEffect, useState } from "react"
import { useBooks } from "../hooks/useBooks"
import { useParams } from "react-router";
import { HashLoader } from "react-spinners";
import type { StarType } from "../components/books/BookStar";
import BookStar from "../components/books/BookStar";

interface BookData {
  cover?: number;
  title?: string;
  description?: string;
  author: string;
  pages: number;
  year: number;
  rating: number;
}

function BookPage() {

  const { getBookWithAuthors, getWorkByISBN, loading } = useBooks();

  // Pega os parâmetros da URL
  const { workId, isbn } = useParams();

  // States
  const [bookData, setBookData] = useState<BookData | null>(null);

  useEffect(() => {

    const loadBookData = async () => {
      if (!workId) return;

      const workDetails = await getBookWithAuthors(workId);
      console.log('Work: ', workDetails)

      if (isbn) {
        const isbnDetails = await getWorkByISBN(isbn);
        console.log('ISBN: ', isbnDetails)

        setBookData({
          title: isbnDetails.title || workDetails?.title || "Título Indisponível",
          author: workDetails?.author_name?.[0] || "Autor Desconhecido",
          cover: isbnDetails.covers?.[0] || workDetails?.cover_i,
          pages: isbnDetails.number_of_pages || workDetails?.number_of_pages_median || 0,
          year: isbnDetails.publish_date || workDetails?.first_publish_year,
          description: workDetails?.description?.value || workDetails?.description || "Sem descrição.",
          rating: workDetails?.ratings_average || 0
        });
      } else {
        setBookData({
          title: workDetails?.title || "Título Indisponível",
          author: workDetails?.author_name?.[0] || "Autor Desconhecido",
          cover: workDetails?.cover_i,
          pages: workDetails?.number_of_pages_median || 0,
          year: workDetails?.first_publish_year,
          description: workDetails?.description?.value || workDetails?.description || "Sem descrição.",
          rating: workDetails?.ratings_average || 0
        })
      }
    }

    loadBookData()

  }, [workId, isbn]);

  console.log("BookData: ", bookData)

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <HashLoader color="#D97706" size={50} />
    </div>
  );

  const stars = [1, 2, 3, 4, 5];


  return (
    <div className="text-xs flex flex-col w-full gap-2 justify-center items-center">
      {
        bookData && (
          <>
            <div className="min-h-screen w-full flex flex-col items-center pb-10">

              <div className="relative w-full h-87.5 flex justify-center">
                <img
                  src={`https://covers.openlibrary.org/b/id/${bookData.cover}.jpg`}
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />

                {/* Camada que faz o desfoque "por cima" */}
                <div className="absolute inset-0 backdrop-blur-md" />

                <div className="relative z-10 bg-white/60 w-4/5 mt-52 flex flex-col items-center gap-2 h-fit rounded-md shadow-gray-500 shadow-sm py-2">
                  <img src={`https://covers.openlibrary.org/b/id/${bookData.cover}.jpg`} alt="Capa do livro" className="relative w-28 -mt-12" />

                  <h1>{bookData.title}</h1>
                  <h2>{bookData.author}</h2>

                  <ul className="flex gap-1 mt-auto">

                    {stars.map((s) => {
                      /** * Full Star Logic:
                       * We subtract 0.3 from the star position to round up a rating like 4.7 to a full 5th star.
                       * Example: if rating is 4.7 and star (s) is 5, then 4.7 >= (5 - 0.3) is true.
                       */
                      const isFull = bookData.rating >= s - 0.3;

                      /** * Half Star Logic:
                       * If not full, we check if it reaches the 0.3 threshold of the current star.
                       * We subtract 0.7 from the star position to catch ratings from .3 up to .6.
                       * Example: if rating is 4.3 and star (s) is 5, then 4.3 >= (5 - 0.7) is true.
                       */
                      const isHalf = !isFull && bookData.rating  >= s - 0.7;

                      // Determine the final star state based on the calculated thresholds
                      const starType: StarType = isFull ? "full" : isHalf ? "half" : "empty";

                      return (
                        <li key={s}>
                          <BookStar type={starType} />
                        </li>
                      );
                    })}

                  </ul>

                  <div>
                    <div className="flex flex-row gap-4 text-xs">
                      <span>{bookData.pages} pages</span>
                      <span>Published in {bookData.year}</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </>
        )
      }
    </div>
  );
}

export default BookPage

// src = {`https://covers.openlibrary.org/b/id/${bookData.covers[0]}.jpg`}
