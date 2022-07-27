module.exports = app => {
  const legalEntities = require("../controllers/legalEntities.controller.js");
  var router = require("express").Router();
  router.post("/", legalEntities.create);
  router.get("/", legalEntities.findAll);
  router.get("/:id", legalEntities.findOne);
  router.put("/:id", legalEntities.update);
  router.delete("/:id", legalEntities.delete);
  router.delete("/", legalEntities.deleteAll);
  app.use('/api/legal-entities', router);
};