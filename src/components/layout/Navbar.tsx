import { Link, useNavigate } from "react-router"
import logoImg from "../../assets/logo.png"

function Navbar({ children }: { children?: React.ReactNode }) {
    const navigate = useNavigate()

    return (
        <nav className="flex flex-col px-4 bg-darkPurple text-yellow-50 fixed w-full z-20 font-inter">
            <div className="flex flex-row items-center justify-between w-full">
                <Link to="/">
                    <img src={logoImg} alt="Logo" className="w-12 h-12" />
                </Link>

                <div className="text-xs flex flex-row gap-2">
                    <button onClick={() => navigate('/register')}>Register</button>
                    <button onClick={() => navigate('/login')} className="border rounded-md px-2 py-1">Login</button>
                </div>

            </div>

            {children}
        </nav>
    )
}

export default Navbar