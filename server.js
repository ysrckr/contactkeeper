const express = require('express')
const users = require('./routes/users')
const auth = require('./routes/auth')
const contacts = require('./routes/contacts')


const app = express()

app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/contacts', contacts)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server started on port ${port}`)
})