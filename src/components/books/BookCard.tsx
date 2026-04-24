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
}



function BookCard({ cover, title, author, rating = 0, bookKey }: BookCardProps) {

    const imgNotFound = 'https://placehold.co/400x600?text=No+Cover';

    return (
        <Link to={`/book/${encodeURIComponent(bookKey.replace('/works/', ''))}`}>
            <motion.li className="flex flex-col gap-0.5 border rounded-md bg-yellow-100 text-black p-1 md:p-2"
                variants={bookVariants}
            >

                <img src={cover != null ? cover : imgNotFound} alt={title} className="border aspect-2/3 object-cover w-full rounded-sm" />

                <div className="flex flex-col flex-1 gap-0.5 sm:gap-1">

                    <h3 className="font-semibold tracking-tight leading-tight line-clamp-2 min-h-[2.4em] content-center text-[11px] sm:text-sm 2xl:text-[14px]">{title}</h3>
                    <h4 className="text-[10px] font-light tracking-wider italic line-clamp-1 sm:text-[11px] 2xl:text-sm">{author}</h4>
                    <StarsList rating={rating} />

                </div>

            </motion.li>
        </Link>
    )
}

export default BookCard