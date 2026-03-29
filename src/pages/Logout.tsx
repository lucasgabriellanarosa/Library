import { useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router"

function Logout() {
    const { signOut } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        signOut()

        navigate('/') // Redireciona para a página inicial após logout
    }, [])
    
    
  return (
    <div>Logout</div>
  )
}

export default Logout