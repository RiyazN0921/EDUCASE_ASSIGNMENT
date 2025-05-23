const { Sequelize } = require('sequelize')

require('dotenv').config()

const sequelize = new Sequelize(
  // process.env.DB_NAME,
  'freedb_educase',
  // process.env.DB_USER,
  'freedb_educase',
  // process.env.DB_PASS,
  'q6j@zrPd?Zx$gEY',
  {
    // host: process.env.DB_HOST,
    host: 'sql.freedb.tech',
    dialect: 'mysql',
    port: 3306,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
)

module.exports = sequelize