require('dotenv').config()
const express = require('express')

const bodyParser = require('body-parser')

const schoolRoutes = require('./routes/schoolRoutes')

const errorMiddleware = require('./middleware/errorHandler.middleware')

const sequelize = require('./config/db')

const { swaggerUi, swaggerSpec } = require('./swagger');

const app = express()

app.use(bodyParser.json())

app.use('/api', schoolRoutes)

app.get('/home', (req, res) => {
  res.send('welcome to educase backend')
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorMiddleware)

sequelize
  .sync()
  .then(() => {
    console.log('Database connected and synced')
  })
  .catch((err) => console.error('Database connection error:', err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})