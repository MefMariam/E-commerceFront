import Signap from "./views/auth/Signap";
import Login from "./views/auth/login";
import Profile from "./views/Dashboards/profile";
import {
  Await,
  Navigate,
  Route,
  Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import ResponsiveProduit from "./views/Dashboards/produit";
import Addproduct from "./views/Dashboards/addproduct";
import UpdateProduct from "./views/Dashboards/updateProduct";
import { getme } from "./services/userservices";
import Category from "./views/Dashboards/Category";
import Menu from "./components/menu";

function App() {
  const storedtoken = localStorage.getItem("token");
  const [token, setToken] = useState(storedtoken || null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getuser() {
      if (storedtoken) {
        setToken(storedtoken);
        try {
          const data = await getme(token);
          if (data.status === 200) {
            setUser(data.data);
          }
        } catch (error) {
          setUser(null);
          localStorage.removeItem("token"); // Clear token if user data fetch fails
          setToken(null); // Update state to reflect no token
        }
      }
    }
    getuser();
  }, [token, storedtoken]);
  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  if (!token) {
    // If no token is present, redirect to the login page
    return (
      <Routes>
        <Route path="/" element={<Signap />} />
        <Route path="/login" element={<Login setToken={setToken} />} />

        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
  if (token) {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <Menu>
              <Profile token={token} />
            </Menu>
          }
        />
        <Route
          path="/profile"
          element={
            <Menu handellogout={logout}>
              <Profile token={token} />
            </Menu>
          }
        />
        <Route
          path="/produit"
          element={
            <Menu>
              <ResponsiveProduit />
            </Menu>
          }
        />
        <Route
          path="/addProduct"
          element={
            <Menu>
              <Addproduct />
            </Menu>
          }
        />
        <Route
          path="/UpdateProduct/:id"
          element={
            <Menu>
              <UpdateProduct />
            </Menu>
          }
        />
        <Route
          path="/category"
          element={
            <Menu>
              <Category token={token} />
            </Menu>
          }
        />
      </Routes>
    );
  }
}
export default App;
