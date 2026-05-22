import { useEffect, useRef, useState } from "react";
import type { BookDataType } from "../../../../@types/BookData";

export default function BookDetailsSection({bookData}: {bookData: BookDataType}) {

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
        <div className="w-4/5 flex flex-col justify-center items-center lg:flex lg:flex-row lg:items-start xl:p-4 xl:gap-10 2xl:gap-16">

            {/* Description and Comments */}
            <div className="flex flex-col gap-6 max-w-2xl lg:max-w-3xl xl:max-w-fit xl:flex-1">

                {/* Description */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-base font-semibold">Description</h3>

                    <p ref={descriptionRef} className={`text-justify text-gray-700 transition-all duration-300 lg:text-sm ${!isExpanded ? 'line-clamp-6' : ''}`}>
                        {bookData.description}
                    </p>

                    {showButton && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="w-fit px-4 py-2 bg-[#E9DCC0] text-[#8B5C14] font-bold rounded-md border border-[#D9C8A9] shadow-sm active:scale-95 transition-all self-center xl:self-end hover:bg-[#dcd0b3] hover:cursor-pointer"
                        >
                            {isExpanded ? '- Show less' : '+ Read more'}
                        </button>
                    )}

                </div>

                {/* Future: Comments Section */}

            </div>

            {/* It was the AI ChatBot in desktop before
            But I've decided to change it to a author info card
            */}
            <div className="hidden mb-4 w-2/5 max-w-lg h-96 bg-white rounded-2xl shadow-2xl border border-amber-100 flex-col overflow-hidden xl:flex">

            </div>

        </div>
    )
}
