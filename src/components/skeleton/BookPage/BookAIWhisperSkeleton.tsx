import {FaRobot, FaTimes } from "react-icons/fa";
import ScaleLoader from "../../ui/ScaleLoader";

export default function BookAIWhisperSkeleton() {
    return (
        <div className="animate-pulse min-h-full">
            <div className="bg-amber-600 p-4 text-white flex justify-between items-center shadow-md">
                <div className="flex items-center gap-2">
                    <FaRobot className="text-xl" />

                    <div className="leading-tight">
                        <p className="text-[10px] opacity-80 uppercase font-bold tracking-widest">
                            Library AI
                        </p>

                        <p className="w-40 bg-amber-100 rounded-sm text-[10px] py-0.5 text-center font-semibold truncate text-gray-500">
                            Loading book title...
                        </p>
                    </div>
                </div>

                <div
                    className="p-1 rounded"
                >
                    <FaTimes />
                </div>
            </div>

            <ScaleLoader loading text="Turning the pages..."/>

        </div>
    )
}
