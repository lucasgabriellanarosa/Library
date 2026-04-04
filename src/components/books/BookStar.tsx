import { FaStar, FaStarHalfStroke, FaRegStar } from "react-icons/fa6";

// Definimos os três tipos possíveis de estrela
export type StarType = "full" | "half" | "empty";

interface BookStarProps {
  type: StarType;
}

function BookStar({ type }: BookStarProps) {
  // Definimos a cor base (amarelo ouro para cheia/metade, cinza para vazia)
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