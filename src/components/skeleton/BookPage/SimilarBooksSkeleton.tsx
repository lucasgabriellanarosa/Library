export default function SimilarBooksSkeleton() {
    return (
        <ul
            aria-hidden="true"
            className="flex overflow-x-auto gap-2 pb-3 mb-3 sm:gap-4 2xl:pb-4 2xl:mb-4 animate-pulse"
        >
            {Array.from({ length: 15 }).map((_, index) => (
                <li
                    key={index}
                    className="shrink-0 w-24 xl:w-30"
                >
                    <div className="w-full">

                        {/* Cover */}
                        <div className="relative shadow-md rounded-sm overflow-hidden">
                            <div className="w-full h-36 xl:h-45 bg-amber-100" />
                        </div>

                        {/* Title */}
                        <div className="mt-2 mb-1 flex flex-col gap-1 xl:mt-3">
                            <div className="h-2.5 w-full rounded-sm bg-amber-100 shadow-sm" />
                            <div className="h-2.5 w-4/5 rounded-sm bg-amber-100 shadow-sm" />
                        </div>

                        {/* Author */}
                        <div className="h-2 w-3/5 rounded-sm bg-amber-100 shadow-sm" />
                    </div>
                </li>
            ))}
        </ul>
    );
}