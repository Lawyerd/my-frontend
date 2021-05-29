import React from "react";
import "../css/About.css";
import { Card } from "react-bootstrap";

class About extends React.Component {
  render() {
    return (
      <>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Slowly But Steady</Card.Title>
            <Card.Text>made by Lawyerd</Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default About;
