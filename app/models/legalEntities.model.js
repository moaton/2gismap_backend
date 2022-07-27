module.exports = (sequelize, Sequelize) => {
  const LegalEntities = sequelize.define("legalentities", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
  });
  return LegalEntities;
}