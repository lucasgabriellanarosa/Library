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
    signIn(username, password)
    navigate("/")
  }

  return (
    <>
      <AuthForm submitForm={handleLogin}>

        <AuthInput icon={<FaRegUser />} placeholder="Username or Email" type="text" stateValue={username} setStateValue={setUsername} />

        <AuthInput icon={<FaLock />} placeholder="Password" type="password" stateValue={password} setStateValue={setPassword} />

        <AuthBtn>Sign In</AuthBtn>

      </AuthForm>

      <AuthToggle question="Don't have an account?" link="/register" action="Register" />

    </>
  )
}

export default LoginPage