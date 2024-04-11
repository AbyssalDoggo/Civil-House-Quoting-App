import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { withRouter } from "../common/with-router";
import userService from "../services/user.service";
import axios from "axios";
import { Typography } from "antd";
const { Title } = Typography;

class ClientList extends Component {
  constructor(props) {
    super(props);
    this.state = { clients: [] };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    userService
      .getListUser()
      .then((response) => this.setState({ clients: response.data }));
  }

  async remove(phoneNumber) {
    axios
      .post("http://localhost:8080/api/client/delete", { phoneNumber })
      .then(() => {
        // let updatedClients = [...this.state.clients].filter(
        // 	(i) => i.phoneNumber !== phoneNumber
        // );
        // this.setState({ clients: updatedClients });
        userService
          .getListUser()
          .then((response) => this.setState({ clients: response.data }));
      });
  }

  render() {
    const { clients } = this.state;

    const clientList = clients.map((client) => {
      return (
        <tr key={client.id}>
          <td style={{ whiteSpace: "nowrap" }}>{client.phoneNumber}</td>
          <td>{client.userName}</td>
          <td>{client.email}</td>
          <td>{client.role}</td>
          <td>{client.status === "0" ? "Đang hoạt động" : "Đã bị chặn"}</td>
          <td>
            <ButtonGroup>
              <Button
                size="sm"
                color="primary"
                tag={Link}
                to={"/clients/" + client.phoneNumber}
                disabled={client.status === "1"}
              >
                Edit
              </Button>
              {client.status === "0" ? (
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => this.remove(client.phoneNumber)}
                >
                  Chặn
                </Button>
              ) : (
                <Button
                  size="sm"
                  color="primary"
                  onClick={() => this.remove(client.phoneNumber)}
                >
                  Bỏ Chặn
                </Button>
              )}
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <Title level={4} style={{ fontWeight: "bold" }}>
          QUẢN LÝ NGƯỜI DÙNG
        </Title>
        <Container fluid>
          {/* <h3>Clients</h3> */}
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Số điện thoại</th>
                <th width="25%">Tên</th>
                <th width="25%">Email</th>
                <th width="10%">Quyền</th>
                <th width="10%">Trạng thái</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>{clientList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default withRouter(ClientList);
