const mySQL = require("mysql");

const { HOST, DB, DB_USER, DB_PASS } = process.env;

const db = mySQL.createConnection({
  host: HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB,
  multipleStatements: true
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database Connected");
  // console.log(db)
});


module.exports = db;
