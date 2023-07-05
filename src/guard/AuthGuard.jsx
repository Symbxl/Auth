import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const [isChecked, setIsChecked] = useState(false)
  const { isAdmin, signOut } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if(!isAdmin && !localStorage.getItem("jwt")) {
      navigate('/')
    } else {
      setIsChecked(true)
    }
  }, [signOut])
  
  if (!isChecked) {
    return null;
  }

  return <> {children} </>
}

export default AuthGuard;