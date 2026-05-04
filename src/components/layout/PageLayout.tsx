import { Outlet } from "react-router"
import Navbar from "./Navbar"
import SearchBooksForm from "../../features/ui/SearchBooksForm"
import { IsbnScanner } from "../../features/ui/IsbnScanner"

function PageLayout() {

  return (
    <>
      <div>
        <Navbar>
          <div className="w-full flex items-center justify-center px-8 py-4">
            <SearchBooksForm />
          </div>
        </Navbar>

        <main className="min-h-dvh pb-8 text-sm bg-yellow-50 font-inter flex flex-col items-center">
          <Outlet />
        </main>
      </div>

      <IsbnScanner />

    </>
  )
}

export default PageLayout