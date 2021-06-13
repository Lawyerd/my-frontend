import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { Link } from "react-router-dom";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import "tui-pagination/dist/tui-pagination.css";
import base_url from "../../data/base_url.js";

function Board() {
  //   const [isLoading, setIsLoading] = useState(true);
  const [clicked_post, setClicked_post] = useState(0);
  const [posts, setPosts] = useState();
  const columns = [
    // { name: "no", header: "ID" },
    { name: "section", header: "Section" },
    { name: "title", header: "Title" },
    { name: "author", header: "Written By" },
    { name: "created", header: "Created" },
    { name: "hit", header: "Views" },
    { name: "likes", header: "Likes" },
  ];
  useEffect(async () => {
    const res = await axios.get(base_url + "/post/all");
    setPosts(res.data);
  }, []);

  const handleClick = e => {
    // const clicked_cell = e.nativeEvent.target.innerText;
    const row_number = e.rowKey;
    // console.log(clicked_cell);
    // console.log(row_number);
    // console.log(e);
    if (row_number !== undefined) {
      console.log(`Redirect to ${posts[row_number]}`);
      setClicked_post(posts[row_number].id);
      // setNext(users[row_number].id);
    }
  };
  if (clicked_post > 0) {
    return <Redirect to={"/board/post/" + clicked_post} />;
  }
  return (
    <Card>
      <Card.Body>
        <h1>Forum</h1>
        <div
          className="d-flex justify-content-end"
          style={{ marginBottom: "10px" }}
        >
          <ButtonGroup size="sm">
            <Button variant="dark">
              <Link to="/board/post/write">Write</Link>
            </Button>
            {/* <Button variant="dark">Delete</Button> */}
          </ButtonGroup>
        </div>
        <Grid
          data={posts}
          columns={columns}
          rowHeight={25}
          bodyHeight={100}
          virtualScrolling={true}
          heightResizable={true}
          onClick={handleClick}
          rowHeaders={["rowNum"]}
          pageOptions={{
            useClient: true,
            perPage: 100,
          }}
        />
      </Card.Body>
    </Card>
  );
}

export default Board;
