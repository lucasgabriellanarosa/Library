import BookCardSkeleton from "../components/BookCardSkeleton";

export default function SimilarBooksSkeleton() {
    return (
        <ul
            aria-hidden="true"
            className="flex overflow-x-auto gap-3 pt-3 pb-4 px-1 mb-3 animate-pulse"
        >
            {Array.from({ length: 15 }).map((_, i) => (
                <BookCardSkeleton variant="carousel" key={i} />
            ))}
        </ul>
    );
}