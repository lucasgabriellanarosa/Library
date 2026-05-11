function ListButtonsSkeleton() {
    return (
        <div className="w-4/5 flex flex-col gap-3 max-w-sm xl:max-w-lg animate-pulse" >

            <div className="flex flex-row gap-3">
                <div className="h-10 flex-1 rounded-md bg-amber-100" />
                <div className="h-10 flex-1 rounded-md bg-amber-100" />
            </div>

            <div className="h-10 w-full rounded-md bg-gray-200" />
        </div>
    )
}

export default ListButtonsSkeleton