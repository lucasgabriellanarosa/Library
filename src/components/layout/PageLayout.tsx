import { Outlet } from "react-router"
import Navbar from "./Navbar"
import SearchBooksForm from "../../features/ui/SearchBooksForm"
import { IsbnScanner } from "../../features/ui/IsbnScanner"
import { useScannerStore } from "../../stores/useScannerStore";

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
          <Outlet />
        </main>
      </div>

      <IsbnScanner />

    </>
  )
}

export default PageLayout