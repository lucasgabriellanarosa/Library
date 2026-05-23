import { useEffect, useRef, useState } from "react";
import type { BookDataType } from "../../../../@types/BookData";

export default function BookDetailsSection({ bookData, authorData }: { bookData: BookDataType, authorData: any }) {
    console.log(authorData)
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
            <div className="flex flex-col gap-6 max-w-2xl lg:w-3/5 xl:max-w-fit xl:flex-1">

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

            {/* Author Section */}
            {
                authorData > [] ? (
                    <div className="flex bg-yellow-50 max-w-xs flex-col shadow-md rounded-md md:max-w-sm lg:max-w-xs">
                        <div className="w-full h-80 md:h-90 lg:h-80">
                            <img src={`https://covers.openlibrary.org/a/id/${authorData.photos[0]}-L.jpg`} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex flex-col gap-3 p-4 md:px-6 lg:py-2 lg:px-4 2xl:gap-4">
                            <p className="font-semibold text-xs w-full text-center md:text-sm 2xl:text-[15px]">
                                {authorData.name}
                                <br />
                                {
                                    authorData.fuller_name &&
                                    <span className="text-[10px] text-gray-600 font-normal italic md:text-[11px] 2xl:text-xs">{authorData.fuller_name}</span>
                                }
                            </p>

                            {
                                authorData.bio ? (
                                    <p className="text-[11px]/4 text-justify 2xl:text-xs/5">{authorData.bio.value  ? authorData.bio.value : authorData.bio}</p>
                                ) : (
                                    <p className="text-[11px]/4 text-justify 2xl:text-xs/5">There is not description available about this author.</p>
                                )

                            }

                            {
                                authorData.birth_date &&
                                <p className="font-semibold text-[11px] md:text-xs 2xl:text-sm">
                                    Born
                                    <span className="text-[10px] text-gray-600 ml-1 font-normal italic md:text-[11px] 2xl:text-xs">{authorData.birth_date}</span>
                                </p>
                            }

                        </div>
                    </div>

                ) : (
                    <div className="flex bg-white w-full min-h-20">
                    </div>
                )
            }


        </div>
    )
}