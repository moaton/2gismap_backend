module.exports = (sequelize, Sequelize) => {
  const Tickets = sequelize.define("tickets", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    username: {
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
    },
    ticket: {
      type: Sequelize.STRING
    }
  });
  return Tickets;
}