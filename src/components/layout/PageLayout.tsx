import { Suspense, lazy } from 'react';
import { Outlet } from "react-router"
import Navbar from "./Navbar"
import SearchBooksForm from "../../features/ui/SearchBooksForm"
import { useScannerStore } from "../../stores/useScannerStore";
import ScannerSkeleton from '../skeleton/ScannerSkeleton';
import LoadingSpinner from '../ui/LoadingSpinner';

const IsbnScanner = lazy(() => import("../../features/ui/IsbnScanner"))

function PageLayout() {

  const isScannerOpen = useScannerStore((s) => s.isScannerOpen);

  return (
    <>
      <div id="main-app-container" inert={isScannerOpen ? true : undefined}>
        <Navbar>
          <div className="w-full flex items-center justify-center px-8 py-4">
            <SearchBooksForm />
          </div>
        </Navbar>

        <main className="min-h-dvh pb-8 text-sm bg-indigo-50 font-inter flex flex-col items-center">
          <Suspense fallback={<LoadingSpinner loading />}>
            <Outlet />
          </Suspense>
        </main>
      </div>

      {isScannerOpen && (
        <Suspense fallback={<ScannerSkeleton />}>
          <IsbnScanner />
        </Suspense>
      )}

    </>
  )
}

export default PageLayout