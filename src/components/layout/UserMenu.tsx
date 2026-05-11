import { motion } from "framer-motion"
import { FaSignOutAlt, FaUser } from "react-icons/fa"
import { useAuth } from "../../hooks/useAuth";

import type { User } from "@supabase/supabase-js";
import type { NavigateFunction } from "react-router";

interface UserMenuProps {
    user: User,
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
    navigate: NavigateFunction
}

function UserMenu({ user, setIsMenuOpen, navigate }: UserMenuProps) {

    const { signOut } = useAuth();

    return (
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
    )
}

export default UserMenu