import { lazy, Suspense } from "react";

// Components & Features
import Navbar from "../components/layout/Navbar";
import SearchBooksForm from "../features/ui/SearchBooksForm";

// Skeleton
import ScannerSkeleton from "../components/skeleton/components/ScannerSkeleton";

// Custom Hooks & Store & Utils
import { useScannerStore } from "../stores/useScannerStore";
import LoadingSpinner from "../components/ui/LoadingSpinner";

// Lazy Loading
const IsbnScanner = lazy(() => import("../features/ui/IsbnScanner"))
const HomePopularBooks = lazy(() => import("../components/pages/home/HomePopularBooks"))


function HomePage() {

  const columnsBg = [
    'linear-gradient(to right, #2d1633 33.33%, #2d1633 33.33%)',
    'linear-gradient(to right, #1a224a 33.33%, #1a224a 33.33%)',
    'linear-gradient(to right, #161e38 33.33%, #161e38 33.33%)'
  ].join(', ');

  const overlayGradient = 'linear-gradient(to bottom, rgba(30, 27, 75, 0.2) 0%, rgba(30, 27, 75, 0.8) 50%, #1e1b4b 100%)';

  const isScannerOpen = useScannerStore((s) => s.isScannerOpen);

  return (
    <>

      <div id="main-app-container" inert={isScannerOpen ? true : undefined}>
        <Navbar />

        <div
          className="flex-1 w-full relative flex flex-col items-center justify-center px-8 min-h-dvh md:px-16"
          style={{
            backgroundImage: columnsBg,
            backgroundSize: '33.33% 100%, 33.33% 100%, 33.33% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left top, center top, right top'
          }}>

          <div
            className="absolute inset-0 z-0"
            style={{ backgroundImage: overlayGradient }}
          />

          <main className="z-10 w-full flex flex-col items-center justify-center font-playfair gap-20 mt-40 py-8 text-yellow-50 md:gap-28 lg:gap-36 xl:gap-44 2xl:gap-50">

            <div className="flex flex-col gap-6 w-full max-w-md justify-center items-center sm:gap-12 lg:max-w-lg xl:max-w-xl">

              <div className="tracking-wide">

                <p className="uppercase text-yellow-600 font-light sm:text-base">Read. Rate. Share.</p>
                <h1 className="text-lg sm:text-xl">Organize your literary life</h1>

              </div>

              <SearchBooksForm />
            </div>

            <div className="w-full flex flex-col gap-2 max-w-md sm:max-w-160 lg:max-w-240 2xl:max-w-300">
              <h2 className="tracking-wide font-semibold text-sm sm:text-base lg:text-lg">Popular Books</h2>

              <Suspense fallback={
                <LoadingSpinner loading />
              }>
                <HomePopularBooks />
              </Suspense>

            </div>

          </main>

        </div>
      </div>

      {isScannerOpen && (
        <Suspense fallback={<ScannerSkeleton />}>
          <IsbnScanner />
        </Suspense>
      )}

    </>
  )
}
export default HomePage