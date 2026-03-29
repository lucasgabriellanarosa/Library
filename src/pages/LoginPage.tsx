import { FaLock, FaRegUser } from "react-icons/fa6"
import AuthInput from "../components/auth/AuthInput"
import AuthForm from "../components/auth/AuthForm"
import AuthBtn from "../components/auth/AuthBtn"
import AuthToggle from "../components/auth/AuthToggle"
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router"

function LoginPage() {

  // Register user with email and password
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Login user: " + username + " with password: " + password)
    signIn(username, password)
    navigate("/")
  }

  return (
    <>
      <AuthForm submitForm={handleLogin}>

        <AuthInput icon={<FaRegUser />} placeholder="Nome de usuário ou E-mail" type="text" stateValue={username} setStateValue={setUsername} />

        <AuthInput icon={<FaLock />} placeholder="Senha" type="password" stateValue={password} setStateValue={setPassword} />

        <AuthBtn>Entrar</AuthBtn>

      </AuthForm>

      <AuthToggle question="Não tem uma conta?" link="/register" action="Cadastre-se" />

    </>
  )
}

export default LoginPage