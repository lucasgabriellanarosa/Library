import { useEffect, useState } from "react"
import { useParams } from "react-router";

// Components
import HeroSection from "../components/pages/book/sections/HeroSection";
import StatusButtonsSection from "../components/pages/book/sections/StatusButtonsSection";
import BookDetailsSection from "../components/pages/book/sections/BookDetailsSection";
import BookPageSkeleton from "../components/skeleton/BookPage/BookPageSkeleton";
import SimilarBooksSection from "../components/pages/book/sections/SimilarBooksSection";
import AIChatBotSection from "../components/pages/book/sections/AIChatBotSection";

// Hooks
import { useBooks } from "../hooks/useBooks"

// Others imports
import {
  processCategories
} from "../utils/categories/bookCategories";

import { useAuthStore } from "../stores/useAuthStore";
import type { BookDataType } from "../@types/BookData";

function BookPage() {

  // Variables
  const { workId, isbn } = useParams();
  const { getBookWithAuthors, getWorkDescription, getWorkByISBN } = useBooks();
  const { user } = useAuthStore()

  const [bookData, setBookData] = useState<BookDataType | null>(null);

  // Get & Load bookData
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
        title: isbnDetails.title || workDetails?.title || "Title Unavailable",
        author: workDetails?.author_name?.[0] || "Author Unknown",
        cover: isbnDetails.covers?.[0] || workDetails?.cover_i,
        pages: isbnDetails.number_of_pages || workDetails?.number_of_pages_median || 0,
        year: isbnDetails.publish_date || workDetails?.first_publish_year,
        description: isbnDetails.description || descriptionText,
        rating: workDetails?.ratings_average || 0,
        categories: cleanCategories
      });
    } else {
      setBookData({
        title: workDetails?.title || "Title Unavailable",
        author: workDetails?.author_name?.[0] || "Author Unknown",
        cover: workDetails?.cover_i,
        pages: workDetails?.number_of_pages_median || 0,
        year: workDetails?.first_publish_year,
        description: descriptionText,
        rating: workDetails?.ratings_average || 0,
        categories: cleanCategories
      })
    }
  }

  useEffect(() => {
    // Clean BookData
    setBookData(null)
    // Load new BookData
    loadBookData()
  }, [workId, isbn, user]);

  return (
    <section className="text-xs flex flex-col w-full justify-center items-center gap-6 xl:gap-10">

      {
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
          <BookPageSkeleton />
        )
      }

    </section >
  );
}

export default BookPage