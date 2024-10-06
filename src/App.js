import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Entete from "./components/ui/Entete";
import { useState } from "react";
import Register from "./components/ui/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./components/ui/Login";
import UserListAd from "./components/admin/UserListAd";
import ProductContainer from "./components/ui/ProductContainer";
import CommandsListAd from "./components/admin/CommandsListAd";
import Profile from "./components/user/Profile";
import UserOrderList from "./components/orders/UserOrderList";
import { useSelector } from "react-redux";

function App() {
  const [search, setSearch] = useState("");
  const { isAuth, loggedUser } = useSelector((state) => state.userReducer);
  return (
    <div className="App">
      {/* Static TOP */}
      <Entete search={search} setSearch={setSearch} />
      {isAuth && loggedUser.blocked ? (
        <h1>You are blocked</h1>
      ) : (
        <Routes>
          {/* -----------login / register / offline--------- */}
          <Route path="/" element={<ProductContainer search={search} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/SignIn" element={<Login />} />
          {/* -----------------ADMIN------------------------ */}

          <Route path="/admin/users" element={<UserListAd />} />
          <Route path="/admin/orders" element={<CommandsListAd />} />
          {/* -----------------USER------------------------ */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/orders" element={<UserOrderList />} />
          {/* previousOrders */}
          {/* cart */}
        </Routes>
      )}
    </div>
  );
}

export default App;
