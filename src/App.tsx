import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import { publicRoutes } from "./routes";
import Logo2 from "../src/assets/Logo2.png";
import Logo from "../src/assets/LogoSN.png";
import { useSelector } from "react-redux";
import { RootState } from "../src/redux/store";
// import { Toaster } from "react-hot-toast";
// import { successToast } from "./utils/getToast";
function App() {
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Kết thúc trạng thái loading
    }, 3000);
  }, []);
  return (
    <>
      {loading ? (
        <div
          className="duration-700 transition-all fixed w-full bottom-0 overflow-hidden z-[9999999]"
          style={{
            height: "100vh",
            width: "100vw",
            background: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={Logo} style={{ height: "100px", width: "100px" }} alt="" />
          <img
            src={Logo2}
            style={{
              position: "absolute",
              height: "150px",
              width: "150px",
              bottom: "20px",
            }}
            alt=""
          />
        </div>
      ) : (
        <>
          <Router>
            <div className="App ">
              <Routes>
                <Route
                  path="/login"
                  element={<Login />}
                  // element={currentUser ? <Navigate to="/" /> : <Login />}
                />
                {/* <Route path="/verify" element={<VerifyCode />} />
              <Route path="/verify1" element={<VerifyCode1 />} />
              <Route path="/changepw" element={<ChangePW />} /> */}
                {/* <Route path="/chat" element={<ChatBody />} /> */}
                {/* <Route path="/info" } />
              {/* <Route path="emulator/action" element={<PasswordReset />} /> 
              <Route path="/fgpw" element={<ForgotPassword />} /> */}
                {publicRoutes.map((publicRoute, index) => {
                  const Layout = publicRoute.layout;

                  const Page = publicRoute.component;

                  return (
                    <Route
                      key={index}
                      path={publicRoute.path}
                      element={
                        <Layout>
                          <Page />
                        </Layout>
                      }
                    />
                  );
                })}
              </Routes>{" "}
            </div>
          </Router>
        </>
      )}
    </>
  );
}
{
  /* <button onClick={successToast}>Show</button>
        {/* <button onClick={errorToast}>Show Error Toast</button>
        <button onClick={loadingToast}>Show Loading Toast</button> 
        <Toaster /> */
}
export default App;
