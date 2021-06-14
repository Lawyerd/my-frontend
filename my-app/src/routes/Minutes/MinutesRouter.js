import { Route, Switch } from "react-router-dom";

import { Row, Col } from "react-bootstrap";
import Index from "./MinutesIndex.js";
import Write from "./MinutesWrite";

function Minutes({ match }) {
  console.log(match.path);
  //   // ];
  return (
    <Row>
      <Col md={1}></Col>
      <Col md={10}>
        <Switch>
          <Route exact path={`${match.path}`} component={Index} />
          <Route exact path={`${match.path}/write`} component={Write} />
        </Switch>
      </Col>
      <Col md={1}></Col>
    </Row>
  );
}

export default Minutes;
