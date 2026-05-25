export default function AuthorCardSkeleton() {
    return (
        <div className="flex bg-yellow-50 w-full max-w-xs flex-col shadow-md rounded-md md:max-w-sm lg:w-xs animate-pulse">

            <div className="w-full h-80 md:h-90 lg:h-80 bg-yellow-100 rounded-t-md" />

            <div className="flex flex-col gap-3 p-4 md:px-6 lg:py-2 lg:px-4 2xl:gap-4">

                <div className="flex flex-col items-center gap-1">
                    <div className="h-4 w-32 bg-yellow-200 rounded" />
                    <div className="h-3 w-24 bg-yellow-100 rounded" />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="h-3 w-full bg-yellow-100 rounded" />
                    <div className="h-3 w-full bg-yellow-100 rounded" />
                    <div className="h-3 w-5/6 bg-yellow-100 rounded" />
                    <div className="h-3 w-4/6 bg-yellow-100 rounded" />
                </div>

                <div className="flex items-center gap-2 mt-1">
                    <div className="h-3 w-10 bg-yellow-200 rounded" />
                    <div className="h-3 w-24 bg-yellow-100 rounded" />
                </div>

            </div>
        </div>

    )
}
