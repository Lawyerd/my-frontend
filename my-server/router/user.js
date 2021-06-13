var express = require("express");
var router = express.Router();
const { db_user, db_basic } = require("../my_sql.js");

router.post("/create", create_user);
router.post("/update/:pageID", update_user);
router.post("/delete", delete_user);
router.get("/all", pages);
router.get("/:pageID", page);

async function create_user(req, res) {
  await db_user.create(req.body);
}

async function update_user(req, res) {
  await db_user.update(req.body);
}

async function delete_user(req, res) {
  try {
    await db_basic.delete("user", "id", req.body.id);
  } catch (e) {}
}

async function pages(req, res, next) {
  try {
    const users = await db_basic.select("user", "*");
    res.send(users);
  } catch (e) {}
}

async function page(req, res, next) {
  const user_id = req.params.pageID;
  if (user_id !== "favicon.ico") {
    try {
      const users = await db_basic.select("user", "id", user_id);
      if (users[0] === undefined) {
        res.redirect("/");
      } else {
        res.send(users[0]);
      }
    } catch (err) {
      console.log(err);
      res.send("error");
    }
  }
}

module.exports = router;
