const db = require("../models");
const users = db.users;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const Op = db.Sequelize.Op;
exports.create = async (req, res) => {
  try {
    console.log(!!req.body && !!req.body.username && !!req.body.password,'req.body');

    if(!!req.body && !!req.body.username && !!req.body.password){
      const usersData = await users.findAll({where: {username: req.body.username.toLowerCase()}})
      if(usersData.length === 0 && req.body.type === 'reg'){
        bcrypt.genSalt(saltRounds, async function(err, salt) {
          bcrypt.hash(req.body.password, salt, async function(err, hash) {
              if(!err){
                let id = null
                await users.create({
                  username: req.body.username, 
                  password: hash,
                  name: req.body.name,
                  surname: req.body.surname,
                  post: req.body.post,
                  phone: req.body.phone,
                  role: req.body.role
                }).then(response => {
                  id = response.id
                })
                res.send({message: 'success', user: {
                  id: id,
                  username: req.body.username,
                  name: req.body.name,
                  surname: req.body.surname,
                  post: req.body.post,
                  phone: req.body.phone,
                  role: req.body.role
                }})
              }
          });
      });
      } else if(usersData.length !== 0 && req.body.type === 'auth') {
        console.log(usersData.length,'usersData.length',usersData[0].dataValues);
        bcrypt.compare(req.body.password, usersData[0].dataValues.password, async function(err, result) {
          if(result){
            res.send({message: 'success', user: {
              id: usersData[0].dataValues.id,
              username: usersData[0].dataValues.username,
              name: usersData[0].dataValues.name,
              surname: usersData[0].dataValues.surname,
              post: usersData[0].dataValues.post,
              phone: usersData[0].dataValues.phone,
              role: usersData[0].dataValues.role
            }})
          } else {
            res.send({message: 'the password is not correct'})
          }
        });
      } else {
        res.send({message: 'the user has been created'})
      }
    }
  } catch (error) {
    res.status(500).send(error)
  }
  
};
exports.findAll = (req, res) => {
};
exports.findOne = async (req, res) => {
};
exports.update = (req, res) => {
  
};
exports.delete = (req, res) => {
  
};
exports.deleteAll = (req, res) => {
  
};