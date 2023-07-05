import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MainNavigation = () => {
  const { user, signOut } = useAuth()

  return (
    <nav>
      {user ? (
        <ul>
          <li><Link to="/">home</Link></li>
          <li><button onClick={signOut}>signOut</button></li>
        </ul>
      ) : (
        <ul>
          <li><Link to="/">home</Link></li>
          <li><Link to="/login">login</Link></li>
        </ul>
      )}
    </nav>
  );
}

export default MainNavigation;