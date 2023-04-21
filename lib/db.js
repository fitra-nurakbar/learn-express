import sequelize from "sequelize";

const db = new sequelize("coba_nest", "root", "root", {
  dialec: "mysql",
});

db.sync({});

export default db;
