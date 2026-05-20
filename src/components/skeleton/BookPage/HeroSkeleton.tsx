export default function HeroSkeleton() {
    return (
        <div className="relative w-full flex justify-center animate-pulse">

            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-72 xl:h-120 bg-amber-100">
                <div className="absolute inset-0 backdrop-blur-xs bg-white/20" />
            </div>

            {/* Card */}
            <div className="relative z-10 bg-yellow-50/60 w-4/5 mt-32 flex flex-col items-center gap-2 rounded-md shadow-gray-500 shadow-sm max-w-md md:max-w-xl">

                {/* Top Content */}
                <div className="flex flex-col justify-center items-center px-4 gap-2 pb-4">

                    {/* Cover */}
                    <div className="relative w-28 h-40 -mt-12 rounded-sm bg-amber-200 shadow-lg" />

                    {/* Title */}
                    <div className="h-5 w-52 bg-amber-200 rounded mt-2" />

                    {/* Author */}
                    <div className="h-4 w-32 bg-amber-100 rounded" />

                    {/* Stars */}
                    <div className="flex gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                className="w-3 h-3 rounded-full bg-amber-200"
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom Content */}
                <div className="flex flex-col justify-center items-center gap-4 bg-amber-50 rounded-b-md shadow-[0_-2px_15px_rgba(139,92,20,0.1)] w-full py-4 px-4">

                    {/* Pages + Year */}
                    <div className="flex flex-row gap-6">
                        <div className="h-3 w-20 bg-amber-200 rounded" />
                        <div className="h-3 w-16 bg-amber-200 rounded" />
                    </div>

                    {/* Categories */}
                    <div className="flex flex-col items-center gap-2 w-full">
                        <div className="h-3 w-20 bg-amber-100 rounded" />

                        <div className="flex flex-wrap gap-2 justify-center">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-6 w-20 rounded-full bg-amber-200"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}