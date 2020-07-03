/*!

=========================================================
* Now UI Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Route, Switch, Redirect } from "react-router-dom";

// core components
import DemoNavbar from "../components/Navbars/DemoNavbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin.jsx";
import NotificationAlert from "react-notification-alert";

import routes from "../../routes.js";

var ps;

class Dashboard extends React.Component {
  state = {
    backgroundColor: "blue"
  };
  mainPanel = React.createRef();
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleColorClick = color => {
    this.setState({ backgroundColor: color });
  };
  customNotify = (place,message) => {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
          <div>
            {message}
          </div>
      ),
      type: type,
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  };
  render() {
    if (this.props.match.path === "/admin"){
      //css
      require( "bootstrap/dist/css/bootstrap.css");
      require( "../assets/scss/now-ui-dashboard.scss?v1.2.0");
      require( "../assets/css/demo.css");
      require( "../assets/css/custom.css");
    }
    return (
      <div className="wrapper">
        <NotificationAlert ref="notificationAlert" />
        <Sidebar
          {...this.props}
          routes={routes}
          backgroundColor={this.state.backgroundColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar {...this.props} />
          <Switch>
            {routes.map((prop, key) => {
              return (
                // <Route
                //   path={prop.layout + prop.path}
                //   component={prop.component}
                //   key={key}
                // />
                  <Route
                    path={prop.layout + prop.path}
                    render={props => (
                        <prop.component
                            {...props}
                            handleNotification={this.customNotify}
                        />
                    )}
                    key={key}
                  />
              );
            })}
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          {/*<Footer fluid />*/}
        </div>
        {/*<FixedPlugin*/}
        {/*  bgColor={this.state.backgroundColor}*/}
        {/*  handleColorClick={this.handleColorClick}*/}
        {/*/>*/}
      </div>
    );
  }
}

export default Dashboard;
