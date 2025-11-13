// src/components/Header.jsx
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const user = useSelector((s) => s.user.current);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/login") return null;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">PersonalBudget</span>
      {user && (
        <div className="d-flex align-items-center text-light">
          <span>Signed in as {user.fullName}</span>
          <button
            className="btn btn-outline-light btn-sm ms-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
