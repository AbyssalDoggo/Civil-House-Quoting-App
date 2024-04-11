import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./auth/services/auth.service";
import Login from "./auth/components/login.component";
import Register from "./auth/components/register.component";
// import Home from "./auth/components/home.component";
import Home from "./components/homeProjects/Home";
import Profile from "./auth/components/profile.component";
import BoardUser from "./auth/components/board-user.component";
import BoardModerator from "./auth/components/board-moderator.component";
import BoardAdmin from "./auth/components/board-admin.component";
import EventBus from "./auth/common/EventBus";
import QuoteCustomer from "./components/QuoteCustomer";
import ClientList from "./auth/manager/ClientList";
import ClientEdit from "./auth/manager/ClientEdit";
import NewsList from "./auth/homes/pages/NewsList";
import NewsView from "./auth/homes/pages/NewsView";
import ProjectView from "./components/homeProjects/ProjectView";
import Package from "./components/Package";
import Admin from "./components/admin/admin";
import HomeContent from "./components/homeProjects/HomeContent";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      const roles = user.role || [];

      this.setState({
        currentUser: user,
        showModeratorBoard: roles.includes("MOD"),
        showAdminBoard: roles.includes("ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    return (
      <div>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<NewsList />} />
            <Route path="/home" element={<Home />} />
            <Route path="/homecontent" element={<HomeContent />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/newsview/:id" element={<NewsView />} />
            <Route path="/projectview/:id" element={<ProjectView />} />
            <Route path="/quoteCustomer" element={<QuoteCustomer />} />
            <Route path="*" element={<NewsList />}></Route>{" "}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/package" element={<Package />} />
            <Route path="/clients" exact={true} element={<ClientList />} />
            <Route path="/clients/:id" element={<ClientEdit />} />
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
