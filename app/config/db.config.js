module.exports = {
  HOST: '195.49.212.34', //'localhost',
  USER: 'postgres',
  PASSWORD: 'anetdev',
  DB: 'mapdb',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}