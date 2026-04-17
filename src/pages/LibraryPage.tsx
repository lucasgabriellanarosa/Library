import { useEffect } from "react";
import { Link } from "react-router";
import { BiBookOpen } from "react-icons/bi";
import { GoX } from "react-icons/go";
import { useUserLists } from "../hooks/useUserLists";
import LoadingSpinner from "../components/ui/LoadingSpinner";

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

  if(loading) return <LoadingSpinner loading={loading} text="Listing books..." />

  return (
    <div className="pt-28 text-xs">

      <div className="md:hidden z-10 backdrop-blur-md border-b border-zinc-800">
        <div className="flex overflow-x-auto scrollbar-hide gap-2 p-4">
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

      <div className="flex max-w-400 mx-auto">

        <aside className="hidden md:block w-72 border-r border-zinc-800 p-8 h-[calc(100vh-80px)] sticky top-20">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
            <BiBookOpen className="text-amber-500" size={24} />
            Minhas Coleções
          </h2>
          <nav className="space-y-3">
            {lists.map(list => (
              <button
                key={list.id}
                onClick={() => setSelectedList(list)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${selectedList?.id === list.id
                    ? 'bg-amber-500/10 text-amber-500 font-bold border-l-4 border-amber-500'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
              >
                {list.name}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-10">
          <header className="mb-6 md:mb-12">
            <h1 className="md:text-4xl font-black tracking-tight text-base">
              {selectedList?.name || "Unknown List"}
            </h1>
            <p className="text-zinc-500 mt-1">
              {books.length} {books.length === 1 ? 'livro encontrado' : 'livros encontrados'}
            </p>
          </header>

          {books.length > 0 ? (
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
              {books.map(book => (
                <div key={book.id} className="group relative flex flex-col">
                  <Link to={`/book/${encodeURIComponent(book.work_key.replace('/works/', ''))}`}className="relative block">
                    <div className="aspect-2/3 overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 transition-all duration-300 group-hover:border-amber-500/50 group-hover:shadow-2xl group-hover:shadow-amber-500/10">
                      <img
                        src={`https://wsrv.nl/?url=https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg&output=webp`}
                        alt={book.title}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    <div className="mt-1">
                      <h3 className="text-xs md:text-base font-bold line-clamp-1 group-hover:text-amber-500 transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-[11px] italic md:text-sm text-zinc-500">
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
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-zinc-900 rounded-3xl">
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