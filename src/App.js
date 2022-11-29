import "./App.css";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import { Route, Routes } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import MainComponent from "./components/MainComponent";
import DefaultLayout from "./components/layout/DefaultLayout";
import "../src/scss/style.scss";
import Logout from "./components/LogoutComponent";
function App() {
  return (
    <>
      <HeaderComponent />
      <Routes>
        <Route exact path="/" element={<MainComponent />} />
        <Route path="/home" element={<MainComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<RegisterComponent />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<DefaultLayout />} />
      </Routes>

      <FooterComponent />
    </>
  );
}

export default App;
