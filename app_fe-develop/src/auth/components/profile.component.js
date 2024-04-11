import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { Row, Col, Flex, Tabs } from "antd";

const { TabPane } = Tabs;

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

    return (
      // <div className="container">
      //   {(this.state.userReady) ?
      //   <div>
      //   <header className="jumbotron">
      //     <h3>
      //       <strong>{currentUser.username}</strong> Profile
      //     </h3>
      //   </header>
      //   <p>
      //     <strong>Token:</strong>{" "}
      //     {currentUser.accessToken.substring(0, 20)} ...{" "}
      //     {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      //   </p>
      //   <p>
      //     <strong>Id:</strong>{" "}
      //     {currentUser.id}
      //   </p>
      //   <p>
      //     <strong>Email:</strong>{" "}
      //     {currentUser.email}
      //   </p>
      //   <strong>Authorities:</strong>
      //   <ul>
      //     {currentUser.roles &&
      //       currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      //   </ul>
      // </div>: null}
      // </div>
      <>
        <Row align="middle" style={{ height: "100px" }}>
          <Col span={5}></Col>
          <Col span={3}>
            <Flex vertical>
              {this.state.userReady ? (
                <div>
                  <header className="jumbotron">
                    <h3>Thông tin người dùng</h3>
                  </header>
                  <p>
                    <strong>Tên:</strong> {currentUser.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {currentUser.email}
                  </p>
                  <p>
                    <strong>Token:</strong>{" "}
                    {currentUser.accessToken.substring(0, 20)} ...{" "}
                    {currentUser.accessToken.substr(
                      currentUser.accessToken.length - 20
                    )}
                  </p>
                </div>
              ) : null}
            </Flex>
          </Col>
          <Col span={7}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Các báo giá" key="1">
                Các báo giá
              </TabPane>
              <TabPane tab="Viết tin tức" key="2">
                Viết tin tức
              </TabPane>
            </Tabs>
          </Col>
          <Col span={5}></Col>
        </Row>
      </>
    );
  }
}
