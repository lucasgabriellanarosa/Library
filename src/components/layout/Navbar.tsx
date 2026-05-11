import { useState, useRef, useEffect, lazy, Suspense } from "react"
import { Link, useNavigate } from "react-router"

const UserMenu = lazy(() => import("./UserMenu"));

// Assets (React Icons & Images)
import { FaListUl } from "react-icons/fa"
import logoImg from "../../assets/logo.png"

// Custom (Animation, Hooks)
import { AnimatePresence } from "framer-motion"
import { useAuth } from "../../hooks/useAuth"

function Navbar({ children }: { children?: React.ReactNode }) {

    const navigate = useNavigate()
    const { user } = useAuth();

    const avatarUrl = user?.identities?.[0]?.identity_data?.avatar_url
        || `https://ui-avatars.com/api/?name=${user?.email}&background=random`;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="flex flex-col px-4 bg-darkPurple text-yellow-50 fixed w-full z-20 font-inter text-xs py-1 sm:px-8 xl:px-12 2xl:px-16">
            <div className="flex flex-row items-center justify-between w-full">

                <Link to="/" aria-label="Home Page">
                    <img src={logoImg} alt="Library Logo" className="w-12 h-12 xl:w-14 xl:h-14" loading="eager" />
                </Link>

                <ul className=" flex flex-row gap-2 justify-center items-center lg:gap-4 xl:gap-6">
                    {
                        user ? (
                            <>
                                <li>
                                    <Link to="/library" aria-label="User Lists">
                                        <span className="xl:text-base hover:text-amber-200 active:text-amber-500 transition-all duration-200">
                                            <FaListUl aria-hidden="true" />
                                        </span>
                                    </Link>
                                </li>

                                <li className="relative" aria-hidden="true" ref={menuRef}>

                                    <button
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                        onMouseEnter={() => import("./UserMenu")}
                                        aria-label="User Profile"
                                    >
                                        <img
                                            src={avatarUrl}
                                            alt="User Profile"
                                            className="w-8 h-8 rounded-full border-2 border-transparent hover:border-amber-300 hover:cursor-pointer transition-all xl:w-10 xl:h-10"
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {isMenuOpen && (
                                            <Suspense fallback={null}>
                                                <UserMenu user={user} setIsMenuOpen={setIsMenuOpen} navigate={navigate} />
                                            </Suspense>
                                        )}
                                    </AnimatePresence>
                                </li>
                            </>
                        ) :
                            (
                                <>
                                    <li>
                                        <button
                                            className="hover:cursor-pointer hover:text-gray-300 hover:underline md:text-sm transition-all duration-100"
                                            onClick={() => navigate('/register')}
                                        >
                                            Register
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                            className="border rounded-md px-2 py-1 md:px-4
                                            hover:cursor-pointer hover:bg-gray-500 hover:border-gray-600 hover:text-indigo-50 md:text-sm transition-all duration-100"
                                            onClick={() => navigate('/login')}
                                        >
                                            Login
                                        </button>
                                    </li>
                                </>
                            )
                    }
                </ul>

            </div>

            {children}
        </nav>
    )
}

export default Navbar