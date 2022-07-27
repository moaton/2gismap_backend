module.exports = (sequelize, Sequelize) => {
  const CashRegisterMachine = sequelize.define("cashregistermachine", {
    line_number: {
      type: Sequelize.BIGINT(15),
      primaryKey: true
    },
    registration_number: {
      type: Sequelize.STRING
    },
    business_id: {
      type: Sequelize.STRING,
    },
    name_np: {
      type: Sequelize.TEXT
    },
    taxation_regime: {
      type: Sequelize.TEXT
    },
    license_information: {
      type: Sequelize.STRING(600)
    },
    type_activity: {
      type: Sequelize.STRING(600)
    },
    brand_crm: {
      type: Sequelize.TEXT
    },
    factory_number_crm: {
      type: Sequelize.STRING(600)
    },
    year_release_crm: {
      type: Sequelize.STRING(600)
    },
    registration_number_crm: {
      type: Sequelize.STRING(600)
    },
    date_registration_crm: {
      type: Sequelize.STRING(600)
    },
    date_de_registration_crm: {
      type: Sequelize.STRING(600)
    },
    address_point_sale_crm: {
      type: Sequelize.STRING(600)
    },
    place_registration_crm: {
      type: Sequelize.STRING(600)
    },
    fiscal_meter_readings_crm: {
      type: Sequelize.STRING(600)
    },
    name_mc: {
      type: Sequelize.STRING(600)
    },
    contract_date_mc: {
      type: Sequelize.STRING(600)
    },
    contract_number_mc: {
      type: Sequelize.STRING(600)
    },
  });
  return CashRegisterMachine;
}