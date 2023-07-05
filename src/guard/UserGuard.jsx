import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserGuard = ({ children }) => {
  const [isChecked, setIsChecked] = useState(false)
  const { user, signOut } = useAuth()
  
  const navigate = useNavigate()

  useEffect(() => {
    if(!user) {
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

export default UserGuard;