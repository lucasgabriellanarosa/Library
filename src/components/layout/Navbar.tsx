import { Link, useNavigate } from "react-router"
import logoImg from "../../assets/logo.png"
import { useAuth } from "../../hooks/useAuth"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaSignOutAlt, FaUser, FaListUl } from "react-icons/fa"

function Navbar({ children }: { children?: React.ReactNode }) {

    const navigate = useNavigate()
    const { user, signOut } = useAuth();

    const avatarUrl = user?.identities?.[0]?.identity_data?.avatar_url
        || `https://ui-avatars.com/api/?name=${user?.email}&background=random`;


    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

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
        <nav className="flex flex-col px-4 bg-darkPurple text-yellow-50 fixed w-full z-20 font-inter text-xs sm:px-8 xl:px-12 2xl:px-16">
            <div className="flex flex-row items-center justify-between w-full">
                <Link to="/">
                    <img src={logoImg} alt="Logo" className="w-12 h-12 xl:w-14 xl:h-14" />
                </Link>

                <div className=" flex flex-row gap-2 justify-center items-center lg:gap-4 xl:gap-6">
                    {
                        user ? (
                            <>
                                <span className="xl:text-base">
                                    <Link to="/library">
                                        <FaListUl />
                                    </Link>
                                </span>

                                <div className="relative" ref={menuRef}>

                                    <button
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                        className="focus:outline-none"
                                    >
                                        <img
                                            src={avatarUrl}
                                            alt="User Profile"
                                            className="w-8 h-8 rounded-full border-2 border-transparent hover:border-amber-500 transition-all xl:w-10 xl:h-10"
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {isMenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-800 z-50 border border-gray-100 text-[10px] lg:text-[11px]"
                                            >
                                                <div className="px-4 py-2 border-b border-gray-50">
                                                    <p className="font-boldtruncate">{user.email}</p>
                                                </div>

                                                <button
                                                    disabled
                                                    className="w-full flex items-center gap-1 px-4 py-2 hover:bg-gray-50 text-gray-400 cursor-not-allowed"
                                                >
                                                    <FaUser size={10} /> Profile (soon)
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        signOut();
                                                        setIsMenuOpen(false);
                                                        navigate("/")
                                                    }}
                                                    className="w-full flex items-center gap-1 px-4 py-2 hover:bg-red-50 text-red-600 transition-colors"
                                                >
                                                    <FaSignOutAlt size={10} /> Logout
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        ) :
                            (
                                <>
                                    <button onClick={() => navigate('/register')}>Register</button>
                                    <button onClick={() => navigate('/login')} className="border rounded-md px-2 py-1">Login</button>
                                </>
                            )
                    }
                </div>


            </div>

            {children}
        </nav>
    )
}

export default Navbar