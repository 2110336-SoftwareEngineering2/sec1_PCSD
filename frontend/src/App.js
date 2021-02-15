import "./css/App.css";
import Header from "./header";
import BanPage from "./banpage";
import LoginPage from "./loginpage";
import RegisterPage from "./registerpage";
import ChatPage from "./chatpage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          {/* <Route path="/" exact component={LoginPage} /> */}
          <Route path="/banpage" exact component={BanPage} />
          {/* <Route path="/registerpage" exact component={RegisterPage} /> */}
          {/* <Route path="/chatpage" exact component={ChatPage} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
