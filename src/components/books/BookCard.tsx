import { Link } from "react-router";
import StarsList from "../../features/books/StarsList";
import { motion } from "framer-motion";
import { bookVariants } from "../../utils/animations/bookAnimations";

interface BookCardProps {
    cover: string | null;
    title: string;
    author: string;
    rating?: number;
    bookKey: string;
    index: number;
    variant: "carousel" | "grid"
}

function BookCard({ cover, title, author, rating = 0, bookKey, index, variant }: BookCardProps) {

    const imgNotFound = 'https://placehold.co/400x600?text=No+Cover';

    return (
        <motion.li className={`flex flex-col gap-0.5 border rounded-md bg-yellow-100 text-black p-1 md:p-2 hover:bg-yellow-200 transition-all focus-within:outline-2  ${variant == 'carousel' ? 'shrink-0 w-24 md:w-28 xl:w-32 focus-within:-outline-offset-1 focus-within:outline-indigo-600': 'hover:scale-105 focus-within:outline-offset-4 focus-within:outline-orange-500'}`}
            variants={bookVariants}
        >
            <Link to={`/book/${encodeURIComponent(bookKey.replace('/works/', ''))}`} className="focus-within:ring-0 focus-within:outline-0">

                <img loading={index < 4 ? "eager" : "lazy"} fetchPriority={index < 4 ? "high" : "auto"} decoding="async" 
                src={cover != null ? '//wsrv.nl/?url=' + cover + '&output=webp&q=80' : imgNotFound} alt={title} 
                className="border aspect-2/3 object-cover w-full rounded-sm" />

                <div className="flex flex-col flex-1 gap-0.5 sm:gap-1">

                    <h3 className="font-semibold tracking-tight leading-tight line-clamp-2 min-h-[2.4em] content-center text-[11px] sm:text-sm 2xl:text-[14px]">{title}</h3>
                    <h4 className="text-[10px] font-light tracking-wider italic line-clamp-1 sm:text-[11px] 2xl:text-sm">{author}</h4>
                    <StarsList rating={rating} />

                </div>

            </Link>

        </motion.li>
    )
}

export default BookCard