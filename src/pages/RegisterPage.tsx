import { FaLock, FaRegUser } from "react-icons/fa6"
import AuthInput from "../components/auth/AuthInput"
import AuthForm from "../components/auth/AuthForm"
import AuthBtn from "../components/auth/AuthBtn"
import AuthToggle from "../components/auth/AuthToggle"
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router"

function RegisterPage() {

  // Register user with email and password
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Register email: " + email + " with password: " + password + " and confirm password: " + confirmPassword)

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!")
      return
    } 

    signUp(email, password)
    navigate("/login")
  }

  return (
    <>
      <AuthForm submitForm={handleRegister}>

        <AuthInput icon={<FaRegUser />} placeholder="Nome de usuário ou E-mail" type="text" stateValue={email} setStateValue={setEmail} />

        <AuthInput icon={<FaLock />} placeholder="Senha" type="password" stateValue={password} setStateValue={setPassword} />
        <AuthInput icon={<FaLock />} placeholder="Confirmar Senha" type="password" stateValue={confirmPassword} setStateValue={setConfirmPassword} />
    
        <AuthBtn>Cadastre-se</AuthBtn>

      </AuthForm>

      <AuthToggle question="Já tem uma conta?" link="/login" action="Entrar" />

    </>
  )
}

export default RegisterPage