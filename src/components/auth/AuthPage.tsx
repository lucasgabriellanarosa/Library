import { Outlet } from "react-router"
import GoogleBtn from "../../features/auth/GoogleBtn"
import logoImg from "../../assets/logo.png"

function AuthPage() {
    return (
        <div className="min-h-dvh flex flex-col justify-center items-center font-inter px-6 bg-yellow-50 text-sm">

            <main className="flex flex-col justify-center items-center px-12 py-6 gap-6 rounded-md w-full border border-solid border-amber-900/10 bg-white/50  backdrop-blur-sm shadow-[0_0_20px_rgba(139,69,19,0.05)] text-amber-900/60">

                <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <img
                        src={logoImg}
                        alt="Logo da Biblioteca"
                        className="w-20 h-20 object-contain rounded-md"
                    />
                </div>
                
                <h1 className="text-xl font-black font-playfair tracking-wider text-center mt-6">Acesse Sua Biblioteca</h1>

                {/* Login/Register Form & Message */}
                <Outlet />

                <h3 className="w-full flex items-center gap-4 font-bold uppercase tracking-widest text-xs before:h-px before:flex-1 before:bg-amber-900/30 after:h-px after:flex-1 after:bg-amber-900/30">
                    Ou use sua conta
                </h3>

                <GoogleBtn />

            </main>

        </div>)
}

export default AuthPage