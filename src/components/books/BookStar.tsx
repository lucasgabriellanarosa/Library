import { FaStar, FaStarHalfStroke, FaRegStar } from "react-icons/fa6";

export type StarType = "full" | "half" | "empty";

interface BookStarProps {
  type: StarType;
}

function BookStar({ type }: BookStarProps) {
  const color = type === "empty" ? "text-gray-500" : "text-amber-500";

  return (
    <span className={`${color}`}>
      {type === "full" && <FaStar />}
      {type === "half" && <FaStarHalfStroke />}
      {type === "empty" && <FaRegStar />}
    </span>
  );
}

export default BookStar;