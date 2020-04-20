const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const session = require('express-session')
const port = 3000
const HOST = '0.0.0.0';

const db = require('./db/config')

const user_controller = require('./controllers/user_controller')
const auth_controller = require('./controllers/auth_controller')
const user_upload_metadata_controller = require('./controllers/user_upload_metadata_controller')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})


// Admin functions to handle users
app.get('/v1/users', user_controller.getUsers)
app.get('/v1/users/:id', user_controller.getUserById)
app.post('/v1/users', user_controller.createUser)
app.post('/v1/users/bulk-create', user_controller.bulkCreateUser)

// User profile fetch for loggedin user
app.get('/v1/user-detail', user_controller.getUserDetail)


// user upload metadata
app.get('/v1/user-upload', user_upload_metadata_controller.getUserUploadMetadata)

//Authentication
app.post('/v1/login', auth_controller.login)
app.post('/v1/logout', auth_controller.logout)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
