import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router";
import { FaBookOpen, FaCalendar, FaList, FaRobot } from "react-icons/fa6";

// Components & Features
import { StatusButtons } from "../features/books/StatusButtons";
import StarsList from "../features/books/StarsList";
import BookPageSkeleton from "../components/skeleton/BookPage/BookPageSkeleton";

// Lazy
const BookAIWhisper = lazy(() => import("../features/books/BookAIWhisper"))
const SimilarBooks = lazy(() => import("../components/pages/books/SimilarBooks"))

// Hooks
import { useUserLists } from "../hooks/useUserLists";
import { useBooks } from "../hooks/useBooks"
import { useBookAIChat } from "../hooks/useBookAiChat";

// Others imports
import {
  CATEGORY_STYLES,
  processCategories
} from "../utils/categories/bookCategories";
import { useAuthStore } from "../stores/useAuthStore";
import type { BookDataType } from "../@types/BookData";

function BookPage() {

  // Navigate & Params
  const navigate = useNavigate()
  const { workId, isbn } = useParams();

  // Hooks
  const { getBookWithAuthors, getWorkByISBN, getWorkDescription } = useBooks();
  const { getBookStatus, toogleBookStatus, loading: isUpdating } = useUserLists();
  const { user } = useAuthStore()

  // Load Book Data
  const [bookData, setBookData] = useState<BookDataType | null>(null);
  useEffect(() => {

    setBookData(null)

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

  // "Read More" button from description
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  // Check if the description needs a "Read More" button
  useEffect(() => {
    const element = descriptionRef.current;
    if (element) {
      setShowButton(element.scrollHeight > element.offsetHeight);
    }
  }, [bookData, workId])

  // Book Status (Read | To Read) logic
  const [bookStatus, setBookStatus] = useState<'Read' | 'To Read' | null>(null);
  const [activeAction, setActiveAction] = useState<'Read' | 'To Read' | null>(null);

  useEffect(() => {

    if (!user || !workId) return;

    const loadStatus = async () => {
      const status = await getBookStatus(workId)
      setBookStatus(status)
    }

    loadStatus()

  }, [workId, user]);


  // Toggle read and to read status
  const handleUpdateList = async (targetListName: 'Read' | 'To Read') => {

    if (!user) {
      navigate('/login')
      return alert("You need to be logged in to save it!");
    }

    setActiveAction(targetListName);

    const newStatus = await toogleBookStatus({
      targetListName,
      workId: workId!,
      bookData,
      currentStatus: bookStatus
    });

    setBookStatus(newStatus ?? null);
  };

  // AI Chatbot
  const {
    message,
    setMessage,
    chatHistory,
    isTyping,
    handleSendMessage,
  } = useBookAIChat({
    bookTitle: bookData?.title || "",
    bookAuthor: bookData?.author || "",
  });

  const [isChatAIOpen, setIsChatAIOpen] = useState(false);

  return (
    <section className="text-xs flex flex-col w-full justify-center items-center gap-6 xl:gap-10">

      {
        bookData ? (
          <>

            {/* Background Image & Card with book info */}
            < div className="relative w-full flex justify-center">

              <div className="absolute top-0 left-0 w-full h-72 xl:h-120 overflow-hidden">
                <img
                  fetchPriority="auto"
                  loading="lazy"
                  src={`https://covers.openlibrary.org/b/id/${bookData.cover}-M.jpg`}
                  className="w-full h-full object-cover opacity-80"
                />

                <div className="absolute inset-0 backdrop-blur-xs" />
              </div>

              <div className="relative z-10 bg-indigo-50/60 w-4/5 mt-32 flex flex-col items-center gap-2 rounded-md shadow-gray-500 shadow-sm max-w-md md:max-w-xl xl:mt-40">

                <div className="flex flex-col justify-center items-center px-4 gap-0.5 pb-2">

                  <div className="relative w-28 aspect-2/3 -mt-12">
                    <img
                      src={`https://covers.openlibrary.org/b/id/${bookData.cover}-M.jpg`}
                      alt={`${bookData.title} Cover`}
                      fetchPriority="high"
                      loading="eager"
                      className="absolute inset-0 w-full h-full object-cover shadow-lg rounded-sm"
                    />
                  </div>

                  <h1 className="font-semibold text-base text-center mt-2">
                    {bookData.title}
                  </h1>

                  <h2 className="italic text-sm text-gray-600">
                    {bookData.author}
                  </h2>

                  <StarsList rating={bookData.rating} />
                </div>

                <div className="flex flex-col justify-center items-center gap-4 bg-purple-50 rounded-b-md shadow-[0_-2px_15px_rgba(139,92,20,0.1)] w-full py-4 px-4">

                  <div className="flex flex-row gap-6 text-[10px] font-semibold text-gray-700">
                    <span className="flex gap-1 items-center uppercase">
                      <FaBookOpen /> {bookData.pages} pages
                    </span>

                    <span className="flex gap-1 items-center uppercase">
                      <FaCalendar /> {bookData.year}
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                      Categories
                    </span>

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
            <div className="w-4/5 min-h-20 flex flex-col gap-3 max-w-sm xl:max-w-lg">

              <StatusButtons
                bookStatus={bookStatus}
                isUpdating={isUpdating}
                activeAction={activeAction}
                onUpdate={handleUpdateList}
              />

              <button className="w-full py-2 font-bold rounded-md border shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-700 disabled:cursor-not-allowed" disabled>
                <FaList /> Add to List (soon)
              </button>

            </div>

            {/* Description & Chatbot (Desktop) */}
            <div className="w-4/5 flex flex-col justify-center items-center lg:flex lg:flex-row lg:items-start xl:p-4 xl:gap-10 2xl:gap-16">

              {/* Description and Comments */}
              <div className="flex flex-col gap-6 max-w-2xl lg:max-w-3xl xl:max-w-fit xl:flex-1">

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-semibold">Description</h3>

                  <p ref={descriptionRef} className={`text-justify text-gray-700 transition-all duration-300 ${!isExpanded ? 'line-clamp-6' : ''}`}>
                    {bookData.description}
                  </p>

                  {showButton && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="w-fit px-4 py-2 bg-[#E9DCC0] text-[#8B5C14] font-bold rounded-md border border-[#D9C8A9] shadow-sm active:scale-95 transition-all self-center xl:self-end"
                    >
                      {isExpanded ? '- Show less' : '+ Read more'}
                    </button>
                  )}

                </div>

                {/* Future: Comments Section */}

              </div>

              {/* DESKTOP */}
              <div className="hidden mb-4 w-2/5 max-w-lg h-96 bg-white rounded-2xl shadow-2xl border border-amber-100 flex-col overflow-hidden xl:flex">

                <Suspense fallback={<></>}>
                  <BookAIWhisper
                    bookTitle={bookData.title || ""}
                    message={message}
                    setMessage={setMessage}
                    chatHistory={chatHistory}
                    isTyping={isTyping}
                    handleSendMessage={handleSendMessage}
                  />
                </Suspense>

              </div>

            </div>

            {/* Similar Books */}
            <div className="w-4/5 max-w-2xl lg:max-w-3xl xl:max-w-fit xl:p-4">
              <h3 className="text-base font-semibold mb-4">Similar Books</h3>

              <Suspense fallback={<div className="w-4/5 h-52" />}>
                <SimilarBooks
                  bookData={bookData}
                  workId={workId || ""}
                />
              </Suspense>

            </div>

            {/* Ai Chatbot (Mobile) */}
            <div className="fixed bottom-6 right-6 z-100 flex flex-col items-end font-sans xl:hidden">
              {
                isChatAIOpen ? (
                  <div className="mb-4 w-72 sm:w-80 h-96 bg-white rounded-2xl shadow-2xl border border-amber-100 flex flex-col overflow-hidden">

                    <Suspense>
                      <BookAIWhisper
                        bookTitle={bookData.title || ""}
                        message={message}
                        setMessage={setMessage}
                        chatHistory={chatHistory}
                        isTyping={isTyping}
                        handleSendMessage={handleSendMessage}
                        setIsChatAIOpen={setIsChatAIOpen}
                      />
                    </Suspense>

                  </div>

                ) : (
                  <button
                    onClick={() => setIsChatAIOpen(!isChatAIOpen)}
                    className='bg-amber-600 text-white p-4 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center relative'
                  >
                    <FaRobot size={24} />

                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                    </span>
                  </button>
                )
              }
            </div>

          </>
        ) : (
          <BookPageSkeleton />
        )
      }

    </section >
  );
}

export default BookPage