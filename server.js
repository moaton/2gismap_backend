const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
var corsOptions = {
  origin: '*'
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

const db = require("./app/models")
db.sequelize.sync()


app.get('/', (req, res) => {
  res.json({message: 'Hello'})
})
require("./app/routes/legalEntities.routes")(app);
require("./app/routes/uninhabitedPremise.routes")(app);
require("./app/routes/uninhabitedPremiseTwo.routes")(app);
require("./app/routes/cashRegisterMachine.routes")(app);
const PORT = process.env.PORT || 8080
// 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})