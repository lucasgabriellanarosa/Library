import { useAuth } from "../../hooks/useAuth"

function GoogleBtn() {

    const { signInWithGoogle } = useAuth()

    return (
        <button className="px-4 py-2 border flex items-center justify-center gap-2 border-amber-900/30 rounded-sm text-amber-900/80 hover:border-amber-900/50 hover:text-yellow-50 hover:bg-amber-900/90 hover:shadow transition duration-150 hover:cursor-pointer" onClick={() => signInWithGoogle()}>
            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
            <span>Sign in with Google</span>
        </button>
    )
}

export default GoogleBtn