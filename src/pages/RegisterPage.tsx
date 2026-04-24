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

    if (password !== confirmPassword) {
      alert("The passwords do not match!")
      return
    } 

    signUp(email, password)
    navigate("/login")
  }

  return (
    <>
      <AuthForm submitForm={handleRegister}>

        <AuthInput icon={<FaRegUser />} placeholder="Username or Email" type="text" stateValue={email} setStateValue={setEmail} />

        <AuthInput icon={<FaLock />} placeholder="Password" type="password" stateValue={password} setStateValue={setPassword} />
        <AuthInput icon={<FaLock />} placeholder="Confirm Password" type="password" stateValue={confirmPassword} setStateValue={setConfirmPassword} />
    
        <AuthBtn>Register</AuthBtn>

      </AuthForm>

      <AuthToggle question="Already have an account?" link="/login" action="Sign In" />

    </>
  )
}

export default RegisterPage