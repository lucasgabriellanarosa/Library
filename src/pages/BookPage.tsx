import { useEffect, useState } from "react"
import { useBooks } from "../hooks/useBooks"
import { useParams } from "react-router";
import { HashLoader } from "react-spinners";

interface BookData {
  covers?: number[];
  title?: string;
  description?: { value: string };
}

function BookPage() {

  const { getWorkDetails, getWorkByISBN, loading } = useBooks();

  // Pega os parâmetros da URL
  const { workId, isbn } = useParams();

  // States
  const [bookData, setBookData] = useState<BookData | null>(null);

  useEffect(() => {

    setBookData(null); // Limpa os dados anteriores ao carregar um novo livro

    if (isbn) {
      getWorkByISBN(isbn).then(work => {
        console.log("Dados da edição via ISBN:", work);
        setBookData(work);
      });

    } else if (workId) {
      getWorkDetails(workId).then(work => {
        console.log("Dados da obra principal:", work);
        setBookData(work);
      });
    }
  }, [workId, isbn]);

  console.log('bookData:', bookData);

  return (
    <div className="text-xs flex flex-col w-full justify-center items-center gap-2">

      {
        loading ? (
          <div className="flex flex-col gap-6 items-center justify-center min-h-[60vh]">
            <HashLoader
              color="#D97706"
              loading={loading}
              size={50}
            />
          </div>
        ) : (
          <>

            {
              isbn ? (
                <h1>Página de ISBN Específico: {isbn}</h1>
              ) : (
                <h1>Página da Obra Principal (sem ISBN)</h1>
              )
            }

            {
              bookData && (
                <div className="flex flex-col gap-2">
                  {bookData.covers?.[0] && (
                    <img
                      className="max-w-50"
                      src={`https://covers.openlibrary.org/b/id/${bookData.covers[0]}.jpg`}
                      alt={bookData.title}
                    />
                  )}
                  <p><strong>Title:</strong> {bookData.title}</p>
                  <p><strong>Description:</strong> {bookData.description?.value ? bookData.description?.value : bookData.description}</p>
                </div>
              )
            }

          </>
        )
      }



    </div>
  );
}

export default BookPage