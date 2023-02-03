import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
export const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const signOutUser = async () => {
    await signOut(auth);
  };
  return (
    <div className="navbar">
      <div className="links">
        <Link to=""> Home</Link>

        {!user ? (
          <Link to="login">Login</Link>
        ) : (
          <Link to="createpost"> Create post!</Link>
        )}
      </div>
      <div className="user">
        {loading ? <h4>Loading</h4> : ""}
        {error ? <h4>Error Logging In!</h4> : ""}
        <p>{user?.displayName}</p>
        {user && (
          <img
            src={auth.currentUser?.photoURL || ""}
            alt=""
            width="20"
            height="20"
          />
        )}
        <button onClick={signOutUser}>LogOut</button>
      </div>
    </div>
  );
};
