import { FaBookOpen, FaCalendar } from "react-icons/fa";
import type { BookDataType } from "../../../../@types/BookData";
import StarsList from "../../../../features/books/StarsList";
import { CATEGORY_STYLES } from "../../../../utils/categories/bookCategories";

export default function HeroSection({bookData}: {bookData:BookDataType}) {
    return (
        <div className="relative w-full flex justify-center">

            <div className="absolute top-0 left-0 w-full h-72 xl:h-120 overflow-hidden">
                <img
                    fetchPriority="high"
                    loading="eager"
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
    )
}
