import { lazy, Suspense } from "react";
const SearchResults = lazy(() => import("../components/pages/search/SearchResults"))

function SearchPage() {

  return (
    <main className="text-sm font-light px-4 pt-32 flex flex-col gap-4 w-full mx-auto max-w-lg sm:max-w-xl md:pt-36 md:gap-6  md:max-w-2xl lg:px-16 lg:max-w-5xl xl:px-24 xl:max-w-360">

      <Suspense>
        <SearchResults />
      </Suspense>

    </main>
  );
}

export default SearchPage