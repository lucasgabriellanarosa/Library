function AuthBtn({ children }: { children: React.ReactNode }) {
    return (
        <button className="bg-indigo-950 hover:bg-indigo-700 text-white font-bold py-2 rounded-sm">
            {children}
        </button>
    )
}

export default AuthBtn