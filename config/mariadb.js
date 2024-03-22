const mariadb = require("mysql2");

info = {
  host: "localhost",
  user: "root",
  password: "1234",
  port: 3306,
  database: "nodesql",
};

let db = mariadb.createConnection(info);

db.connect((err) => {
  if (err) {
    console.error("DB연결 실패: " + err);
  } else {
    console.log("DB연결 성공");
  }
});

module.exports = {
  db,
  info,
};
