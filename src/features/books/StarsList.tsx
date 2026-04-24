import type { StarType } from "../../components/books/BookStar";
import BookStar from "../../components/books/BookStar";


function StarsList({rating = 0}: {rating: number}) {

    const stars = [1, 2, 3, 4, 5];

    return (

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
                const starType: StarType = isFull ? "full" : isHalf ? "half" : "empty";

                return (
                    <li key={s} className="text-[10px]">
                        <BookStar type={starType} />
                    </li>
                );
            })}

        </ul>
    )
}

export default StarsList