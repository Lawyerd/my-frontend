import React, { useState, useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { Card, Button, Spinner } from "react-bootstrap";
import "../../../css/Detail.css";
import { Link } from "react-router-dom";
import axios from "axios";
import base_url from "../../../data/base_url.js";

function User_detail({ match }) {
  const [isLoading, setIsLoading] = useState(true);
  const page = match.params.id === undefined ? 0 : match.params.id;
  const [values, setValues] = useState({
    id: "",
    name: "",
    password: "",
    phone: "",
    email: "",
    country: "",
    birth: "",
  });
  const [deleted, setDeleted] = useState(false);
  const handleClick = () => {
    if (window.confirm(`Delete ${values.name}?`)) {
      axios({
        method: "post",
        url: base_url + "/user/delete",
        data: { id: values.id },
      });
      setDeleted(true);
    }
  };
  useEffect(async () => {
    if (page !== 0) {
      const req = await axios.get(base_url + `/user/${page}`);
      const user = req.data;
      setValues(user);
      setIsLoading(false);
    }
  }, []);

  if (deleted) {
    return <Redirect to={"/admin/user"} />;
  }

  return (
    <>
      <Card
        style={{
          justifyContent: "center",
          minWidth: "11rem",
        }}
      >
        {isLoading ? (
          <Spinner animation="border" role="status" />
        ) : (
          <Card.Body>
            <Card.Title>{values.name}</Card.Title>
            <Card.Text>{values.phone}</Card.Text>
            <Card.Text>{values.email}</Card.Text>
            <Card.Text>{values.country}</Card.Text>
            <Card.Text>{values.birth}</Card.Text>

            <Button
              type="button"
              onClick={handleClick}
              className="btn btn-dark"
              style={{ margin: "10px" }}
            >
              delete
            </Button>

            <Link
              to={{
                pathname: `/admin/user/update/${values.id}`,
                state: { page },
              }}
            >
              <Button
                type="button"
                className="btn btn-dark"
                style={{ margin: "10px" }}
              >
                update
              </Button>
            </Link>
          </Card.Body>
        )}
      </Card>
    </>
  );
}
export default User_detail;
