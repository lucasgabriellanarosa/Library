import { useEffect, useState } from "react"
import { useBooks } from "../hooks/useBooks"
import { useParams } from "react-router";
import { HashLoader } from "react-spinners";
import type { StarType } from "../components/books/BookStar";
import BookStar from "../components/books/BookStar";
import { FaBookOpen, FaCalendar, FaList, FaRegBookmark } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

interface BookData {
  cover?: number;
  title?: string;
  description?: string;
  author: string;
  pages: number;
  year: number;
  rating: number;
  categories: string[];
}

function BookPage() {

  const { getBookWithAuthors, getWorkByISBN, getWorkDescription, loading } = useBooks();

  // Pega os parâmetros da URL
  const { workId, isbn } = useParams();

  // States
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {

    const loadBookData = async () => {
      if (!workId) return;

      const [workDetails, descriptionText] = await Promise.all([
        getBookWithAuthors(workId),
        getWorkDescription(workId)
      ]);

      const rawSubjects = workDetails?.subject || [];
      const cleanCategories = processCategories(rawSubjects);

      if (isbn) {
        const isbnDetails = await getWorkByISBN(isbn);
        console.log('ISBN: ', isbnDetails)

        setBookData({
          title: isbnDetails.title || workDetails?.title || "Título Indisponível",
          author: workDetails?.author_name?.[0] || "Autor Desconhecido",
          cover: isbnDetails.covers?.[0] || workDetails?.cover_i,
          pages: isbnDetails.number_of_pages || workDetails?.number_of_pages_median || 0,
          year: isbnDetails.publish_date || workDetails?.first_publish_year,
          description: isbnDetails.description || descriptionText,
          rating: workDetails?.ratings_average || 0,
          categories: cleanCategories
        });
      } else {
        setBookData({
          title: workDetails?.title || "Título Indisponível",
          author: workDetails?.author_name?.[0] || "Autor Desconhecido",
          cover: workDetails?.cover_i,
          pages: workDetails?.number_of_pages_median || 0,
          year: workDetails?.first_publish_year,
          description: descriptionText,
          rating: workDetails?.ratings_average || 0,
          categories: cleanCategories
        })
      }
    }

    loadBookData()

  }, [workId, isbn]);

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <HashLoader color="#D97706" size={50} />
    </div>
  );

  const stars = [1, 2, 3, 4, 5];

  // Categories
  const VALID_CATEGORIES = new Set([
    "Fantasy", "Fiction", "Adventure", "Magic", "Juvenile fiction",
    "History", "Romance", "Science fiction", "Mystery", "Religion",
    "Drama", "Horror", "Classic", "Thriller"
  ]);

  const CATEGORY_STYLES: Record<string, string> = {
    "Fantasy": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "Fiction": "bg-blue-100 text-blue-700 border-blue-200",
    "Adventure": "bg-amber-100 text-amber-700 border-amber-200",
    "Magic": "bg-purple-100 text-purple-700 border-purple-200",
    "Juvenile fiction": "bg-cyan-100 text-cyan-700 border-cyan-200",
    "History": "bg-stone-100 text-stone-700 border-stone-200",
    "Romance": "bg-rose-100 text-rose-700 border-rose-200",
    "Science fiction": "bg-indigo-100 text-indigo-700 border-indigo-200",
    "Mystery": "bg-slate-100 text-slate-700 border-slate-200",
    "Religion": "bg-yellow-100 text-yellow-700 border-yellow-200",
    "Drama": "bg-red-100 text-red-700 border-red-200",
    "Horror": "bg-zinc-800 text-zinc-100 border-zinc-900",
    "Classic": "bg-teal-100 text-teal-700 border-teal-200",
    "Thriller": "bg-orange-100 text-orange-700 border-orange-200",
  };

  const processCategories = (subjects: string[]) => {
    if (!subjects) return [];

    return subjects
      .filter(s => VALID_CATEGORIES.has(s))
      .slice(0, 5);
  };


  return (
    <div className="text-xs flex flex-col w-full gap-2 justify-center items-center">
      {bookData && (
        <div className="w-full flex flex-col items-center pb-10 gap-6">

          {/* Background Image & Card with book info */}
          <div className="relative w-full flex justify-center">

            <div className="absolute top-0 left-0 w-full h-87.5">
              <img
                src={`https://covers.openlibrary.org/b/id/${bookData.cover}.jpg`}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 backdrop-blur-xs" />
            </div>

            <div className="relative z-10 bg-yellow-50/60 w-4/5 mt-52 flex flex-col items-center gap-2 rounded-md shadow-gray-500 shadow-sm">

              <div className="flex flex-col justify-center items-center px-4 gap-0.5 pb-2">
                <img
                  src={`https://covers.openlibrary.org/b/id/${bookData.cover}.jpg`}
                  alt="Capa do livro"
                  className="relative w-28 -mt-12 shadow-lg rounded-sm"
                />
                <h1 className="font-semibold text-base text-center mt-2">{bookData.title}</h1>
                <h2 className="italic text-sm text-gray-600">{bookData.author}</h2>

                <ul className="flex gap-1 mt-2">
                  {stars.map((s) => {
                    const isFull = bookData.rating >= s - 0.3;
                    const isHalf = !isFull && bookData.rating >= s - 0.7;
                    const starType: StarType = isFull ? "full" : isHalf ? "half" : "empty";
                    return (
                      <li key={s} className="text-sm">
                        <BookStar type={starType} />
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="flex flex-col justify-center items-center gap-4 bg-amber-50 rounded-b-md shadow-[0_-2px_15px_rgba(139,92,20,0.1)] w-full py-4 px-4">
                <div className="flex flex-row gap-6 text-[10px] font-medium text-gray-700">
                  <span className="flex gap-1 items-center uppercase"><FaBookOpen /> {bookData.pages} pages</span>
                  <span className="flex gap-1 items-center uppercase"><FaCalendar /> {bookData.year}</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Categories</span>
                  <ul className="flex flex-wrap gap-1.5 justify-center">
                    {bookData.categories.map((cat) => (
                      <span
                        key={cat}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold border ${CATEGORY_STYLES[cat]}`}
                      >
                        {cat}
                      </span>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Add to list buttons */}
          <div className="w-4/5 flex flex-col gap-3">

            <div className="flex flex-row gap-3">
              <button className="w-full py-2 bg-emerald-100 text-emerald-700 font-bold rounded-md border border-emerald-200 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2">
                <FaCheckCircle /> Mark as Read
              </button>

              <button className="w-full py-2 bg-[#E9DCC0] text-[#8B5C14] font-bold rounded-md border border-[#D9C8A9] shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2">
                <FaRegBookmark /> Read Later
              </button>
            </div>

            <button className="w-full py-2 bg-[#E9DCC0] text-[#8B5C14] font-bold rounded-md border border-[#D9C8A9] shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2">
              <FaList /> Add to List
            </button>

          </div>

          {/* Description */}
          <div className="w-4/5 flex flex-col gap-2 mt-6">
            <h3 className="text-base font-semibold">Description</h3>

            <p className={`text-justify text-gray-700 transition-all duration-300 ${!isExpanded ? 'line-clamp-6' : ''}`}>
              {bookData.description}
            </p>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-fit px-4 py-2 bg-[#E9DCC0] text-[#8B5C14] font-bold rounded-md border border-[#D9C8A9] shadow-sm active:scale-95 transition-all self-center"
            >
              {isExpanded ? '- Show less' : '+ Read more'}
            </button>
          </div>


        </div>
      )}
    </div>
  );
}

export default BookPage