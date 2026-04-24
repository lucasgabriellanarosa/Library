import { useEffect } from "react";
import { Link } from "react-router";
import { BiBookOpen } from "react-icons/bi";
import { GoX } from "react-icons/go";
import { useUserLists } from "../hooks/useUserLists";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { motion } from "framer-motion";
import { bookContainerVariants, bookVariants } from "../utils/animations/bookAnimations";

const LibraryPage = () => {
  const {
    lists,
    books,
    selectedList,
    setSelectedList,
    loading,
    fetchAllLists,
    fetchBooksFromList,
    removeBookFromList
  } = useUserLists();

  useEffect(() => {
    fetchAllLists();
  }, [fetchAllLists]);

  useEffect(() => {
    if (selectedList?.id) {
      fetchBooksFromList(selectedList.id);
    }
  }, [selectedList, fetchBooksFromList]);

  if (loading) return <LoadingSpinner loading={loading} text="Listing books..." />

  return (
    <div className="pt-28 text-xs w-full">

      <div className="md:hidden z-10 backdrop-blur-md border-b border-zinc-800 flex justify-center">
        <div className="flex overflow-x-auto scrollbar-hide gap-2 p-4 w-120 sm:w-160">
          {lists.map(list => (
            <button
              key={list.id}
              onClick={() => setSelectedList(list)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-[10px] transition-all ${selectedList?.id === list.id
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                }`}
            >
              {list.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center max-w-400 mx-auto">

        <aside className="hidden md:block w-72 border-r border-zinc-800 p-8 h-[calc(100vh-80px)] sticky">
          <h2 className="text-base font-bold mb-8 flex items-center gap-3">
            <BiBookOpen className="text-amber-500" size={20} />
            My Lists
          </h2>
          <nav className="space-y-3">
            {lists.map(list => (
              <button
                key={list.id}
                onClick={() => setSelectedList(list)}
                className={`text-[11px] w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${selectedList?.id === list.id
                  ? 'bg-amber-500/10 text-amber-500 font-bold border-l-4 border-amber-500'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
              >
                {list.name}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-8 max-w-120 sm:max-w-160 md:max-w-full">
          <header className="mb-6">
            <h1 className="font-black tracking-tight text-base md:text-lg">
              {selectedList?.name || "Unknown List"}
            </h1>
            <p className="text-zinc-500 mt-1">
              {books.length} {books.length === 1 ? 'book found' : 'books found'}
            </p>
          </header>

          {books.length > 0 ? (
            <motion.ul className="grid grid-cols-3 sm:grid-cols-4 md:max-w-160 lg:grid-cols-5 lg:max-w-fit xl:grid-cols-6 2xl:grid-cols-8 gap-4"
              variants={bookContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {books.map(book => (
                <motion.li key={book.id} className="group relative flex flex-col"
                  variants={bookVariants}
                >
                  <Link to={`/book/${encodeURIComponent(book.work_key.replace('/works/', ''))}`} className="relative block">
                    <div className="aspect-2/3 overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 transition-all duration-300 group-hover:border-amber-500/50 group-hover:shadow-2xl group-hover:shadow-amber-500/10">
                      <img
                        src={`https://wsrv.nl/?url=https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg&output=webp`}
                        alt={book.title}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    <div className="mt-1 flex flex-col gap-0.5">
                      <h3 className="text-[11px] md:text-xs font-bold line-clamp-2 min-h-[2.4em] content-center group-hover:text-amber-500 transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-[10px] md:text-[11px] italic text-zinc-500">
                        {book.author_name}
                      </p>
                    </div>
                  </Link>

                  <button
                    onClick={() => removeBookFromList(book.id)}
                    className="absolute -top-2 -right-2 p-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-500 rounded-full shadow-2xl md:opacity-0 md:group-hover:opacity-100 transition-all z-10"
                    aria-label="Remover livro"
                  >
                    <GoX size={18} />
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-zinc-900 rounded-3xl max-w-200">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                <BiBookOpen className="text-zinc-700" size={32} />
              </div>
              <p className="text-zinc-500 font-medium">Your bookshelf is empty.</p>
              <Link to="/" className="mt-4 px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-amber-500 transition-colors">
                Explore Library
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default LibraryPage;