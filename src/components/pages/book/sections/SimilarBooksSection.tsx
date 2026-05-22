import { lazy, Suspense } from "react";
import type { BookDataType } from "../../../../@types/BookData";

const SimilarBooks = lazy(() => import("../SimilarBooks"))

interface SectionProps {
    workId: string | undefined,
    bookData: BookDataType
}

export default function SimilarBooksSection({workId, bookData}: SectionProps) {
    return (
        <div className="w-4/5 max-w-2xl lg:max-w-3xl xl:max-w-fit xl:p-4">
            <h3 className="text-base font-semibold mb-1">Similar Books</h3>

            <Suspense fallback={<div className="w-4/5 h-52" />}>
                <SimilarBooks
                    bookData={bookData}
                    workId={workId || ""}
                />
            </Suspense>

        </div>)
}
