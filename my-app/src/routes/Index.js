import React from "react";
import "../css/About.css";
import { Row, Col, Card } from "react-bootstrap";

// import newyork from "../img/newyork.jpg";
// import Clock from "react-live-clock";

// import Clock from "../components/Clock.js";

class Index extends React.Component {
  render() {
    return (
      <div className="background">
        <Row style={{ margin: "0px" }}>
          <Col md={2}></Col>
          <Col md={8}>
            <Card>
              <Card.Body className="row-vh d-flex flex-column">
                <h1 className="row-vh d-flex flex-row justify-content-center">
                  Main
                </h1>
                <div className="row-vh d-flex flex-row justify-content-center">
                  <h6>Tomorrow never comes</h6>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}></Col>
        </Row>
      </div>
    );
  }
}

export default Index;
