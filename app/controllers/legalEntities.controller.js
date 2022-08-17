const db = require("../models");
const legalEntities = db.legalEntities;
const uninhabitedPremise = db.uninhabitedPremise;
const uninhabitedPremiseTwo = db.uninhabitedPremiseTwo;
const cashRegisterMachine = db.cashRegisterMachine;

const openGeocoder = require('node-open-geocoder');

const Op = db.Sequelize.Op;
exports.create = (req, res) => {
  let route
  switch (req.baseUrl) {
    case '/api/legal-entities':
      route = legalEntities
      break;
    case '/api/uninhabited-premise':
      route = uninhabitedPremise
      break;
    case '/api/uninhabited-premise-two':
      route = uninhabitedPremiseTwo
      break;
    case '/api/cash-register-machine':
      route = cashRegisterMachine
      break;
    default:
      break;
  }
  route.create(req.body).then(response => {
    res.send({message: 'success', item: response.dataValues})
  }).catch(err => {
    console.log(err, 'err');
  })
};
exports.findAll = (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const address = req.query.address
  
  let route
  switch (req.baseUrl) {
    case '/api/legal-entities':
      route = legalEntities
      break;
    case '/api/uninhabited-premise':
      route = uninhabitedPremise
      break;
    case '/api/uninhabited-premise-two':
      route = uninhabitedPremiseTwo
      break;
    case '/api/cash-register-machine':
      route = cashRegisterMachine
      break;
    default:
      break;
  }
  let condition
  if(lat && lon){
    openGeocoder()
    .reverse(+lon, +lat)
    .end((error, response) => {
      if(response && (response.address.hasOwnProperty('locality') || response.address.hasOwnProperty('suburb') || response.address.hasOwnProperty('neighbourhood') || response.hasOwnProperty('display_name')) && response.address.hasOwnProperty('house_number')){
        condition = { address: { [Op.iLike]: `%${response.address.hasOwnProperty('locality') ? response.address.locality.replace(/(\-й\sмикрорайон|микрорайон )/ ,'') : response.address.hasOwnProperty('neighbourhood') ? response.address.neighbourhood.replace(/(\-й\sмикрорайон|микрорайон)/,'') : response.address.hasOwnProperty('suburb') ? response.address.suburb.replace(/(\-й\sмикрорайон|микрорайон)/,'') : response.display_name.split(', ')[1].replace(/(\-й\sмикрорайон|микрорайон )/ ,'')}, д.${response.address.house_number},%` } }
        route.findAll({ where: condition })
        .then(async data => {
          const result = await db.sequelize.query(
            `select * from uninhabitedpremisetwos WHERE "uninhabitedpremisetwos"."street_name" ILIKE '% ${response.address.hasOwnProperty('locality') ? response.address.locality.replace(/(\-й\sмикрорайон|микрорайон )/ ,'') : response.address.hasOwnProperty('neighbourhood') ? response.address.neighbourhood.replace(/(\-й\sмикрорайон|микрорайон)/,'') : response.address.hasOwnProperty('suburb') ? response.address.suburb.replace(/(\-й\sмикрорайон|микрорайон)/,'') : response.display_name.split(', ')[1].replace(/(\-й\sмикрорайон|микрорайон )/ ,'')}%' and
            "uninhabitedpremisetwos"."house_number" ILIKE '%д. ${response.address.house_number}%'`,{ type: db.sequelize.QueryTypes.SELECT}
          );
          const dataTo = {
            legalentities: data,
            uninhabitedpremises: result,
            address: `${response.address.hasOwnProperty('locality') ? response.address.locality.replace(/(\-й\sмикрорайон|микрорайон )/ ,'') : response.address.hasOwnProperty('neighbourhood') ? response.address.neighbourhood.replace(/(\-й\sмикрорайон|микрорайон)/,'') : response.address.hasOwnProperty('suburb') ? response.address.suburb.replace(/(\-й\sмикрорайон|микрорайон)/,'') : response.display_name.split(', ')[1].replace(/(\-й\sмикрорайон|микрорайон )/ ,'')}, д. ${response.address.house_number}`
          }
          res.send(dataTo);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving mapData."
          });
        });
      }
    })
  } else {
    route.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving mapData."
        });
      });
  }
  
};
exports.findOne = async (req, res) => {
  
  if(req.query.ismore){
    const resultsCash = await db.sequelize.query(
      `select * from cashregistermachines where cashregistermachines.registration_number = '${req.params.id}'`,{ type: db.sequelize.QueryTypes.SELECT}
    );
    const resultsHabit = await db.sequelize.query(
      `select * from cashregistermachines
      right join uninhabitedpremises on uninhabitedpremises.business_id = cashregistermachines.business_id
      where cashregistermachines.registration_number = '${req.params.id}'`,{ type: db.sequelize.QueryTypes.SELECT}
    );
    // console.log(resultsHabit, 'resultsHabit', resultsCash); // ВЫВОД ДАННЫХ НУЖНО ПОДКОРРЕКТИРОВАТЬ
    const payload = {
      cashregistermachines: resultsCash.length !== 0 ? resultsCash[0]: [],
      uninhabitedpremises : resultsHabit.length !== 0 ? resultsHabit[0]: [], 
    }
    res.send(payload)
  } else {
    legalEntities.findOne({where: {id: req.params.id}}).then(data => {
      res.send(data)
    })
    // два запроса один после обновления другой те верхние как то связать
    // или на фронте айтемс в моредетайлс в сторе закинуть
  }
};
exports.update = (req, res) => {
  let route, condition = {id: req.params.id}
  switch (req.baseUrl) {
    case '/api/legal-entities':
      route = legalEntities
      break;
    case '/api/uninhabited-premise':
      route = uninhabitedPremise
      condition = {business_id: req.params.id}
      break;
    case '/api/cash-register-machine':
      route = cashRegisterMachine
      condition = {registration_number: req.params.id}
      break;
    default:
      break;
  }
  route.update(req.body, {where: condition}).catch(err => console.log(err))
  res.send({message: 'success', item: req.body})
};
exports.delete = async (req, res) => {
  console.log(req.query, ' | ', req.query.isUninhabitedPremiseTwos === false);
  if(req.query.isUninhabitedPremiseTwos === false){
    db.sequelize.query(
      `DELETE FROM uninhabitedpremisetwos WHERE business_id='${req.params.id}'`,{ type: db.sequelize.QueryTypes.DELETE}
    );
  } else {
    const resultsCash = await db.sequelize.query(
      `select * from cashregistermachines where cashregistermachines.registration_number = '${req.params.id}'`,{ type: db.sequelize.QueryTypes.SELECT}
    );
    const resultsHabit = await db.sequelize.query(
      `select * from cashregistermachines
      right join uninhabitedpremises on uninhabitedpremises.business_id = cashregistermachines.business_id
      where cashregistermachines.registration_number = '${req.params.id}'`,{ type: db.sequelize.QueryTypes.SELECT}
    );
    if(resultsHabit.length !== 0 && resultsCash.length !== 0){
      db.sequelize.query(
        `DELETE FROM uninhabitedpremises WHERE business_id='${resultsCash[0].business_id}'`,{ type: db.sequelize.QueryTypes.DELETE}
      );
    }
    if(resultsCash.length !== 0){
      db.sequelize.query(
        `DELETE FROM cashregistermachines WHERE registration_number='${req.params.id}'`,{ type: db.sequelize.QueryTypes.DELETE}
      );
    }
    db.sequelize.query(
      `DELETE FROM legalentities WHERE id='${req.params.id}'`,{ type: db.sequelize.QueryTypes.DELETE}
    );
  }
  
  res.send({message: 'success'})
};
exports.deleteAll = (req, res) => {
  
};