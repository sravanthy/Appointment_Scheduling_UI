import "./App.css";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import { Route, Switch } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import MainComponent from "./components/MainComponent";
import DashBoardComponent from "./components/DashBoardComponent";
function App() {
  return (
    <>
      <HeaderComponent />
      <Switch>
        <Route exact path="/" component={MainComponent} />
        <Route path="/home" component={MainComponent} />
        <Route path="/login" component={LoginComponent} />
        <Route path="/signup" component={RegisterComponent} />
        <Route path="/dashboard" component={DashBoardComponent} />
      </Switch>

      <FooterComponent />
    </>
  );
}

export default App;
