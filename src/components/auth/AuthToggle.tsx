import { NavLink } from "react-router"

interface AuthToggleProps {
    question: string;
    link: string;
    action: string;
}

function AuthToggle({ question, link, action }: AuthToggleProps) {
  return (
      <span className="text-xs">
        {question}{" "}
        <NavLink to={link} className="underline text-indigo-950">
          {action}
        </NavLink>
      </span>
  )
}

export default AuthToggle