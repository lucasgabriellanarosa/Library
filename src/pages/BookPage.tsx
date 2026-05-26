import { useEffect, useState } from "react"
import { useParams } from "react-router";

// Components
import Dog404 from '../assets/404dog.svg'
import HeroSection from "../components/pages/book/sections/HeroSection";
import StatusButtonsSection from "../components/pages/book/sections/StatusButtonsSection";
import BookDetailsSection from "../components/pages/book/sections/BookDetailsSection";
import SimilarBooksSection from "../components/pages/book/sections/SimilarBooksSection";
import AIChatBotSection from "../components/pages/book/sections/AIChatBotSection";
import BookPageSkeleton from "../components/skeleton/BookPage/BookPageSkeleton";

// Hooks
import { useBooks } from "../hooks/useBooks"

// Others imports
import { processCategories } from "../utils/categories/bookCategories";
import { useAuthStore } from "../stores/useAuthStore";
import type { BookDataType } from "../@types/BookData";

function BookPage() {

  // Variables
  const { workId, isbn } = useParams();

  const { getFullBookData, getWorkByISBN, loading } = useBooks();
  const { user } = useAuthStore()

  const [bookData, setBookData] = useState<BookDataType | null>(null);

  // Get & Load bookData
  async function getBookData() {
    if (!workId) return;
    const bookDetails = await getFullBookData(workId)
    return bookDetails
  }

  const loadBookData = async () => {

    if (!workId) return;

    const bookDetails = await getBookData()

    if (bookDetails == null) {
      setBookData(null)
      return
    }

    const rawSubjects = bookDetails?.subject || [];
    const cleanCategories = processCategories(rawSubjects);

    const baseBookData = {
      title: bookDetails.title || "Title Unavailable",
      author: bookDetails.author_name?.[0] || "Author Unknown",
      author_key: bookDetails.author_key?.[0] || '',
      cover: bookDetails.cover_i,
      pages: bookDetails.number_of_pages_median || 0,
      year: bookDetails.first_publish_year,
      description: bookDetails.description,
      rating: bookDetails.ratings_average || 0,
      categories: cleanCategories
    }

    setBookData(baseBookData)

    if (isbn) {
      const isbnDetails = await getWorkByISBN(isbn)

      setBookData({
        ...baseBookData,
        title: isbnDetails.title || baseBookData.title,
        cover: isbnDetails.covers?.[0] || baseBookData.cover,
        pages: isbnDetails.number_of_pages || baseBookData.pages,
        year: isbnDetails.publish_date || baseBookData.year,
        description: isbnDetails.description || baseBookData.description,
      })
    }
  }

  useEffect(() => {
    // Clean Book
    setBookData(null)
    // Load new BookData
    loadBookData()
  }, [workId, isbn, user]);

  return (
    <section className="text-xs flex flex-col w-full justify-center items-center gap-6 xl:gap-10">

      {
        !loading ? (
          bookData ? (
            <>
              {/* Background Image & Card with book info */}
              <HeroSection
                bookData={bookData}
              />

              {/* Add to list buttons */}
              <StatusButtonsSection
                user={user}
                workId={workId}
                bookData={bookData}
              />

              {/* Description & Chatbot (Desktop) */}
              <BookDetailsSection
                bookData={bookData}
              />

              {/* Similar Books */}
              <SimilarBooksSection
                bookData={bookData}
                workId={workId}
              />

              {/* Ai Chatbot */}
              <AIChatBotSection
                bookData={bookData}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-8 min-h-[60dvh] w-4/5">
              <img src={Dog404} className="h-50" />
              <p className="text-sm">
                It looks like someone ate this book data as it was <span className="text-red-600 font-semibold">not found...</span>
                <br />
                <span className="inline-block mt-4 w-full text-end italic">Wonder if it was a good boy.</span>
              </p>
            </div>
          )
        ) : (
          <BookPageSkeleton />
        )

      }

    </section >
  );
}

export default BookPage