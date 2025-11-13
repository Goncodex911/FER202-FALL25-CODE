import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [err, setErr] = useState("");

  const dispatch = useDispatch();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      return setErr("Username and password are required");
    }

    if (password.length < 6) {
      return setErr("Password must be at least 6 characters");
    }

    const res = await api.get("/users", {
      params: { username, password }
    });

    if (res.data.length === 0) {
      return setErr("Invalid credentials");
    }

    dispatch(setUser(res.data[0]));
    nav("/home");
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">

            <div className="card p-4 shadow">
              <h3 className="text-center mb-3">Login</h3>

              {err && <div className="alert alert-danger">{err}</div>}

              <form onSubmit={submit}>
                <div className="mb-3">
                  <label>Username</label>
                  <input
                    className="form-control"
                    value={username}
                    onChange={(e)=>setU(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e)=>setP(e.target.value)}
                  />
                </div>

                <button className="btn btn-primary w-100">Login</button>
              </form>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
