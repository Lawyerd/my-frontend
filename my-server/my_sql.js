var mysql = require("mysql");
var util = require("util");
const pbkdf2Password = require("pbkdf2-password");
const hasher = pbkdf2Password();
const moment = require("moment");

const connection = mysql.createConnection({
  host: "localhost",
  //	host: "ec2-13-124-149-215.ap-northeast-2.compute.amazonaws.com",
  port: "3306",
  user: "root",
  password: "jim1292!",
  database: "new_schema",
});
const query = util.promisify(connection.query).bind(connection);
const user = {};
const post = {};

user.find_by_id = async function (user_id) {
  let rows = [];
  try {
    rows = await query(`select * from user  where id = ${user_id}`);
    console.log(`Get ${user_id} user's detail from user DB`);
    console.log(rows);
    return rows;
    // connection.end();
    // console.log(rows);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

user.get_all = async function () {
  console.log("Getting all data...");
  let rows = [];
  try {
    rows = await query(`select * from user`);
    console.log("Get all users");
    return rows;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

user.create = async function (data) {
  hasher({ password: data.password }, async (error, pw, salt, hash) => {
    if (error) {
      console.log(error);
      return;
    }
    data.password = hash;
    data.salt = salt;
    console.log(data);
    try {
      await connection.query("Insert Into user Set ?", data);
      console.log(`Create new user : ${data.name} in user DB`);
    } catch (e) {}
  });
};

user.update = async function (data) {
  const id = data.id;
  delete data["id"];
  hasher({ password: data.password }, async (error, pw, salt, hash) => {
    if (error) {
      console.log(error);
      return;
    }
    data.password = hash;
    data.salt = salt;
    console.log(data);
    try {
      await connection.query(`Update user SET ? Where id =${id}`, data);
      console.log(`Update ${id} : ${data.name} from user DB`);
      // insert data into example table
    } catch (e) {
      // console.log(e);
    }
  });
};

user.remove = async function (data) {
  const id = data.id;
  try {
    await connection.query(`Delete From user Where id = ${id}`);
    console.log(`Delete ${id} : ${data.name} from user DB`);
    // insert data into example table
  } catch (e) {
    // console.log(e);
  }
};

user.find_by_email = async function (email) {
  try {
    console.log(`Searching Whose email = '${email}' from user DB`);
    // console.log(target_user);
    const target_user = await query(
      `select * from user  where email = '${email}'`
    );
    return target_user;
  } catch (e) {
    // console.log(e);
  }
};

post.create = async function (data) {
  console.log("trying to create new post");
  console.log(data);
  let thisnow = moment();
  created_time = thisnow.format("YYYY-MM-DD HH:mm:ss");
  console.log(`created time is ${created_time}`);
  data.created = created_time;
  console.log(data);
  try {
    await connection.query("Insert Into post Set ?", data);
    console.log(`Create new post : ${data.id} in post DB`);
  } catch (e) {}
};

post.find_by_id = async function (post_id) {
  console.log("find_by_id");

  let rows = [];
  try {
    rows = await query(`select * from post where id = ${post_id}`);
    console.log(`Find ${post_id}'st post from post DB`);
    return rows[0];
    // connection.end();
    // console.log(rows);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

post.find_all = async function () {
  console.log("Getting all data...");
  let rows = [];
  try {
    rows = await query(`select * from post`);
    return rows;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

post.hit = async function (post_id) {
  try {
    await query(`update post set hit = hit+ 1 where id = ${post_id}`);
    console.log("hit!");
  } catch (err) {
    console.log(err);
  }
};

post.delete = async function (post_id) {
  console.log(post_id);
  try {
    await connection.query(`Delete From post Where id = ${post_id}`);
    console.log(`Delete ${post_id} post from post DB`);
    // insert data into example table
  } catch (e) {
    // console.log(e);
  }
};

exports.db_user = user;
exports.db_post = post;
