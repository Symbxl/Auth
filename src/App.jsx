import { Route, Routes } from "react-router-dom"
import { routesConfig } from "./routes/routesConfig";
import MainNavigation from "./components/MainNavigation";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import jwtDecode from "jwt-decode";

const App = () => {
  const { user, signIn } = useAuth()
  const jwt = localStorage.getItem("jwt")

  useEffect(() => {
    if(jwt && !user) {
      const { id } = jwtDecode(jwt)
      const getUser = async () => {
        const response = await fetch(`http://localhost:1337/api/users/${id}`);
        const user = await response.json();
        signIn(user, user.isAdmin)
      };
      getUser()
    }
  }, [user])
  
  return ( 
    <>
    <MainNavigation />
    <Routes>
      {routesConfig.map(route => <Route key={route.id} path={route.path} element={route.element} /> )}
    </Routes>
    </>
  );
}

export default App;