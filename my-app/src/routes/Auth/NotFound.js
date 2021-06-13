import React from "react";
import "../../css/NotFound.css";
import { Card, Row, Col } from "react-bootstrap";

function NotFound() {
  return (
    <>
      <Row style={{ marginRight: "0px" }}>
        <Col md={2}></Col>
        <Col md={8}>
          <Card>
            <Card.Body className="row-vh d-flex flex-column">
              <h1 class="row-vh d-flex flex-row justify-content-center">
                Page Not Found
              </h1>
              <div class="row-vh d-flex flex-row justify-content-center">
                <h6>page not found!</h6>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}></Col>
      </Row>
    </>
  );
}

export default NotFound;
