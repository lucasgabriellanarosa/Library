import { HashLoader } from "react-spinners"

interface PropsTypes {
    loading: boolean,
    text?: string
}

function LoadingSpinner({ loading, text }: PropsTypes) {
    if (!loading) return null;
    
    return (
        <div className="flex flex-col gap-6 items-center justify-center min-h-[60vh]">
            <HashLoader
                color="#D97706"
                loading={loading}
                size={50}
            />
            {
                text && (
                    <p className="font-semibold">{text}</p>

                )
            }
        </div>)
}

export default LoadingSpinner