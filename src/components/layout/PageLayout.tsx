import { Outlet } from "react-router"
import Navbar from "./Navbar"
import SearchBooksForm from "../../features/ui/SearchBooksForm"

function PageLayout() {


  return (
    <div>
        <Navbar>
          <div className="w-full flex items-center justify-center px-8 py-4">
            <SearchBooksForm />
          </div>
        </Navbar>

      <div className="min-h-dvh pt-32 pb-8 text-sm bg-yellow-50 font-inter">
        <Outlet />
      </div>

    </div>
  )
}

export default PageLayout