interface AuthFormProps {
    children: React.ReactNode;
    submitForm: (e: React.FormEvent<HTMLFormElement>) => void;
} 

function AuthForm({children, submitForm}: AuthFormProps) {
  return (
    <form className="flex flex-col gap-3 w-full" onSubmit={submitForm}>
      {children}
    </form>
  )
}

export default AuthForm