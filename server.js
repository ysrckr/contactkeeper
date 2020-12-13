const express = require('express')
const users = require('./routes/users')
const auth = require('./routes/auth')
const contacts = require('./routes/contacts')
const conn = require('./config/db')

// COnnect Database
conn()

const app = express()

app.use(express.json({ extended: false }))
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/contacts', contacts)

const port = process.env.PORT || 5000

app.listen(port, () => {
	console.log(`server started on port ${port}`)
})
