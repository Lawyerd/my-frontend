import React, { useState, useEffect } from "react";
import "../../../css/Home.css";
import { Link } from "react-router-dom";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import Card from "../../../components/Card.js";
import { Row, Container, Col, Spinner, Button } from "react-bootstrap";

import axios from "axios";

function User_list() {
  const [users, setUsers] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    birth: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    get_users();
  }, []);
  const get_users = async () => {
    var data = await axios.get("http://localhost:2400/pages");
    setUsers(data.data);
    setIsLoading(false);
  }; // getMovies라는 함수 정의

  const data = [
    { id: 1, name: "Editor" },
    { id: 2, name: "Grid" },
    { id: 3, name: "Chart" },
  ];

  const columns = [
    { name: "id", header: "ID" },
    { name: "name", header: "Name" },
  ];

  return (
    <>
      <Grid
        data={data}
        columns={columns}
        rowHeight={25}
        bodyHeight={100}
        virtualScrolling={true}
        heightResizable={true}
        rowHeaders={["rowNum"]}
      />
      <Container style={{ textAlign: "center" }}>
        <h1>User</h1>
        <Button as={Link} className="btn btn-dark" to="/admin/user/create">
          Add New User
        </Button>
      </Container>

      <Container style={{ textAlign: "center" }}>
        <div className="mt-3">
          {isLoading ? (
            <Spinner animation="border" role="status" />
          ) : (
            <Row>
              {users.map(user => (
                <Col md={4} key={String(user.id)}>
                  <Card
                    key={user.id}
                    id={user.id}
                    title={user.name}
                    description={user.phone}
                  />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Container>
    </>
  );
}
export default User_list;
