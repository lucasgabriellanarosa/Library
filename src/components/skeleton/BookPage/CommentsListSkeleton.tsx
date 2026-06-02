import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CommentsListSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            {
                Array.from({ length: 3 }).map((_, index) => (
                    <Card key={index} className="rounded-2xl border bg-amber-50/50 p-4 shadow-sm flex flex-row gap-3 text-xs">
                        {/* O Shadcn faz o círculo do Avatar pulsar */}
                        <Skeleton className="h-10 w-10 rounded-full bg-neutral-200" />

                        <div className="flex flex-1 flex-col gap-3">
                            <div className="flex items-center gap-2">
                                {/* O Shadcn faz a barrinha do nome de usuário pulsar */}
                                <Skeleton className="h-4 w-24 bg-neutral-200" />
                                <Skeleton className="h-3 w-12 bg-neutral-200" />
                            </div>
                            {/* Duas barrinhas simulando o texto do comentário */}
                            <Skeleton className="h-4 w-full bg-neutral-200" />
                            <Skeleton className="h-4 w-3/4 bg-neutral-200" />
                        </div>
                    </Card>
                ))
            }
        </div>
    )
}
