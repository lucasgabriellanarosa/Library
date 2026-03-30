import BookStar from "./BookStar";

interface BookCardProps {
    cover: string;
    title: string;
    author: string;
    rating?: number;
}

type starType = "full" | "half" | "empty";

function BookCard({ cover, title, author, rating = 0 }: BookCardProps) {

    const stars = [1, 2, 3, 4, 5];

    return (
        <li className="flex flex-col gap-0.5 border rounded-md bg-yellow-100 text-black p-1">
            <img src={cover} alt={title} className="border aspect-2/3 object-cover w-full rounded-sm" />

            <div className="flex flex-col flex-1 gap-0.5">
                <h3 className="font-semibold tracking-tighter leading-tight line-clamp-2 min-h-[2.4em]">{title}</h3>
                <h4 className="text-xs font-light italic line-clamp-1">{author}</h4>

                <ul className="flex gap-1 mt-auto">

                    {stars.map((s) => {
                        /** * Full Star Logic:
                         * We subtract 0.3 from the star position to round up a rating like 4.7 to a full 5th star.
                         * Example: if rating is 4.7 and star (s) is 5, then 4.7 >= (5 - 0.3) is true.
                         */
                        const isFull = rating >= s - 0.3;

                        /** * Half Star Logic:
                         * If not full, we check if it reaches the 0.3 threshold of the current star.
                         * We subtract 0.7 from the star position to catch ratings from .3 up to .6.
                         * Example: if rating is 4.3 and star (s) is 5, then 4.3 >= (5 - 0.7) is true.
                         */
                        const isHalf = !isFull && rating >= s - 0.7;

                        // Determine the final star state based on the calculated thresholds
                        const starType: starType = isFull ? "full" : isHalf ? "half" : "empty";

                        return (
                            <li key={s}>
                                <BookStar type={starType} />
                            </li>
                        );
                    })}
                    
                </ul>
            </div>
        </li>
    )
}

export default BookCard