module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    surname: {
      type: Sequelize.STRING
    },
    post: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    }
  });
  return Users;
}