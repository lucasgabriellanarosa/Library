import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
    ArrowUpDown,
    ThumbsUp,
    ThumbsDown,
    ChevronDown 
} from "lucide-react"

const comments = [
    {
        id: 1,
        name: "Noah Pierce",
        username: "@noahdp",
        avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300",
        time: "5 minutes ago",
        comment:
            "I'm a bit unclear about how condensation forms in the water cycle. Can someone break it down?",
        likes: 25,
        replies: 4,
        isAuthor: false,
    },
    {
        id: 2,
        name: "Skill Sprout",
        username: "@skillsprout",
        avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300",
        time: "8 minutes ago",
        comment:
            "Condensation happens when water vapor cools down and changes back into liquid droplets. It's the step before precipitation.",
        likes: 12,
        replies: 0,
        isAuthor: true,
    },
    {
        id: 3,
        name: "Mollie Hall",
        username: "@molliehall",
        avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300",
        time: "5 hours ago",
        comment:
            "I really enjoyed today's lesson on the water cycle! The animations made the process much easier to grasp.",
        likes: 9,
        replies: 1,
        isAuthor: false,
    },
]

export default function CommentsSection() {
    return (
        <section className="flex w-full flex-col gap-4">
            {/* Comment Input */}
            <Card className="rounded-2xl gap-3 border-none p-4 shadow-sm bg-amber-50/60">

                <Textarea
                    placeholder="Add comment..."
                    className="min-h-20 resize-none text-xs border-none bg-white text-neutral-800 shadow-none focus-visible:ring-0"
                />

                <Button className="rounded-full bg-amber-800/50 text-white px-4 self-end text-xs hover:bg-amber-900/80 hover:scale-105 hover:cursor-pointer">
                    Submit
                </Button>

            </Card>

            <Separator className="bg-neutral-400" />

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold">Comments</h2>

                    <span className="rounded-full bg-amber-800/50 px-2 py-0.5 font-medium text-white">
                        45
                    </span>
                </div>

                <Button
                    variant="ghost"
                    className="text-neutral-600 hover:text-black text-xs hover:cursor-pointer hover:bg-amber-800/50"
                >
                    <ArrowUpDown/>
                    Most recent
                </Button>
            </div>

            {/* Comments */}
            <div className="flex flex-col gap-4">
                {comments.map((comment) => (
                    <Card
                        key={comment.id}
                        className="rounded-2xl border bg-amber-50 p-4 shadow-sm flex flex-row gap-3 text-xs"
                    >
                        <Avatar className="h-10 w-10 hover:cursor-pointer hover:scale-105">
                            <AvatarImage src={comment.avatar} />
                            <AvatarFallback>
                                {comment.name.slice(0, 2)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-1 flex-col gap-2">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex flex-wrap items-center gap-2">
                                    <p className="font-semibold">{comment.name}</p>

                                    <span className="text-[11px] text-neutral-400">
                                        {comment.username}
                                    </span>

                                    <span className="text-neutral-400">
                                        {comment.time}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <p className="leading-5 text-neutral-700 xl:text-[13px]">
                                {comment.comment}
                            </p>

                            {/* Footer */}
                            <div className="flex flex-col justify-center gap-3 pt-1 text-neutral-500">

                                <div className="flex justify-between items-center max-w-40">

                                    <div className="flex gap-5 max-w-xs">
                                        <button className="flex items-center gap-1 transition hover:text-black hover:cursor-pointer">
                                            <ThumbsUp className="h-3.5 w-3.5" />
                                            {comment.likes}
                                        </button>

                                        <button className="flex items-center gap-1 transition hover:text-black hover:cursor-pointer">
                                            <ThumbsDown className="h-3.5 w-3.5" />
                                            {comment.likes}
                                        </button>
                                    </div>

                                    <button className="transition hover:text-black hover:cursor-pointer">
                                        Reply
                                    </button>
                                </div>

                                {comment.replies > 0 && (
                                    <button className="flex w-fit items-center gap-1 transition hover:text-black hover:cursor-pointer">
                                        {comment.replies} Replies
                                        <ChevronDown className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    )
}