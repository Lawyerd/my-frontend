import React, { useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import "tui-pagination/dist/tui-pagination.css";
import base_url from "../../data/base_url.js";

function BoardWrite() {
  const editorRef = useRef();
  const titleRef = useRef();

  const [cookies, setCookie, removeCookie] = useCookies(["post"]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [title, setTitle] = useState("");
  const [section, setSection] = useState("");
  const btnClickListener = async () => {
    console.log(titleRef);
    const editorInstance = editorRef.current.getInstance();

    const getContent_md = editorInstance.getMarkdown();
    console.log("--Mark Down");
    console.log(getContent_md);
    const getContent_html = editorInstance.getHtml();
    console.log("--HTML--");
    console.log(getContent_html);
    removeCookie("post");
    setCookie("post", getContent_html);
    console.log(cookies);
    console.log(cookies.user.id);

    await send_data({
      content: getContent_html,
      section: section,
      title: title,
      author_id: cookies.user.id,
      author: cookies.user.name,
    });
    setIsSubmit(true);
  };
  async function send_data(data) {
    await axios.post(base_url + "/post/create", data);
  }
  const handleChange = event => {
    var { name } = event.target;
    var { value } = event.target;
    if (name === "title") {
      setTitle(value);
    }
    if (name === "section") {
      setSection(value);
    }
  };

  if (isSubmit) return <Redirect to={"/board"} />;

  return (
    <Card>
      <Card.Body>
        <div>
          <div
            className="input-group input-group-sm mb-3"
            style={{ marginBottom: "10px" }}
          >
            <span
              className="input-group-text"
              id="inputGroup-sizing-sm"
              style={{
                fontSize: "13px",
                paddingBottom: "4px",
                paddingTop: "4px",
              }}
            >
              Title
            </span>

            <input
              type="text"
              name="title"
              className="form-control"
              onChange={handleChange}
              value={title}
              placeholder="Title"
            ></input>
          </div>
          <div className="input-group-sm mb-3 flex d-flex">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Section
              </label>
            </div>
            <select
              className="custom-select"
              id="inputGroupSelect01"
              name="section"
              onChange={handleChange}
            >
              <option value="item" key="item"></option>
              <option value="user" key="user"></option>
            </select>
          </div>
          <Editor
            placeholder="Please enter text."
            previewStyle="tab"
            initialEditType="markdown"
            useCommandShortcut={true}
            ref={editorRef}
          />
          {/* <Viewer initialValue="<h1>content</h1><p>hi my name is</p>">
          heelo
        </Viewer> */}
        </div>
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "10px" }}
        >
          <ButtonGroup size="sm">
            <Button variant="dark" onClick={btnClickListener}>
              Submit
            </Button>
          </ButtonGroup>
        </div>

        {/* https://1nnovator.tistory.com/56 */}
      </Card.Body>
    </Card>
  );
}

export default BoardWrite;
