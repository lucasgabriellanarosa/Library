import { useState } from "react"
import AuthorCardSkeleton from "../../skeleton/BookPage/AuthorCardSkeleton"

export default function AuthorCard({ authorData }: { authorData: any }) {

    const [isImgLoaded, setIsImgLoaded] = useState(false)

    return (
        <>
            {
                authorData > [] &&
                <div className={`flex bg-yellow-50 w-full max-w-xs flex-col shadow-md rounded-md md:max-w-sm lg:w-xs ${isImgLoaded ? '' : 'hidden'}`}>
                    <div className="w-full h-80 md:h-90 lg:h-80">
                        <img
                            src={`https://covers.openlibrary.org/a/id/${authorData.photos[0]}-L.jpg`}
                            className="w-full h-full object-cover"
                            onLoad={() => setIsImgLoaded(true)}
                        />
                    </div>

                    <div className="flex flex-col gap-3 p-4 md:px-6 lg:py-2 lg:px-4 2xl:gap-4">
                        <p className="font-semibold text-xs w-full text-center md:text-sm 2xl:text-[15px]">
                            {authorData.name}
                            <br />
                            {
                                authorData.fuller_name &&
                                <span className="text-[10px] text-gray-600 font-normal italic md:text-[11px] 2xl:text-xs">{authorData.fuller_name}</span>
                            }
                        </p>

                        {
                            authorData.bio ? (
                                <p className="text-[11px]/4 text-justify 2xl:text-xs/5">{authorData.bio.value ? authorData.bio.value : authorData.bio}</p>
                            ) : (
                                <p className="text-[11px]/4 text-justify 2xl:text-xs/5">There is no description available about this author.</p>
                            )

                        }

                        {
                            authorData.birth_date &&
                            <p className="font-semibold text-[11px] md:text-xs 2xl:text-sm">
                                Born
                                <span className="text-[10px] text-gray-600 ml-1 font-normal italic md:text-[11px] 2xl:text-xs">{authorData.birth_date}</span>
                            </p>
                        }

                    </div>
                </div>
            }


            {!isImgLoaded && <AuthorCardSkeleton />}
        </>

    )
}
