export default function BookCardSkeleton() {
    return (
        <li className="flex flex-col gap-0.5 border rounded-md bg-yellow-100 p-1 md:p-2 animate-pulse w-full">
            {/* O aspect-2/3 precisa de largura total para calcular a altura certa */}
            <div className="border aspect-2/3 w-full rounded-sm bg-gray-300/50" />

            <div className="flex flex-col flex-1 gap-1 mt-2">
                {/* Altura mínima do título igual ao original */}
                <div className="min-h-[2.4em] flex flex-col justify-center gap-1">
                    <div className="h-3 bg-gray-300/50 rounded w-full" />
                    <div className="h-3 bg-gray-300/50 rounded w-5/6" />
                </div>
                <div className="h-2 bg-gray-300/50 rounded w-1/2 mt-1" />
                <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-3 h-3 bg-gray-200 rounded-full" />
                    ))}
                </div>
            </div>
        </li>
    );
}