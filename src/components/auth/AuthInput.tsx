interface AuthInputProps {
    icon: React.ReactNode;
    placeholder: string;
    type: string;
    stateValue?: string;
    setStateValue?: React.Dispatch<React.SetStateAction<string>>;
}

function AuthInput({ icon, placeholder, type, stateValue, setStateValue }: AuthInputProps) {
    return (
        <div className="flex flex-row items-center gap-2 border border-amber-900/30 rounded-sm p-2 text-amber-900/80 text-xs">
            <span>
                {icon}
            </span>
            <input 
                className="outline-0 w-full" 
                type={type} 
                placeholder={placeholder} 
                value={stateValue}
                onChange={(e) => setStateValue && setStateValue(e.target.value)}
            />
        </div>

    )
}

export default AuthInput