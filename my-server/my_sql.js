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
const basic = {};

basic.select = async function (from, where, target) {
  console.log(from, where, target);
  try {
    if (where === "*") {
      let rows = await query(`select * from ${from}`);
      console.log(`Select * from [${from}]`);
      return rows;
    } else {
      let rows = await query(
        `select * from ${from} where ${where} = '${target}'`
      );
      console.log(`Select [${where}] = [${target}] from [${from}] table`);
      return rows;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

basic.delete = async function (from, where, target) {
  try {
    await connection.query(`Delete From ${from} Where ${where} = ${target}`);
    console.log(`Delete [${where}]=[${target}] from [${from}] table`);
  } catch (e) {}
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

post.create = async function (data) {
  console.log("trying to create new post");
  let now = moment();
  created_time = now.format("YYYY-MM-DD HH:mm:ss");
  data.created = created_time;
  console.log(data);
  try {
    await connection.query("Insert Into post Set ?", data);
    console.log(`Create new post : ${data.id} in post DB`);
  } catch (e) {}
};

post.hit = async function (post_id) {
  try {
    await query(`Update post set hit = hit+ 1 where id = ${post_id}`);
    console.log(`Update [post] set [hit] = [hit+ 1] where [id] = [${post_id}]`);
  } catch (err) {
    console.log(err);
  }
};

exports.db_user = user;
exports.db_post = post;
exports.db_basic = basic;
