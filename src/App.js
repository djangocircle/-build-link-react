import Index from "./pages/Index/Index";
import CreateUser from "./pages/CreateUser/CreateUser";
import Login from "./pages/Login/Login";
import EditUser from "./pages/EditUser/EditUser";
import Logout from "./pages/Logout/Logout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="inner">
        <Switch>
          <Route path="/edit/:id">
            <EditUser />
          </Route>
          <Route path="/create">
            <CreateUser />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/">
            <Index />
          </Route>
        </Switch>
        </div>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
