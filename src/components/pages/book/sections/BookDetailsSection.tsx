import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { BookDataType } from "../../../../@types/BookData";
import AuthorCardSkeleton from "../../../skeleton/BookPage/AuthorCardSkeleton";
import SimilarBooksSection from "./SimilarBooksSection";

const AuthorCard = lazy(() => import("../AuthorCard"));

interface SectionTypes {
    bookData: BookDataType,
    workId: string | undefined,
}

export default function BookDetailsSection({ bookData, workId }: SectionTypes) {
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
    }, [bookData])

    return (
        <div className="w-4/5 flex flex-col justify-center items-center gap-6 lg:flex lg:flex-row lg:items-start lg:gap-10 xl:p-4 2xl:gap-16">

            {/* Description and Comments */}
            {/* <div className="flex flex-col gap-6 max-w-2xl lg:w-3/5 lg:gap-10 xl:max-w-fit xl:flex-1"> */}
            <div className="flex flex-col gap-6 w-full lg:w-3/5 lg:gap-10 xl:max-w-fit xl:flex-1">

                {/* Description */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-base font-semibold">Description</h3>

                    <p ref={descriptionRef} className={`text-justify text-gray-700 transition-all duration-300 lg:text-sm ${!isExpanded ? 'line-clamp-6' : ''}`}>
                        {bookData.description}
                    </p>

                    {showButton && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="w-fit px-4 py-2 bg-[#E9DCC0] text-[#8B5C14] font-bold rounded-md border border-[#D9C8A9] shadow-sm active:scale-95 transition-all self-end hover:bg-[#dcd0b3] hover:cursor-pointer"
                        >
                            {isExpanded ? '- Show less' : '+ Read more'}
                        </button>
                    )}

                </div>

                {/* Similar Books */}
                <SimilarBooksSection 
                    bookData={bookData}
                    workId={workId}
                />

            </div>

            {/* Author Section */}
            <Suspense fallback={
                <AuthorCardSkeleton />
            }>
                <AuthorCard author_key={bookData.author_key} />
            </Suspense>

        </div>
    )
}