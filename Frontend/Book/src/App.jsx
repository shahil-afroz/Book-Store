import Favourites from "./Components/Profile/Favourites"
import OrderHistory from "./Components/Profile/OrderHistory"
import Settings from "./Components/Profile/Settings"
import Home from "./Pages/Home"
import Footer from "./Components/Footer/Footer"
import Navbar from "./Components/Navbar/Navbar"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllBooks from "./Pages/AllBooks";
import LogIn from "./Pages/LogIn"
import SignUp from "./Pages/SignUpPage";
import Profile from "./Pages/Profile";
import Cart from "./Pages/Cart"
import AllOrders from "./Pages/AllOrders"
import ViewBooks from "./Components/ViewBooks/Viewbooks";
import AddBooks from "./Pages/AddBooks"
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./Store/auth";
import { useEffect } from "react";
import UpdateBooks from "./Pages/UpdateBook"
function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(
    () => {
      if (
        localStorage.getItem("id") &&
        localStorage.getItem("token") &&
        localStorage.getItem("role")
      ) {
        dispatch(authActions.login());
        dispatch(authActions.changeRole(localStorage.getItem("role")));
      }
    }, []
  )



  return (
    <div className="bg-[#e3eee8] font-custom">


      <Navbar />
      <Routes>
        <Route element={<Home />} exact path="/" />
        <Route element={<AllBooks />} path="/All-books" />
        <Route element={<Cart />} path="/Cart" />
        <Route element={<Profile />} path="/Profile" >
          {role==="user" ? <Route index element={<Favourites />} />:<Route index element={<AllOrders/>} />}
          {role==="admin" &&  <Route element={<AddBooks />} path="/Profile/AddBooks" />}
          <Route path="/Profile/OrderHistory" element={<OrderHistory />} />
          <Route path="/Profile/Settings" element={<Settings />} />
        </Route>
        <Route element={<UpdateBooks/>} path="/UpdateBooks/:id" />
        <Route element={<LogIn />} path="/LogIn" />
        <Route element={<SignUp />} path="/SignUp" />
        <Route path="/view-book-details/:id" element={<ViewBooks />} />
      </Routes>
      <Footer />
    </div>


  )
}

export default App
