import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { withRouter } from "../common/with-router";
import userService from "../services/user.service";
import axios from "axios";

class ClientEdit extends Component {
  emptyItem = {
    name: "",
    email: "",
    message: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.router.params.id !== "new") {
      await userService
        .getUser(this.props.router.params.id)
        .then((response) => this.setState({ item: response.data }));
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;

    axios
      .post("http://localhost:8080/api/client/save", item)
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
      });
  }

  render() {
    const { item } = this.state;
    const title = (
      <h1 style={{ textAlign: "center" }}>{"Sửa thông tin người dùng"}</h1>
    );

    return (
      <div>
        <Container style={{ maxWidth: "600px", margin: "auto" }}>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="name">Số điện thoại</Label>
              <Input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={item.phoneNumber || ""}
                onChange={this.handleChange}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Tên</Label>
              <Input
                type="text"
                name="userName"
                id="userName"
                value={item.userName || ""}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                value={item.email || ""}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="role">Role</Label>
              <Input
                type="select"
                name="role"
                id="role"
                value={item.role || ""}
                onChange={this.handleChange}
              >
                <option value="">Chọn vai trò</option>
                <option value="ADMIN">ADMIN</option>
                {/* <option value="MOD">MOD</option> */}
                <option value="USER">USER</option>
              </Input>
            </FormGroup>
            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-success" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <FormGroup style={{ textAlign: "center" }}>
              <Button
                color="primary"
                // type="submit"
                style={{ marginRight: "10px" }}
              >
                Lưu
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/clients">
                Hủy
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(ClientEdit);
