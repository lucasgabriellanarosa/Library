import { Link } from "react-router";
import BookStar from "./BookStar";

interface BookCardProps {
    cover: string | null;
    title: string;
    author: string;
    rating?: number;
    bookKey: string;
}

type starType = "full" | "half" | "empty";

function BookCard({ cover, title, author, rating = 0, bookKey }: BookCardProps) {

    const stars = [1, 2, 3, 4, 5];

    const imgNotFound = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAALVBMVEXz9Pa5vsq2u8j29/jN0dno6u7V2N++ws3w8fTf4efi5OnFydPY2+HJztbR1txPmUB/AAAC0klEQVR4nO3b55aqMBiFYUoioXn/l3ukKSVBJGH4ctb7/JxRVrYbCDVJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArPLQ7g60YnSjwmoqc3eouarOwmsrOT026TXKu4NNyosCioloissSFndn6+VlNgwn6EY4LrKUsCnm7TCaNuiudFqoiIT9Spo9Ak+Hj77GWsKUMSasAi+2lJMwIeE5JPxLtoRGa8+xiU5YqX5urBuf4UlO+Eyn+br2OHaWm9DU2eeoK2tOL1Vuwucs4Is+u1SxCctlwLQ4O0SpCfN6fXpw9thZakK9qjDN1MmlSk24Xkm/jdG9sxWaMG82CXc3ROXe2UpN+PgpYbffbRwtCk3421qqug+7WpSa0Pywp5lmTnuLUhNaZgvHt4yafgx7i1ITbq4sOoeoZm3bWhSbcDHyF8d0YNRiVba0KDdhMj/yTl2Twep3sLQoOOGrnmn4hePEf9mg/acQnDDJK1V013Trh3HMdesGbS1KTpj0FzG0cQ3O0qClReEJd9ka3LYYb0LzdARcRYw3oavB9YoabUJ3g6sWY0241+CyxUgSmtWFqP0GFy3GkVCnhZ7vPdqvAT8txpAw10WazYf4vcFZizEk1P3fPy0eabD7xnC+JT9h12D/j3o8djvWYH83ufu4/IT6PeKhxYMNdqdSUSScGny3eLTBaBLqxaAL/W0ejC3hvMEh4uF8kSTU+xmiT7hp8L9L6NVgBAk9G4wgoWeD4hN6Nyg+oXeD0hPmxw9dYk24vX9IQhLem21AQhKS8H6hE8q+TtPdVvM1hJKaMBwS/iUSnpILSji+FaTCvgk83oer707XmR70uuTdNSXh3bX384hXvH8Yeus+x2ye1gtGxjukSVJdllBGhUn3QKL/wdpWJmQd7em2CLoV9ltiq0XsZia6fITVCCoQAAAAAAAAAAAAAAAAAAAAAAAAAAAAuMU/B0kslFd7c1EAAAAASUVORK5CYII=';

    return (
        <Link to={`/book/${encodeURIComponent(bookKey.replace('/works/', ''))}`}>
            <li className="flex flex-col gap-0.5 border rounded-md bg-yellow-100 text-black p-1">
                <img src={cover != null ? cover : imgNotFound} alt={title} className="border aspect-2/3 object-cover w-full rounded-sm" />

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
                                <li key={s} className="text-xs">
                                    <BookStar type={starType} />
                                </li>
                            );
                        })}
                        
                    </ul>
                </div>
            </li>
        </Link>
    )
}

export default BookCard