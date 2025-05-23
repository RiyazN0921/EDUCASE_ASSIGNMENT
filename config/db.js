const { Sequelize } = require('sequelize')

require('dotenv').config()

const sequelize = new Sequelize(
  'freedb_educase',
  'freedb_educase',
  'q6j@zrPd?Zx$gEY',
  {
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