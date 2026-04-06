import { Link, useNavigate } from "react-router"
import logoImg from "../../assets/logo.png"
import { useAuth } from "../../hooks/useAuth"
import { FaListUl } from "react-icons/fa6";

function Navbar({ children }: { children?: React.ReactNode }) {
    const navigate = useNavigate()

    const { user } = useAuth();
    const avatarUrl = user?.identities?.[0]?.identity_data?.avatar_url
        || `https://ui-avatars.com/api/?name=${user?.email}&background=random`;

    <img src={avatarUrl} className="w-8 rounded-full shadow-sm" />

    return (
        <nav className="flex flex-col px-4 bg-darkPurple text-yellow-50 fixed w-full z-20 font-inter text-xs">
            <div className="flex flex-row items-center justify-between w-full">
                <Link to="/">
                    <img src={logoImg} alt="Logo" className="w-12 h-12" />
                </Link>

                <div className=" flex flex-row gap-2 justify-center items-center">
                    {
                        user ? (
                            <>
                                <Link to="/library">
                                 <FaListUl />
                                </Link>

                                <Link to="/profile">
                                    <img src={avatarUrl} className="w-8 rounded-full" />
                                </Link>

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