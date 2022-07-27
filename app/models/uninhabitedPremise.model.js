module.exports = (sequelize, Sequelize) => {
  const UninhabitedPremise = sequelize.define("uninhabitedpremise", {
    name_locality: {
      type: Sequelize.STRING
    },
    street_name: {
      type: Sequelize.STRING
    },
    house_number: {
      type: Sequelize.STRING
    },
    secondary_object_number: {
      type: Sequelize.STRING
    },
    admin_code: {
      type: Sequelize.STRING
    },
    type_property: {
      type: Sequelize.STRING
    },
    real_estate_purpose: {
      type: Sequelize.STRING
    },
    total_area: {
      type: Sequelize.STRING
    },
    cadastral_number: {
      type: Sequelize.STRING
    },
    name_title_document: {
      type: Sequelize.STRING
    },
    date_title_document: {
      type: Sequelize.STRING
    },
    number_title_document: {
      type: Sequelize.STRING
    },
    date_registration: {
      type: Sequelize.STRING
    },
    name_legal_entity: {
      type: Sequelize.STRING
    },
    business_id: {
      type: Sequelize.STRING
    },
    transaction_amount: {
      type: Sequelize.STRING
    },
    ownership: {
      type: Sequelize.STRING
    },
    share_property: {
      type: Sequelize.STRING
    },
  });
  return UninhabitedPremise;
}