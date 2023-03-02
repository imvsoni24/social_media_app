import Home from "./pages/Home/Home";
import {Routes,Route} from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";


function App() {
  const { user} = useContext(AuthContext);
  return (
    <Routes>
      <Route exact path="/" element={user ? <Home /> : <Register />} />
      <Route
        path="/profile/:username"
        element={user ? <Profile /> : <Register />}
      />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <Register />}
      />
    </Routes>
  );
}

export default App;
