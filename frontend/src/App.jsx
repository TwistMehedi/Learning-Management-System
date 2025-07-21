import { Routes, Route } from "react-router";
import Navbar from "./components/Navber/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import CheckYourMail from "./components/Auth/CheckYourMail";
import EmailVerify from "./components/Auth/EmailVerify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userApi } from "./redux/api/userApi";
import { setUser } from "./redux/slice/userSlice";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import CourseDetails from "./components/Course/CourseDetails";

function App() {
  const {user} = useSelector((state) => state.user);
  console.log(user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await dispatch(
          userApi.endpoints.getUser.initiate(null, { forceRefetch: true })
        ).unwrap();

        if (result) {
          dispatch(setUser(result));
        }

        // console.log(result,"result")
      } catch (error) {
        console.error("Global user load fail", error);
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={
            <PrivateRoute isAuthenticated={user ? false : true} redirect="/">
              <Login />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <PrivateRoute isAuthenticated={user ? false : true} redirect="/">
              <Register />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/check-mail" element={<CheckYourMail />}></Route>
        <Route path="/verify-email" element={<EmailVerify />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/course/:id" element={<CourseDetails />}></Route>
      </Routes>
    </>
  );
}

export default App;
