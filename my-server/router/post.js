var express = require("express");
var router = express.Router();
const { db_post, db_basic } = require("../my_sql.js");

router.post("/create", create_post);
router.post("/delete", delete_post);
router.get("/hit/:postID", hit_post);
router.get("/all", get_all_posts);
router.get("/:postID", get_post);

async function create_post(req, res) {
  console.log(req.body);
  await db_post.create(req.body);
  res.send("done");
}

async function get_all_posts(req, res) {
  const selected_posts = await db_basic.select("post", "*");
  res.send(selected_posts);
}

async function get_post(req, res, next) {
  const post_id = req.params.postID;
  const selected_posts = await db_basic.select("post", "id", post_id);
  res.send(selected_posts[0]);
}

async function hit_post(req, res, next) {
  const post_id = req.params.postID;
  await db_post.hit(post_id);
  res.send("hit!");
}

async function delete_post(req, res, next) {
  const post_id = req.body.post_id;
  await db_basic.delete("post", "id", post_id);
  res.send("deleted!");
}

module.exports = router;
